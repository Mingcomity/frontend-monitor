import type { PiniaPluginContext } from 'pinia'
import { toRaw } from 'vue'

type Optins = {
  key?: string
  type?: string
  storeKey?: string[]
}

const __piniaKey__: string = 'monitor'

// 默认存储 'sessionStorage'
const setStorage = (key: string, value: any, type?: string) => {
  if (type === 'localStorage') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }
}

const getStorage = (key: string, type?: string) => {
  if (type === 'localStorage') {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) as string)
      : {}
  } else {
    return window.sessionStorage.getItem(key)
      ? JSON.parse(window.sessionStorage.getItem(key) as string)
      : {}
  }
}

export const piniaPlugin = (options: Optins) => {
  return (context: PiniaPluginContext) => {
    const { store } = context
    const data = getStorage(
      `${options?.key ?? __piniaKey__}-${store.$id}`,
      options.type
    )
    store.$subscribe(() => {
      if (options.storeKey) {
        const filtrationStore: any = {}
        for (let i = 0; i < options.storeKey.length; i++) {
          const str: string = options.storeKey[i]
          const key = str.slice(str.indexOf('-') + 1)
          const value = toRaw(store.$state)[key]
          if (value) filtrationStore[key] = value
        }

        setStorage(
          `${options?.key ?? __piniaKey__}-${store.$id}`,
          filtrationStore,
          options.type
        )
      }
    })

    return {
      ...data
    }
  }
}
