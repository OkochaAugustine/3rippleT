"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Moon,
  Search,
  Sun,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { siteNavigation } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils/helpers";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SearchModal } from "@/components/layout/search-modal";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-6 text-current" aria-hidden="true">
      <motion.span
        className="absolute left-0 top-0 block h-0.5 w-full rounded-full bg-current"
        animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute left-0 top-[9px] block h-0.5 w-full rounded-full bg-current"
        animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute bottom-0 left-0 block h-0.5 w-full rounded-full bg-current"
        animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Custom navigation interactions
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setProgramsOpen(false);
    setProfileOpen(false);
  }

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled past threshold
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide or reveal based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setShowNavbar(false); // Scrolling down, hide
      } else {
        setShowNavbar(true); // Scrolling up, show
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  if (isDashboard) return null;

  // Navbar stays transparent in every state — a soft drop-shadow on the
  // text (not a solid fill behind it) is what keeps things legible over
  // any hero media, and a faint glass tint appears only once scrolled.
  // Nav links are green (brand accent) in both active and inactive states.
  // The "!" prefix forces this to win the cascade against any other global
  // rule (e.g. a scoped stylesheet elsewhere that used to force white text).
  const textColorClass = "!text-accent [text-shadow:0_1px_8px_rgba(0,0,0,0.85)]";
  const activeTextColorClass = "!text-accent [text-shadow:0_1px_8px_rgba(0,0,0,0.85)]";

  return (
    <>
      <header
        className={cn(
          "fixed z-50 transition-all duration-500 ease-out",
          showNavbar ? "translate-y-0" : "-translate-y-full",
          scrolled
            ? "top-4 left-4 right-4 mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/[0.06] px-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            : "top-0 left-0 right-0 w-full bg-transparent px-0"
        )}
      >
        {/* Faint top-down scrim — invisible on its own, but keeps text
            readable over bright hero media without ever reading as a
            solid bar. Fades away once the glass pill takes over on scroll. */}
        {!scrolled && (
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />
        )}

        <Container className="flex h-20 items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${siteConfig.name} home`}
          >
            <motion.div
              className="relative h-20 w-20 shrink-0 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] sm:h-24 sm:w-24"
              whileHover={{ scale: 1.08, rotate: [0, -6, 6, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                fill
                sizes="(min-width: 640px) 96px, 80px"
                priority
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation Link Menu */}
          <nav
            className="hidden items-center gap-2 lg:flex"
            aria-label="Main navigation"
          >
            {siteNavigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              if (item.megaMenu) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setProgramsOpen(true)}
                    onMouseLeave={() => setProgramsOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "nav-link-glow group relative flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                        isActive ? activeTextColorClass : textColorClass
                      )}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-300",
                            programsOpen && "rotate-180"
                          )}
                        />
                      </span>

                      {/* Pill active slide indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavBackground"
                          className="absolute inset-0 -z-10 rounded-xl bg-white/10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {programsOpen ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full z-50 mt-2 w-[42rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-5 shadow-2xl backdrop-blur-2xl"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {item.megaMenu.map((program) => (
                              <Link
                                key={program.href}
                                href={program.href}
                                className="group flex gap-4 rounded-xl p-4 transition-all hover:bg-white/10"
                              >
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                                  <Image
                                    src={program.image}
                                    alt={program.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white">{program.title}</p>
                                  <p className="mt-1 text-xs text-white/60 line-clamp-2">
                                    {program.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 border-t border-white/10 pt-4">
                            <Link
                              href="/programs"
                              className="text-sm font-semibold text-accent hover:underline"
                            >
                              View all programs →
                            </Link>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-link-glow group relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                    isActive ? activeTextColorClass : textColorClass
                  )}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Pill active slide indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 -z-10 rounded-xl bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Buttons: Search, Dark Mode, Authentication */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Toggle */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-xl text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="size-5" />
            </Button>

            {/* Light/Dark Theme Switcher */}
            {mounted ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-xl text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="size-5" />
                  ) : (
                    <Moon className="size-5" />
                  )}
                </motion.div>
              </Button>
            ) : null}

            {/* Profile Dropdown or Join CTAs */}
            {isAuthenticated && user ? (
              <div ref={profileRef} className="relative hidden lg:block">
                <button
                  type="button"
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-3 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] transition-colors hover:bg-white/20"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-24 truncate text-sm font-semibold">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="size-3.5 opacity-60" />
                </button>

                <AnimatePresence>
                  {profileOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border/60 bg-card shadow-xl"
                    >
                      <div className="border-b border-border/60 px-4 py-3">
                        <p className="text-sm font-bold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="p-1.5">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                          onClick={() => setProfileOpen(false)}
                        >
                          <LayoutDashboard className="size-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                          onClick={() => setProfileOpen(false)}
                        >
                          <User className="size-4" />
                          Profile
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setProfileOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
                        >
                          <LogOut className="size-4" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden items-center gap-2 lg:flex">
                {/* Explicit Login CTA */}
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-4 font-semibold text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] transition-all duration-300 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/login">Sign In</Link>
                </Button>

                {/* Primary Join CTA with premium animations */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    className="rounded-full bg-accent font-bold text-accent-foreground shadow-glow transition-all hover:shadow-[0_0_20px_var(--color-accent)]"
                  >
                    <Link href={isHome ? "#contact" : "/register"}>
                      Join Now
                    </Link>
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="z-[100] rounded-full text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] transition-colors xl:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
            >
              <HamburgerIcon open={isOpen} />
            </Button>
          </div>
        </Container>
      </header>

      {/* Premium Full-Screen/Drawer Mobile Menu */}
      <AnimatePresence>
        {isOpen ? (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm xl:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-y-auto bg-background px-6 pb-8 pt-[5.5rem] backdrop-blur-2xl xl:hidden"
            >
              <nav className="mt-4 flex flex-col gap-3" aria-label="Mobile navigation">
                {siteNavigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center py-2.5 text-xl font-black transition-colors",
                        pathname === item.href
                          ? "text-accent"
                          : "text-foreground hover:text-accent"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.megaMenu ? (
                      <div className="ml-3 space-y-1.5 border-l border-border/60 pl-3">
                        {item.megaMenu.map((program) => (
                          <Link
                            key={program.href}
                            href={program.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-accent"
                          >
                            {program.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-auto flex flex-col gap-3 border-t border-border/40 pt-6"
              >
                {!isAuthenticated && (
                  <Button asChild variant="outline" size="lg" className="w-full rounded-full">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                )}
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-accent font-bold text-accent-foreground shadow-glow"
                >
                  <Link href={isHome ? "#contact" : "/register"} onClick={() => setIsOpen(false)}>
                    Join Now
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}