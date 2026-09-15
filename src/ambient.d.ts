declare module '@deepseek-ai/dsh-client-ui-primitives' {
  import type { ComponentType, ReactNode } from 'react'
  export interface IconProps {
    size?: number
    className?: string
  }
  export const IconPanelLeftOutline16: ComponentType<IconProps>
  export interface TooltipProps {
    label: ReactNode
    side?: 'top' | 'bottom' | 'left' | 'right'
    delayMs?: number
    children: ReactNode
  }
  export const Tooltip: ComponentType<TooltipProps>
}

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
    sessions: {
      list: {
        getSnapshot(): {
          current?: string
          byId: Record<string, {
            id: string
            blank?: boolean
            running?: boolean
            title?: string
            [key: string]: any
          }>
          ids: string[]
          [key: string]: any
        }
        subscribe(callback: () => void): () => void
      }
      binding?(sessionId: string): {
        snapshot?: {
          getSnapshot?(): {
            running?: boolean
            [key: string]: any
          }
        }
        [key: string]: any
      }
    }
    sidebarRight?: {
      isExpanded?(): boolean
      toggleExpanded?(): void
      [key: string]: any
    }
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
