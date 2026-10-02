import type { ISessions } from '@deepseek-ai/dsh-api-session-controller/client'
import type { ISidebarRight } from '@deepseek-ai/dsh-client-ui-sidebar-right/client'

declare module '@deepseek-ai/cordis' {
  interface Context {
    get<T = any>(name: string): T
    effect(callback: () => any, label?: string): () => void
    slots: {
      inject(name: string, callback: () => any): () => void
      register(options: any, component: any): () => void
      entries?(name: string): any[]
      subscribe?(name: string, callback: () => void): () => void
    }
    sessions?: ISessions
    uiSession?: {
      sessionStatus?: {
        getSnapshot(): ReadonlyMap<string, { running?: boolean; [key: string]: any }>
        subscribe(listener: () => void): () => void
      }
      adapter?: {
        current?: {
          getSnapshot(): { key?: string; [key: string]: any }
          subscribe(listener: () => void): () => void
        }
      }
      [key: string]: any
    }
    sidebarRight?: ISidebarRight
    locale?: {
      getPreference?(): string
      bind?(namespace: string): (key: string) => string
      [key: string]: any
    }
    layout?: {
      activePanelId?: string | null
      [key: string]: any
    }
    [key: string]: any
  }
}
