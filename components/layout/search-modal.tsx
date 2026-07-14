"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";

import { siteNavigation } from "@/constants/navigation";
import { programs } from "@/data/programs";

type SearchResult = {
  title: string;
  href: string;
  category: string;
};

const staticPages: SearchResult[] = siteNavigation.map((item) => ({
  title: item.label,
  href: item.href,
  category: "Page",
}));

const programResults: SearchResult[] = programs.map((p) => ({
  title: p.title,
  href: `/programs#${p.id}`,
  category: "Program",
}));

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse([...staticPages, ...programResults], {
        keys: ["title", "category"],
        threshold: 0.35,
      }),
    [],
  );

  const results = query.trim()
    ? fuse.search(query).map((r) => r.item).slice(0, 8)
    : staticPages.slice(0, 6);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuery("");
        onClose();
      }
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const navigate = (href: string) => {
    setQuery("");
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-background/60 px-4 pt-24 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4">
              <Search className="size-5 shrink-0 text-muted-foreground" />
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search programs, pages..."
                className="h-14 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted"
                aria-label="Close search"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {results.map((result) => (
                <li key={result.href}>
                  <button
                    type="button"
                    onClick={() => navigate(result.href)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors hover:bg-muted"
                  >
                    <span className="text-sm font-semibold">{result.title}</span>
                    <span className="text-xs text-muted-foreground">{result.category}</span>
                  </button>
                </li>
              ))}
              {results.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No results found
                </li>
              ) : null}
            </ul>
            <div className="border-t border-border/60 px-4 py-3 text-xs text-muted-foreground">
              Press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">Esc</kbd> to close
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
