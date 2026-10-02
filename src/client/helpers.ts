import type { Context } from '@deepseek-ai/cordis'

/**
 * Resolves the active main session ID from the Cordis Context.
 * Priority:
 * 1. `ctx.uiSession.adapter.current.getSnapshot().key` (DSH 0.1.6a2+ / 0.2.0-rc.2 standard)
 * 2. `ctx.sessions.list.getSnapshot().byId` candidate with `retainedBy.mainView > 0`
 * 3. `ctx.sessions.list.getSnapshot().current` (legacy fallback)
 */
export function resolveMainSessionId(ctx: Context | any): string | undefined {
  if (!ctx) return undefined

  // 1. Authoritative UiSession slot adapter current snapshot key
  try {
    const uiSession = ctx.uiSession ?? ctx.get?.('uiSession')
    const currentKey = uiSession?.adapter?.current?.getSnapshot?.()?.key
    if (typeof currentKey === 'string' && currentKey.length > 0) {
      return currentKey
    }
  } catch {}

  // 2. Scan sessions list snapshot by retainedBy.mainView marker
  try {
    const listSnapshot = ctx.sessions?.list?.getSnapshot?.()
    if (listSnapshot?.byId && typeof listSnapshot.byId === 'object') {
      const mainCandidate = Object.values(listSnapshot.byId).find(
        (candidate: any) => candidate && (candidate.retainedBy?.mainView ?? 0) > 0
      ) as { id?: string; sessionId?: string } | undefined
      const candidateId = mainCandidate?.id ?? mainCandidate?.sessionId
      if (candidateId) {
        return candidateId
      }
      // 3. Fallback to legacy snapshot.current if present
      if (typeof listSnapshot.current === 'string' && listSnapshot.current.length > 0) {
        return listSnapshot.current
      }
    }
  } catch {}

  return undefined
}

/**
 * Checks whether the specified or current main session is in a blank/empty state.
 */
export function isSessionBlank(ctx: Context | any, sessionId?: string): boolean {
  if (!ctx) return true

  const id = sessionId ?? resolveMainSessionId(ctx)
  if (!id) return true

  try {
    const listSnapshot = ctx.sessions?.list?.getSnapshot?.()
    const session = listSnapshot?.byId?.[id]
    if (session) {
      if (typeof session.blank === 'boolean') {
        return session.blank
      }
      return false
    }
  } catch {}

  return true
}

/**
 * Checks whether the right sidebar is currently expanded via ctx.sidebarRight.
 */
export function isSidebarRightExpanded(ctx: Context | any): boolean {
  if (!ctx) return false
  try {
    const sidebarRight = ctx.sidebarRight ?? ctx.get?.('sidebarRight')
    if (typeof sidebarRight?.isExpanded === 'function') {
      return Boolean(sidebarRight.isExpanded())
    }
  } catch {}
  return false
}

/**
 * Safely invokes `sidebarRight.toggleExpanded()`.
 * Returns true if the service call succeeded.
 * Returns false if the service is missing, method threw (e.g. no mounted surface),
 * allowing callers to execute a DOM-level fallback.
 */
export function toggleSidebarRight(ctx: Context | any): boolean {
  if (!ctx) return false
  try {
    const sidebarRight = ctx.sidebarRight ?? ctx.get?.('sidebarRight')
    if (sidebarRight && typeof sidebarRight.toggleExpanded === 'function') {
      sidebarRight.toggleExpanded()
      return true
    }
  } catch (err) {
    console.warn('[dsh-icon] sidebarRight.toggleExpanded threw, will use DOM fallback:', err)
  }
  return false
}

/**
 * Checks whether any session is actively running.
 * Priority:
 * 1. `ctx.uiSession.sessionStatus` Map snapshot (DSH 0.2.0-rc.2 authoritative status source)
 * 2. `ctx.sessions.list.byId` summary running flag (if populated)
 * 3. Active session binding snapshot running state
 */
export function isAnySessionRunning(ctx: Context | any): boolean {
  if (!ctx) return false

  // 1. Check uiSession.sessionStatus (Authoritative Map of SessionStatus in DSH 0.1.6a2+ / 0.2.0-rc.2)
  try {
    const uiSession = ctx.uiSession ?? ctx.get?.('uiSession')
    const statusMap = uiSession?.sessionStatus?.getSnapshot?.()
    if (statusMap && typeof statusMap.values === 'function') {
      for (const status of statusMap.values()) {
        if (status?.running === true) {
          return true
        }
      }
    }
  } catch {}

  // 2. Check sessions list snapshot byId summaries
  try {
    const listSnapshot = ctx.sessions?.list?.getSnapshot?.()
    if (listSnapshot?.byId && typeof listSnapshot.byId === 'object') {
      const anyRunning = Object.values(listSnapshot.byId).some(
        (s: any) => s && s.running === true
      )
      if (anyRunning) return true
    }
  } catch {}

  // 3. Check active main session binding snapshot
  try {
    const currentId = resolveMainSessionId(ctx)
    if (currentId && typeof ctx.sessions?.binding === 'function') {
      const binding = ctx.sessions.binding(currentId)
      if (binding?.session?.getSnapshot?.()?.running === true) {
        return true
      }
    }
  } catch {}

  return false
}
