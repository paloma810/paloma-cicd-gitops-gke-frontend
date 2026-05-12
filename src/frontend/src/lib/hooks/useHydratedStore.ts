import { useEffect, useState } from 'react'
import type { StoreApi, UseBoundStore } from 'zustand'

export function useHydratedStore<T, R>(
  store: UseBoundStore<StoreApi<T>>,
  selector: (state: T) => R,
  initialValue: R,
): R {
  const [hydrated, setHydrated] = useState(false)
  const value = store(selector)

  useEffect(() => setHydrated(true), [])

  return hydrated ? value : initialValue
}
