import Image from "next/image";
import Link from "next/link";

import { AtSign, Mail, MapPin, MessageCircle, MoveUpRight, Phone } from "lucide-react";

import { footerNavigation } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background text-foreground transition-colors duration-300">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="relative h-14 w-14 overflow-hidden rounded-lg bg-accent border border-accent"
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
                <p className="font-display text-lg font-black">{siteConfig.name}</p>
                <p className="text-sm text-primary-foreground/62">
                  Training systems for stronger days.
                </p>
              </div>
            </div>
            <Badge variant="accent" className="mt-6">
              Premium fitness foundation
            </Badge>
            <div className="mt-8 grid gap-3 text-sm text-primary-foreground/72">
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

          <div className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/[0.04] p-5">
            <p className="font-display text-xl font-black">Train with intent.</p>
            <p className="mt-2 text-sm leading-6 text-primary-foreground/66">
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
                className="h-12 rounded-md border border-primary-foreground/12 bg-background/10 px-4 text-sm text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/42 focus:border-accent"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-primary-foreground/12 pt-10 sm:grid-cols-3">
          {footerNavigation.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/54">
                {group.title}
              </p>
              <ul className="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-primary-foreground/72 transition-colors hover:text-accent"
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

        <div className="mt-12 flex flex-col gap-5 border-t border-primary-foreground/12 pt-6 text-sm text-primary-foreground/58 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.links.instagram}
              className="transition-colors hover:text-accent"
              aria-label="Instagram"
            >
              <AtSign className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href={siteConfig.links.twitter}
              className="transition-colors hover:text-accent"
              aria-label="X"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href={`mailto:${siteConfig.links.email}`}
              className="transition-colors hover:text-accent"
              aria-label="Email"
            >
              <Mail className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
