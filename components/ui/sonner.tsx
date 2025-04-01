"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right" // Ensures toasts appear in the top-right corner
      richColors
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          marginTop: "16px", // Adds spacing from the top
          marginRight: "16px", // Adds spacing from the right
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
