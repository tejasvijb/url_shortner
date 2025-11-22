"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Your Urls", href: "/urls" },
]

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10">
        <header className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              <span className="text-blue-400">Short</span>
              <span className="text-rose-400">ly</span>
            </Link>
            <nav className="flex flex-1 flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-300">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  data-active={pathname.startsWith(item.href)}
                  className={cn(
                    "relative pb-1 text-slate-300 transition-colors hover:text-white",
                    "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left",
                    "after:scale-x-0 after:bg-linear-to-r after:from-blue-500 after:to-rose-500 after:transition-transform after:duration-300",
                    "data-[active=true]:text-white data-[active=true]:after:scale-x-100"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-semibold uppercase text-slate-100">
                JD
              </div>
              <Button
                size="sm"
                className="bg-linear-to-r from-blue-500 to-rose-500 text-white shadow-lg shadow-blue-500/30"
              >
                Sign out
              </Button>
            </div>
          </div>
        </header>
        <main className="mt-10 flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100">
          {children}
        </main>
      </div>
    </div>
  )
}