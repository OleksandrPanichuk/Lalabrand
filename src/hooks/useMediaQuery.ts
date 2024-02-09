"use client"
import { useEffect, useState } from "react"

export type UseMediaQueryOptions = {
  fallback?: boolean | boolean[]
  ssr?: boolean
}

export function useMediaQuery(
  query: string | string[],
  options: UseMediaQueryOptions = {},
): boolean[] {
  const { ssr = true, fallback } = options

  const queries = Array.isArray(query) ? query : [query]

  let fallbackValues = Array.isArray(fallback) ? fallback : [fallback]
  fallbackValues = fallbackValues.filter((v) => v != null) as boolean[]

  const [value, setValue] = useState(() => {
    return queries.map((query, index) => ({
      media: query,
      matches: ssr
        ? !!fallbackValues[index]
        : window.matchMedia(query).matches,
    }))
  })

  useEffect(() => {
    setValue(
      queries.map((query) => ({
        media: query,
        matches: window.matchMedia(query).matches,
      })),
    )

    const mql = queries.map((query) => window.matchMedia(query))

    const handler = (evt: MediaQueryListEvent) => {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches }
          return item
        })
      })
    }

    mql.forEach((mql) => {
      if (typeof mql.addListener === "function") {
        mql.addListener(handler)
      } else {
        mql.addEventListener("change", handler)
      }
    })

    return () => {
      mql.forEach((mql) => {
        if (typeof mql.removeListener === "function") {
          mql.removeListener(handler)
        } else {
          mql.removeEventListener("change", handler)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return value.map((item) => item.matches)
}