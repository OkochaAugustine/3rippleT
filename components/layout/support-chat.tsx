"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

const quickReplies = [
  "Membership pricing",
  "Class schedule",
  "Book a free intro",
  "Location & hours",
];

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    {
      role: "bot",
      text: "Welcome to 3Ripple T Fitness! How can we help you today?",
    },
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      {
        role: "bot",
        text: "Thanks for reaching out! A coach will respond shortly. For instant help, use our WhatsApp button.",
      },
    ]);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-3 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
              <div>
                <p className="text-sm font-bold">Support</p>
                <p className="text-xs opacity-70">Usually replies within minutes</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-border/60 px-3 py-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-border/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {reply}
                </button>
              ))}
            </div>

            <form
              className="flex gap-2 border-t border-border/60 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(message);
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform hover:scale-105"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex size-14 items-center justify-center rounded-full border border-border/60 bg-card text-foreground shadow-lg"
        aria-label={open ? "Close support chat" : "Open support chat"}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6 text-accent" />}
      </motion.button>
    </div>
  );
}
