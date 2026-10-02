import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

const pkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'))

test('Cohort & Peer Dependencies: adheres to DSH 0.2.0-rc.2 corridor', () => {
  assert.equal(pkg.version, '0.1.0', 'Plugin self version must remain 0.1.0 without self-bump')
  assert.equal(pkg.devDependencies['@deepseek-ai/cordis'], '4.0.4', 'cordis devDependency must match 4.0.4')
  assert.equal(pkg.peerDependencies['@deepseek-ai/cordis'], '^4.0.4', 'cordis peerDependency must match ^4.0.4')

  const dshDevKeys = Object.keys(pkg.devDependencies).filter(k => k.startsWith('@deepseek-ai/dsh-'))
  assert.ok(dshDevKeys.length >= 6, 'Should declare all required @deepseek-ai/dsh-* devDependencies')
  for (const key of dshDevKeys) {
    assert.equal(pkg.devDependencies[key], '0.2.0-rc.2', `devDependency ${key} must match exact 0.2.0-rc.2`)
  }

  const dshPeerKeys = Object.keys(pkg.peerDependencies).filter(k => k.startsWith('@deepseek-ai/dsh-'))
  assert.ok(dshPeerKeys.length >= 6, 'Should declare all required @deepseek-ai/dsh-* peerDependencies')
  for (const key of dshPeerKeys) {
    assert.equal(pkg.peerDependencies[key], '^0.2.0-rc.2', `peerDependency ${key} must match ^0.2.0-rc.2`)
  }
})

// Dynamically import compiled/source helpers for contract testing
test('Session Resolution Helpers: resolveMainSessionId & isSessionBlank', async () => {
  const { resolveMainSessionId, isSessionBlank, isAnySessionRunning } = await import(
    '../src/client/helpers.ts'
  )

  // 1. Resolve via ctx.uiSession.adapter.current.getSnapshot().key (DSH 0.2.0-rc.2 primary contract)
  const ctxUiSession = {
    uiSession: {
      adapter: {
        current: {
          getSnapshot: () => ({ key: 'session-main-001' }),
        },
      },
    },
    sessions: {
      list: {
        getSnapshot: () => ({
          byId: {
            'session-main-001': { id: 'session-main-001', blank: true, running: false },
          },
        }),
      },
    },
  }
  assert.equal(resolveMainSessionId(ctxUiSession), 'session-main-001')
  assert.equal(isSessionBlank(ctxUiSession, 'session-main-001'), true)

  // 2. Resolve via ctx.get('uiSession')
  const ctxUiSessionGetter = {
    get: (name) => {
      if (name === 'uiSession') {
        return {
          adapter: {
            current: {
              getSnapshot: () => ({ key: 'session-main-getter' }),
            },
          },
        }
      }
      return undefined
    },
    sessions: {
      list: {
        getSnapshot: () => ({
          byId: {
            'session-main-getter': { id: 'session-main-getter', blank: false, running: true },
          },
        }),
      },
    },
  }
  assert.equal(resolveMainSessionId(ctxUiSessionGetter), 'session-main-getter')
  assert.equal(isSessionBlank(ctxUiSessionGetter, 'session-main-getter'), false)
  assert.equal(isAnySessionRunning(ctxUiSessionGetter), true)

  // 3. Resolve via retainedBy.mainView marker (supporting both .id and .sessionId candidate formats)
  const ctxRetainedBy = {
    sessions: {
      list: {
        getSnapshot: () => ({
          byId: {
            'session-bg-001': { id: 'session-bg-001', retainedBy: { mainView: 0 }, blank: false },
            'session-active-002': { id: 'session-active-002', sessionId: 'session-active-002', retainedBy: { mainView: 1 }, blank: true },
          },
        }),
      },
    },
  }
  assert.equal(resolveMainSessionId(ctxRetainedBy), 'session-active-002')
  assert.equal(isSessionBlank(ctxRetainedBy, 'session-active-002'), true)

  // 4. Legacy snapshot.current fallback
  const ctxLegacy = {
    sessions: {
      list: {
        getSnapshot: () => ({
          current: 'session-legacy-003',
          byId: {
            'session-legacy-003': { id: 'session-legacy-003', blank: false },
          },
        }),
      },
    },
  }
  assert.equal(resolveMainSessionId(ctxLegacy), 'session-legacy-003')
  assert.equal(isSessionBlank(ctxLegacy, 'session-legacy-003'), false)

  // 5. Check isAnySessionRunning using authoritative uiSession.sessionStatus Map
  const statusMap = new Map()
  statusMap.set('s1', { running: false })
  statusMap.set('s2', { running: true })
  const ctxStatusMap = {
    uiSession: {
      sessionStatus: {
        getSnapshot: () => statusMap,
      },
    },
  }
  assert.equal(isAnySessionRunning(ctxStatusMap), true)

  // 6. Check isAnySessionRunning via session binding snapshot fallback
  const ctxBindingRunning = {
    uiSession: {
      adapter: {
        current: {
          getSnapshot: () => ({ key: 's-running-binding' }),
        },
      },
    },
    sessions: {
      binding: (id) => ({
        session: {
          getSnapshot: () => ({ sessionId: id, running: true, blank: false }),
        },
      }),
    },
  }
  assert.equal(isAnySessionRunning(ctxBindingRunning), true)

  // 7. Empty / null context gracefully handled
  assert.equal(resolveMainSessionId(null), undefined)
  assert.equal(resolveMainSessionId({}), undefined)
  assert.equal(isSessionBlank(null), true)
  assert.equal(isSessionBlank({}), true)
  assert.equal(isAnySessionRunning(null), false)
})

