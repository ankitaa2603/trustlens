"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Minimize2, Maximize2 } from "lucide-react";
import { LexiAvatar } from "./LexiAvatar";
import { Button } from "@/components/ui/button";
import { LexiContext } from "@/types";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface LexiAssistantProps {
  context?: LexiContext;
}

const contextMessages: Record<LexiContext, string> = {
  default: "Hello, I'm Lexi 👋 How can I help you today?",
  dashboard: "Need help understanding your Trust Score?",
  upload: "Ready to analyze a document?",
  analysis: "Would you like me to explain these clauses?",
  history: "Looking for a previous report?",
  walkthrough: "Let's complete your onboarding together.",
  demo: "Welcome to Demo Mode! Explore our sample analyses.",
};

const quickActions = [
  { label: "Upload Document", query: "How do I upload a document?" },
  { label: "Explain Trust Score", query: "Explain Trust Score" },
  { label: "Help Me Start", query: "How do I start?" },
  { label: "Show Features", query: "Show me platform features" },
];

export function LexiAssistant({ context = "default" }: LexiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: contextMessages[context],
        },
      ]);
    }
  }, [isOpen, context, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/lexi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context }),
      });
      const data = await res.json();
      const reply =
        data.response ||
        data.error ||
        "I couldn't generate a reply. Check that GEMINI_API_KEY is in .env.local and restart the dev server.";
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="tour-lexi"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-card border border-border hover:border-accent/40 rounded-2xl pl-3 pr-5 py-2.5 shadow-2xl shadow-black/40 transition-colors cursor-pointer"
            aria-label="Open Lexi assistant"
          >
            <LexiAvatar size="sm" />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-accent">Lexi</p>
              <p className="text-xs text-secondary-text">Ask me anything</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "fixed z-50 bg-card border border-border rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden",
              isMinimized
                ? "bottom-6 right-6 w-72 h-14"
                : "bottom-6 right-6 w-[380px] h-[520px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
            )}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/50">
              <div className="flex items-center gap-3">
                <LexiAvatar size="sm" />
                <div>
                  <p className="text-sm font-semibold text-primary-text font-[family-name:var(--font-space-grotesk)]">
                    Lexi
                  </p>
                  <p className="text-xs text-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-border text-secondary-text hover:text-primary-text transition-colors cursor-pointer"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-border text-secondary-text hover:text-primary-text transition-colors cursor-pointer"
                  aria-label="Close Lexi"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-2",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === "assistant" && <LexiAvatar size="sm" blinking={false} />}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-accent/20 text-primary-text border border-accent/20"
                            : "bg-background text-secondary-text border border-border"
                        )}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-2 items-center">
                      <LexiAvatar size="sm" blinking={false} />
                      <div className="bg-background border border-border rounded-xl px-4 py-3 flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 bg-accent rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {messages.length <= 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => sendMessage(action.query)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-accent/40 text-secondary-text hover:text-accent transition-colors cursor-pointer"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="p-4 border-t border-border">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage(input);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask Lexi anything..."
                      className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-primary-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                      aria-label="Message to Lexi"
                    />
                    <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
