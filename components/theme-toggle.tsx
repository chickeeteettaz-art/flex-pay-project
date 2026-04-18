"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled>
        <SunIcon className="size-5" />
      </Button>
    )
  }

  const isDark = (theme ?? resolvedTheme) === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="transition-colors"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <SunIcon className={`size-5 ${isDark ? "hidden" : "block"}`} />
      <MoonIcon className={`size-5 ${isDark ? "block" : "hidden"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
