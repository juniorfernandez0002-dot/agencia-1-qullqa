import { useEffect, useRef, useState, type RefObject } from 'react'

export interface UseRevealObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
}

export interface UseRevealObserverResult<T extends HTMLElement> {
  ref: RefObject<T | null>
  isVisible: boolean
}

function shouldRevealImmediately(): boolean {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return true
  }

  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Observes a target element via IntersectionObserver and flips `isVisible`
 * to `true` once on intersection, immediately revealing if reduced motion
 * is preferred or IntersectionObserver is unavailable.
 */
export function useRevealObserver<T extends HTMLElement = HTMLElement>(
  options?: UseRevealObserverOptions
): UseRevealObserverResult<T> {
  const threshold = options?.threshold ?? 0.12
  const rootMargin = options?.rootMargin ?? '0px 0px -6% 0px'

  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(() => shouldRevealImmediately())

  useEffect(() => {
    if (isVisible) {
      return
    }

    const element = ref.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
            break
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    const mediaQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null

    const handleMotionChange = () => {
      if (mediaQuery?.matches) {
        setIsVisible(true)
        observer.disconnect()
      }
    }

    mediaQuery?.addEventListener?.('change', handleMotionChange)

    return () => {
      mediaQuery?.removeEventListener?.('change', handleMotionChange)
      observer.disconnect()
    }
  }, [isVisible, threshold, rootMargin])

  return { ref, isVisible }
}

export default useRevealObserver
