'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BarChart3, Code2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Analytics that answer",
    description:
      "Understand every click with real-time dashboards, geo insights, and campaign tagging baked in.",
    icon: BarChart3,
    colors: "from-blue-500/30 to-blue-400/10",
  },
  {
    title: "Custom shortcodes",
    description:
      "Turn long, messy URLs into branded, memorable slugs that match your voice and tracking needs.",
    icon: Code2,
    colors: "from-rose-500/30 to-red-500/10",
  },
  {
    title: "Redis-level latency",
    description:
      "Edge caching powered by Redis keeps every redirect blazing fast no matter where your audience lives.",
    icon: Zap,
    colors: "from-blue-600/30 to-rose-500/20",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
          <div className="text-lg font-semibold tracking-tight">
            <span className="text-blue-400">Short</span>
            <span className="text-rose-400">ly</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-blue-100"
            >
              Sign in
            </Button>
            <Button className="bg-linear-to-r from-blue-500 to-rose-500 text-white shadow-lg shadow-blue-500/30">
              Sign up
            </Button>
          </div>
        </header>

        <main className="mt-20 flex flex-1 flex-col gap-20 pb-24">
          <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium text-slate-100">
                Instant redirects · zero guesswork
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl">
                Shorten smarter. Track deeper. Ship campaigns in seconds.
              </h1>
              <p className="text-lg text-slate-300">
                Shortly is the URL shortener built for product teams who crave speed and signal.
                Deliver custom, branded links with live analytics and Redis-powered latency under
                30&nbsp;ms.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="group bg-linear-to-r from-blue-500 to-rose-500 text-white">
                  Get started free
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-blue-100"
                >
                  <Link href="#features" className="flex items-center gap-2 text-current">
                    See how it works
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 text-sm text-slate-200">
                <div>
                  <p className="text-3xl font-semibold text-white">4.8ms</p>
                  <p>average redirect time</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-white">2.4B+</p>
                  <p>tracked clicks this year</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-white">99.99%</p>
                  <p>uptime with global edge</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-blue-500/30 via-slate-900 to-rose-500/30 p-8 text-slate-100 shadow-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_50%)]" />
              <div className="relative space-y-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-200">
                  Live preview
                </p>
                <div className="space-y-4 rounded-2xl bg-black/30 p-6 backdrop-blur">
                  <p className="text-xs text-slate-300">https://short.ly/create</p>
                  <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs text-slate-400">Destination URL</p>
                    <p className="truncate text-lg text-white">
                      https://productlaunch.com/blog/shortly-customer-love-2025
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs text-slate-400">Custom shortcode</p>
                    <p className="text-lg font-semibold text-rose-200">/customer-love</p>
                  </div>
                  <Button className="w-full bg-linear-to-r from-blue-500 to-rose-500 text-white">
                    Generate link
                  </Button>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="space-y-10">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
                Built for performance
              </p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Everything you need for unforgettable links.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div
                    className={`mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-linear-to-br ${feature.colors}`}
                  >
                    <feature.icon className="size-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-slate-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
