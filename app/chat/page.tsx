"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Trash2, Sliders, Bot, Sparkles } from "lucide-react";
import { matchUserQuery, MatchResult } from "@/lib/nlp";
import { ChatMessage, MessageItem } from "@/components/ChatMessage";

const INITIAL_WELCOME_MESSAGE: MessageItem = {
  id: "welcome-1",
  sender: "bot",
  kind: "welcome",
  text: "Hello! I'm DSCASC AI.\n\nI can help you with admissions, all UG & PG courses (BCA, BBA, B.Com, B.Sc, MCA, MBA, M.Com), fees, exams, timetables, placements, campus life and more.\n\nWhat would you like to know?",
  timestamp: "Just now",
  responseMetadata: {
    text: "",
    highlights: [
      "Natural language understanding powered by TF-IDF & Cosine Similarity",
      "Official public information from Dayananda Sagar College of Arts, Science and Commerce",
      "Covers every officially listed UG & PG program, plus verified placement data",
    ],
    suggestions: [
      "What courses does DSCASC offer?",
      "Tell me about B.Com",
      "Where can I find the BCA timetable?",
      "What is the placement record?",
      "How do I contact the college?",
    ],
  },
};

function ChatInterface() {
  const searchParams = useSearchParams();
  const initialQueryHandled = useRef(false);

  const [messages, setMessages] = useState<MessageItem[]>([INITIAL_WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll ONLY the conversation container. scrollIntoView() would also scroll
  // every ancestor scroller (including the window), jumping the whole page down.
  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    // Keep the empty state pinned to the top so the identity header and
    // suggestions are visible; only auto-scroll once the conversation starts.
    if (messages.length <= 1 && !isTyping) return;
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle URL query parameter if passed (e.g. from landing page topic cards)
  useEffect(() => {
    if (initialQueryHandled.current) return;
    const q = searchParams.get("q");
    if (q && q.trim().length > 0) {
      initialQueryHandled.current = true;
      handleSendMessage(q.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessageId = `user-${Date.now()}`;

    const userMsg: MessageItem = {
      id: userMessageId,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Run the local NLP intent matcher (small delay for natural UX)
    setTimeout(() => {
      const matchResult: MatchResult = matchUserQuery(text);

      const botMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: matchResult.matchedIntent.response.text,
        responseMetadata: matchResult.matchedIntent.response,
        analysis: matchResult,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleClearChat = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-brand-sage-light">
      {/* Chat header */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-black bg-white px-4 py-3 sm:px-6">
        <h1 className="sr-only">DSCASC AI — Smart Student Guidance Assistant</h1>
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-brand-charcoal shadow-brutal-sm">
            <Bot className="h-5 w-5 text-brand-yellow" aria-hidden="true" />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 border-2 border-black bg-emerald-400" aria-hidden="true" />
          </span>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-display text-sm font-extrabold text-brand-charcoal sm:text-base">
                DSCASC AI
              </span>
              <span className="border-2 border-black bg-emerald-400 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-black">
                Online
              </span>
            </div>
            <div className="truncate text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Smart Student Guidance Assistant
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAiAnalysis(!showAiAnalysis)}
            aria-pressed={showAiAnalysis}
            title="Toggle the AI / NLP analysis panel on every response"
            className={`brutal-btn brutal-btn-sm ${
              showAiAnalysis ? "brutal-btn-primary" : "bg-white"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">AI Analysis</span>
            <span
              className={`border border-black px-1 text-[9px] font-black ${
                showAiAnalysis ? "bg-black text-brand-yellow" : "bg-brand-sage-light text-brand-charcoal"
              }`}
            >
              {showAiAnalysis ? "ON" : "OFF"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleClearChat}
            title="Reset conversation"
            className="brutal-btn brutal-btn-sm bg-white hover:bg-brand-yellow"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Conversation timeline */}
      <div
        ref={messagesContainerRef}
        className="dot-grid-black flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8"
      >
        <div className="mx-auto max-w-4xl">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onSelectSuggestion={(sugg) => handleSendMessage(sugg)}
              showAiAnalysisAlways={showAiAnalysis}
            />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="mb-4 flex animate-fade-in items-start justify-start">
              <div className="flex w-full max-w-[95%] items-start gap-2.5 sm:max-w-[88%] md:max-w-[80%]">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black bg-brand-charcoal shadow-brutal-sm"
                  aria-hidden="true"
                >
                  <Bot className="h-4 w-4 text-brand-yellow" />
                </span>
                <div
                  className="flex items-center gap-2.5 border-2 border-black bg-white px-4 py-3 shadow-brutal"
                  role="status"
                  aria-live="polite"
                >
                  <span className="flex gap-1" aria-hidden="true">
                    <span className="h-2 w-2 bg-black animate-typing-bounce" />
                    <span className="h-2 w-2 bg-black animate-typing-bounce [animation-delay:0.15s]" />
                    <span className="h-2 w-2 bg-black animate-typing-bounce [animation-delay:0.3s]" />
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-brand-charcoal">
                    Matching intent&hellip;
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t-2 border-black bg-white p-3 sm:p-4">
        <div className="mx-auto max-w-4xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
              // Sending from the button moves focus there — keep the caret in
              // the composer so the user can keep typing.
              inputRef.current?.focus();
            }}
            className="flex items-stretch gap-2"
          >
            <label htmlFor="chat-input" className="sr-only">
              Ask DSCASC AI a question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about admissions, courses (BCA, MBA, B.Com...), timetables, placements, fees..."
              autoComplete="off"
              className="brutal-input flex-1"
              maxLength={400}
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send query"
              className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center border-2 border-black transition-all duration-150 ${
                inputValue.trim() && !isTyping
                  ? "bg-brand-yellow text-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-brutal-none"
                  : "cursor-not-allowed bg-slate-100 text-slate-400 shadow-none"
              }`}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-2 flex flex-col gap-1 text-[11px] font-semibold text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-brand-charcoal" aria-hidden="true" />
              Press Enter to send &bull; Shift + Enter for newline
            </span>
            <span>No authentication required &bull; 100% private</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex h-[calc(100vh-4rem)] items-center justify-center bg-brand-sage-light text-sm font-bold uppercase tracking-wider text-brand-charcoal"
          role="status"
        >
          Loading DSCASC AI Assistant&hellip;
        </div>
      }
    >
      <ChatInterface />
    </Suspense>
  );
}