test('SidebarRight Contract: isSidebarRightExpanded & toggleSidebarRight', async () => {
  const { isSidebarRightExpanded, toggleSidebarRight } = await import(
    '../src/client/helpers.ts'
  )

  let toggleCalled = false

  // 1. Working sidebar service with isExpanded and toggleExpanded
  const ctxSidebarWorking = {
    sidebarRight: {
      isExpanded: () => true,
      toggleExpanded: () => {
        toggleCalled = true
      },
    },
  }
  assert.equal(isSidebarRightExpanded(ctxSidebarWorking), true)
  assert.equal(toggleSidebarRight(ctxSidebarWorking), true)
  assert.equal(toggleCalled, true)

  // 2. Sidebar service via ctx.get('sidebarRight')
  let toggleGetterCalled = false
  const ctxSidebarGetter = {
    get: (name) => {
      if (name === 'sidebarRight') {
        return {
          isExpanded: () => false,
          toggleExpanded: () => {
            toggleGetterCalled = true
          },
        }
      }
      return undefined
    },
  }
  assert.equal(isSidebarRightExpanded(ctxSidebarGetter), false)
  assert.equal(toggleSidebarRight(ctxSidebarGetter), true)
  assert.equal(toggleGetterCalled, true)

  // 3. Sidebar service throws (e.g. "no session surface is mounted") -> gracefully returns false for fallback
  const ctxSidebarThrowing = {
    sidebarRight: {
      isExpanded: () => false,
      toggleExpanded: () => {
        throw new Error('sidebarRight: no session surface is mounted')
      },
    },
  }
  assert.equal(isSidebarRightExpanded(ctxSidebarThrowing), false)
  assert.equal(toggleSidebarRight(ctxSidebarThrowing), false) // Must return false so caller does DOM click fallback

  // 4. Missing sidebar service
  assert.equal(isSidebarRightExpanded({}), false)
  assert.equal(toggleSidebarRight({}), false)
  assert.equal(isSidebarRightExpanded(null), false)
  assert.equal(toggleSidebarRight(null), false)
})

test('Built Client Factory Smoke: registers properly with loader and applies cleanly', () => {
  const clientCode = readFileSync(join(rootDir, 'client.js'), 'utf8')

  let registeredId = null
  let factoryFn = null

  const mockWindow = {
    __ModuleLoader__: {
      load: ({ id, factory }) => {
        registeredId = id
        factoryFn = factory
      },
    },
  }

  const mockModules = {
    'react': {
      createElement: (type, props, ...children) => ({ type, props, children }),
      useEffect: () => {},
      useState: (initial) => [initial, () => {}],
      useCallback: (fn) => fn,
      createContext: () => ({ Provider: null, Consumer: null }),
    },
    'react/jsx-runtime': {
      jsx: (type, props) => ({ type, props }),
      jsxs: (type, props) => ({ type, props }),
    },
    'react-dom': {
      createPortal: (element, container) => ({ element, container }),
    },
    '@deepseek-ai/dsh-client-ui-primitives': {
      Tooltip: (props) => props.children,
      IconPanelLeftOutlineRegular: () => null,
      IconPanelLeftOutlineMedium: () => null,
    },
  }

  const customRequire = (specifier) => {
    if (mockModules[specifier]) return mockModules[specifier]
    throw new Error(`Unexpected require: ${specifier}`)
  }

  const context = vm.createContext({
    window: mockWindow,
    document: {
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement: () => ({ dataset: {}, setAttribute: () => {}, removeAttribute: () => {} }),
      head: { appendChild: () => {} },
      body: { appendChild: () => {} },
    },
    MutationObserver: class {
      observe() {}
      disconnect() {}
    },
    URL: globalThis.URL,
    Blob: globalThis.Blob,
    Worker: undefined,
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
  })

  vm.runInContext(clientCode, context)

  assert.equal(registeredId, 'dsh-icon', 'Registered plugin ID must match dsh-icon')
  assert.equal(typeof factoryFn, 'function', 'Factory must be a function')

  const exported = factoryFn(customRequire)
  assert.ok(exported && typeof exported === 'object', 'Module must export an object')
  assert.deepEqual([...exported.inject], ['slots', 'sessions', 'uiSession', 'sidebarRight', 'locale'], 'Declare every accessed Cordis service')
  assert.equal(typeof exported.apply, 'function', 'Module must export apply function')

  // Smoke test apply(ctx)
  const injectedSlots = []
  const effects = []
  const mockCtx = {
    slots: {
      inject: (name, cb) => {
        injectedSlots.push({ name, cb })
      },
      register: (options, component) => ({ options, component }),
    },
    sessions: {
      list: {
        subscribe: () => () => {},
        getSnapshot: () => ({ byId: {} }),
      },
    },
    effect: (cb, label) => {
      effects.push({ cb, label })
      return () => {}
    },
  }

  const strictCtx = new Proxy(mockCtx, {
    get(target, property) {
      if (['uiSession', 'sidebarRight', 'locale'].includes(property) && !exported.inject.includes(property)) {
        throw new Error(`cannot get property "${property}" without inject`)
      }
      return Reflect.get(target, property)
    },
  })
  exported.apply(strictCtx)
  assert.equal(injectedSlots.length, 1, 'Should register 1 slot inject')
  assert.equal(injectedSlots[0].name, 'shell.overlay')
  assert.equal(effects.length, 1, 'Should register 1 effect lifecycle')
})
