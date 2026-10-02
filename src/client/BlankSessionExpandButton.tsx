import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import type { Context } from '@deepseek-ai/cordis'
import { Tooltip, IconPanelLeftOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives'
import {
  resolveMainSessionId,
  isSessionBlank,
  isSidebarRightExpanded,
  toggleSidebarRight,
} from './helpers.ts'

const CSS_TAG_ID = 'dsh-icon:hero-expand-button-styles'

let styleRefCount = 0

function ensureStyles(): () => void {
  if (typeof document === 'undefined') return () => {}
  styleRefCount++
  let style = document.querySelector<HTMLStyleElement>(`style[data-plugin-css="${CSS_TAG_ID}"]`)
  if (!style) {
    style = document.createElement('style')
    style.dataset.plugin = 'dsh-icon'
    style.dataset.pluginCss = CSS_TAG_ID
    style.textContent = `
      .dsh-icon-hero-expand-btn {
        position: absolute;
        top: 11px;
        right: 12px;
        width: 28px;
        height: 28px;
        color: var(--dsw-alias-label-secondary, rgba(255, 255, 255, 0.65));
        cursor: pointer;
        background: transparent;
        border: none;
        border-radius: 28px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 6px;
        z-index: 25;
        box-sizing: border-box;
        transition: background var(--ds-transition-duration-fast, 0.15s) ease,
                    color var(--ds-transition-duration-fast, 0.15s) ease;
      }
      .dsh-icon-hero-expand-btn:hover {
        background: var(--dsw-alias-interactive-bg-hover, rgba(255, 255, 255, 0.08));
        color: var(--dsw-alias-label-primary, #ffffff);
      }
      .dsh-icon-hero-expand-btn svg {
        width: 15px;
        height: 15px;
        transform: scaleX(-1);
      }
    `
    document.head.appendChild(style)
  }

  return () => {
    styleRefCount--
    if (styleRefCount <= 0) {
      styleRefCount = 0
      const el = document.querySelector(`style[data-plugin-css="${CSS_TAG_ID}"]`)
      el?.remove()
    }
  }
}

function FallbackPanelIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      style={{ transform: 'scaleX(-1)' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 2.16463 13.4966 2.37325 13.6482C2.65034 13.8494 3.01764 13.9779 3.65076 14.0465C4.24006 14.1164 5.07937 14.1169 6.27055 14.1169H9.61597C9.89618 14.1169 10.1569 14.1128 10.4002 14.1118V1.88715Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function BlankSessionExpandButton({ ctx }: { ctx: Context }) {
  const [shouldShow, setShouldShow] = useState(false)
  const [targetContainer, setTargetContainer] = useState<Element | null>(null)

  useEffect(() => {
    const cleanup = ensureStyles()
    return cleanup
  }, [])

  const checkState = useCallback(() => {
    if (typeof document === 'undefined') return

    // 1. If currently inside a non-conversation panel (e.g. settings), hide
    if (document.querySelector('[data-settings-panel], [data-settings-page]')) {
      setShouldShow(false)
      return
    }

    // 2. Check if current session is blank / hero phase
    const currentId = resolveMainSessionId(ctx)
    const sessionBlank = isSessionBlank(ctx, currentId)

    const heroEl = document.querySelector('[data-phase="hero"]')
    const headerHiddenEl = document.querySelector(
      'header[class*="headerHidden"], [data-slot="conversation.session.header"] > header[class*="headerHidden"]'
    )
    const nativeExpandBtn = document.querySelector('[data-sidebar-right-expand]:not([data-dsh-icon-hero])')

    // If native expand button already exists or session is active with content, no need to show hero button
    const isHero = (sessionBlank || heroEl !== null || headerHiddenEl !== null) && nativeExpandBtn === null
    if (!isHero) {
      setShouldShow(false)
      return
    }

    // 3. Check if right sidebar is currently expanded
    let isExpanded = isSidebarRightExpanded(ctx)
    if (!isExpanded) {
      if (document.querySelector('[data-sidebar-right-open], [data-sidebar-right-expanded], [data-rightbar-open]')) {
        isExpanded = true
      }
    }

    const show = !isExpanded

    // 4. Find container element for portaling
    const container = heroEl
      || document.querySelector('[data-slot="main.conversation"] > div')
      || document.querySelector('[class*="wSkVaW_root"]')
      || document.querySelector('[data-dsh-center-col]')
      || document.querySelector('[class*="centerCol"]')

    setTargetContainer(container)
    setShouldShow(show)
  }, [ctx])

  useEffect(() => {
    checkState()

    // Subscribe to session list and uiSession updates
    const unsubSessions = ctx.sessions?.list?.subscribe?.(checkState)
    const uiSession = ctx.uiSession ?? ctx.get?.('uiSession')
    const unsubUiSession = uiSession?.adapter?.current?.subscribe?.(checkState)
    const unsubSessionStatus = uiSession?.sessionStatus?.subscribe?.(checkState)

    // MutationObserver to track DOM layout & attribute changes
    let observer: MutationObserver | null = null
    if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
      observer = new MutationObserver(() => {
        checkState()
      })

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: [
          'data-phase',
          'data-sidebar-right-open',
          'data-sidebar-right-expanded',
          'data-rightbar-open',
          'data-rightbar-collapsed',
          'data-sidebar-collapsed',
          'class',
          'aria-hidden'
        ],
        subtree: true,
        childList: true,
      })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkState)
    }

    return () => {
      unsubSessions?.()
      unsubUiSession?.()
      unsubSessionStatus?.()
      observer?.disconnect()
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkState)
      }
    }
  }, [checkState, ctx])

  const handleExpand = useCallback(() => {
    // 1. Try ctx.sidebarRight / ctx.get('sidebarRight')
    if (toggleSidebarRight(ctx)) {
      setShouldShow(false)
      return
    }

    // 2. Fallback: query native toggle button in DOM
    if (typeof document !== 'undefined') {
      const nativeBtn = document.querySelector<HTMLButtonElement>('[data-sidebar-right-expand]:not([data-dsh-icon-hero])')
      if (nativeBtn) {
        nativeBtn.click()
        setShouldShow(false)
        return
      }

      const toggleBtn = document.querySelector<HTMLButtonElement>('[data-sidebar-right-toggle]')
      if (toggleBtn) {
        toggleBtn.click()
        setShouldShow(false)
        return
      }
    }
  }, [ctx])

  if (!shouldShow) return null

  const label = (() => {
    try {
      const bound = ctx.get('locale')?.bind?.('sidebarRight')
      const text = bound?.('chrome.expand')
      if (text && text !== 'chrome.expand') return text
    } catch {}
    const isEn = ctx.get('locale')?.getPreference?.() === 'en'
    return isEn ? 'Expand sidebar' : '展开侧边栏'
  })()

  const buttonElement = (
    <button
      type="button"
      className="dsh-icon-hero-expand-btn"
      aria-label={label}
      title={label}
      data-sidebar-right-expand="true"
      data-dsh-icon-hero="true"
      onClick={handleExpand}
    >
      {typeof IconPanelLeftOutlineRegular !== 'undefined' ? (
        <IconPanelLeftOutlineRegular size={16} />
      ) : (
        <FallbackPanelIcon />
      )}
    </button>
  )

  const content = typeof Tooltip !== 'undefined' ? (
    <Tooltip label={label} side="bottom" delayMs={500}>
      {buttonElement}
    </Tooltip>
  ) : (
    buttonElement
  )

  if (targetContainer && targetContainer !== document.body) {
    return createPortal(content, targetContainer)
  }

  return content
}
