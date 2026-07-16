import Image from "next/image";
import Link from "next/link";

import { AtSign, Mail, MapPin, MessageCircle, MoveUpRight, Phone } from "lucide-react";

import { footerNavigation } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Ambient accent glow — same soft bloom language as the navbar,
          Programs section, and loading screen */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 size-[32rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 right-0 size-[28rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      {/* Faint grid for texture, matching the loading screen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <Container className="relative py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="relative h-14 w-14 overflow-hidden rounded-lg border border-accent/40 bg-accent shadow-[0_0_30px_-8px_var(--color-accent)]"
                aria-hidden="true"
              >
                <Image
                  src="/images/placeholders/logo.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-display text-lg font-black text-white">{siteConfig.name}</p>
                <p className="text-sm text-white/60">
                  Training systems for stronger days.
                </p>
              </div>
            </div>
            <Badge variant="accent" className="mt-6">
              Premium fitness foundation
            </Badge>
            <div className="mt-8 grid gap-3 text-sm text-white/70">
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-accent"
              >
                <Mail className="size-4" aria-hidden="true" />
                {siteConfig.links.email}
              </a>
              <a
                href={`tel:${siteConfig.links.phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-accent"
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.links.phone}
              </a>
              <p className="inline-flex items-center gap-3">
                <MapPin className="size-4" aria-hidden="true" />
                {siteConfig.links.address}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg backdrop-blur-xl">
            <p className="font-display text-xl font-black text-white">Train with intent.</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Join the newsletter for membership drops, class updates, and performance
              notes from {siteConfig.name}.
            </p>
            <form className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                className="h-12 rounded-md border border-white/15 bg-black/40 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-accent"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-5 text-sm font-bold text-accent-foreground shadow-[0_0_20px_-6px_var(--color-accent)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_28px_-4px_var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
          {footerNavigation.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                {group.title}
              </p>
              <ul className="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-accent"
                    >
                      {link.label}
                      <MoveUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.links.instagram}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:border-accent/40 hover:text-accent"
              aria-label="Instagram"
            >
              <AtSign className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={siteConfig.links.twitter}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:border-accent/40 hover:text-accent"
              aria-label="X"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={`mailto:${siteConfig.links.email}`}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:border-accent/40 hover:text-accent"
              aria-label="Email"
            >
              <Mail className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}