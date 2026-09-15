import React from 'react'
import type { Context } from '@deepseek-ai/cordis'
import { BlankSessionExpandButton } from './BlankSessionExpandButton.tsx'
import { FaviconRunningManager } from './favicon-running.ts'

export const inject = ['slots', 'sessions']

export function apply(ctx: Context): void {
  // Feature 1: Top-right sidebar expand button on new blank sessions
  ctx.slots.inject('shell.overlay', () =>
    ctx.slots.register(
      {
        name: 'shell.overlay',
        id: 'dsh-icon:sidebar-expand-hero',
        order: 50,
      },
      () => React.createElement(BlankSessionExpandButton, { ctx })
    )
  )

  // Feature 2: Browser tab icon indicates running state
  const faviconManager = new FaviconRunningManager(ctx)
  faviconManager.start()

  ctx.effect(() => {
    return () => {
      faviconManager.dispose()
    }
  }, 'dsh-icon: favicon running lifecycle')
}
