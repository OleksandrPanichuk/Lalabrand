"use client"
import { useMediaQuery } from "@/hooks"

interface VisibilityProps {
  ssr?: boolean
  breakpoint: string
  hide?: boolean
  children: React.ReactNode
  fallback?:boolean[]
}

export function Visibility(props: VisibilityProps) {
  const { breakpoint, hide, children, ssr, fallback } = props
  const [show] = useMediaQuery(breakpoint, { ssr , fallback})
  const isVisible = hide ? !show : show

  const rendered = isVisible ? children : null
  return rendered as React.ReactElement
}