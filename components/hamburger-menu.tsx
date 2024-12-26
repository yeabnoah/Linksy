"use client"

import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useSidebar } from '@/components/ui/sidebar'

export function HamburgerMenu() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-6 w-6" />
    </Button>
  )
}

