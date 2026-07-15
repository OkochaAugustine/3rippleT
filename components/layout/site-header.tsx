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

  // Decide colors based on transparent or scrolled states
  // Since all page heroes have dark layouts/gradients, force white elements at scrollY === 0
  const textColorClass = scrolled
    ? "text-foreground hover:text-accent"
    : "text-white/80 hover:text-white";

  const activeTextColorClass = scrolled
    ? "text-accent"
    : "text-white";

  return (
    <>
      <header
        className={cn(
          "fixed z-50 transition-all duration-500 ease-out",
          showNavbar ? "translate-y-0" : "-translate-y-full",
          scrolled
            ? "top-4 left-4 right-4 mx-auto max-w-5xl rounded-full border border-border/40 bg-card/85 px-4 shadow-xl backdrop-blur-xl"
            : "top-0 left-0 right-0 w-full border-b border-white/5 bg-transparent px-0"
        )}
      >
        <Container className="flex h-[4.5rem] items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${siteConfig.name} home`}
          >
            <motion.div 
              className="relative h-11 w-11 overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm"
              whileHover={{ scale: 1.08, rotate: [0, -6, 6, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/images/logo.png"
                alt=""
                fill
                className="object-contain p-1.5"
              />
            </motion.div>
            <span
              className={cn(
                "hidden font-display text-sm font-black leading-tight tracking-tight sm:block transition-colors duration-300",
                scrolled ? "text-foreground" : "text-white"
              )}
            >
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation Link Menu */}
          <nav
            className="hidden items-center gap-1.5 xl:flex"
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
                        "nav-link-glow group relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300",
                        isActive ? activeTextColorClass : textColorClass
                      )}
                    >
                      <span className="relative z-10 flex items-center gap-1">
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform duration-300",
                            programsOpen && "rotate-180"
                          )}
                        />
                      </span>

                      {/* Pill active slide indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavBackground"
                          className={cn(
                            "absolute inset-0 -z-10 rounded-full",
                            scrolled ? "bg-accent/10" : "bg-white/15"
                          )}
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
                          className="absolute left-1/2 top-full z-50 mt-2 w-[38rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-4 shadow-2xl backdrop-blur-xl"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            {item.megaMenu.map((program) => (
                              <Link
                                key={program.href}
                                href={program.href}
                                className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-muted/80"
                              >
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                                  <Image
                                    src={program.image}
                                    alt={program.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-bold">{program.title}</p>
                                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                                    {program.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-3 border-t border-border/60 pt-3">
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
                    "nav-link-glow group relative rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300",
                    isActive ? activeTextColorClass : textColorClass
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Pill active slide indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className={cn(
                        "absolute inset-0 -z-10 rounded-full",
                        scrolled ? "bg-accent/10" : "bg-white/15"
                      )}
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
              className={cn(
                "rounded-full hover:bg-muted/60 transition-colors",
                scrolled ? "text-foreground" : "text-white/80 hover:text-white"
              )}
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
                className={cn(
                  "rounded-full hover:bg-muted/60 transition-colors",
                  scrolled ? "text-foreground" : "text-white/80 hover:text-white"
                )}
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
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-border/60 py-1.5 pl-1.5 pr-3 transition-colors",
                    scrolled ? "bg-muted/40 hover:bg-muted/70" : "bg-white/10 hover:bg-white/20 text-white"
                  )}
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
              <div className="hidden lg:flex items-center gap-2">
                {/* Explicit Login CTA */}
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-full px-4 font-semibold hover:bg-muted/20 transition-all duration-300",
                    scrolled ? "text-foreground" : "text-white/90 hover:text-white"
                  )}
                >
                  <Link href="/login">Sign In</Link>
                </Button>

                {/* Primary Join CTA with premium animations */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    className="rounded-full bg-accent font-bold text-accent-foreground shadow-glow hover:shadow-[0_0_20px_var(--color-accent)] transition-all"
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
              className={cn(
                "rounded-full xl:hidden transition-colors z-50",
                scrolled || isOpen ? "text-foreground" : "text-white/80 hover:text-white"
              )}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
            >
              <HamburgerIcon open={isOpen} />
            </Button>
          </div>
        </Container>

        {/* Premium Full-Screen/Drawer Mobile Menu */}
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl xl:hidden pt-[5.5rem] px-6 pb-8 overflow-y-auto"
            >
              <nav className="flex flex-col gap-3 mt-4" aria-label="Mobile navigation">
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
                        "flex items-center text-xl font-black py-2.5 transition-colors",
                        pathname === item.href
                          ? "text-accent"
                          : "text-foreground hover:text-accent"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.megaMenu ? (
                      <div className="ml-3 pl-3 space-y-1.5 border-l border-border/60">
                        {item.megaMenu.map((program) => (
                          <Link
                            key={program.href}
                            href={program.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-1 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors"
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
                className="mt-auto border-t border-border/40 pt-6 flex flex-col gap-3"
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
                  className="w-full rounded-full bg-accent text-accent-foreground shadow-glow font-bold"
                >
                  <Link href={isHome ? "#contact" : "/register"} onClick={() => setIsOpen(false)}>
                    Join Now
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
