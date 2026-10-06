"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  Trash2,
  Sliders,
  Sparkles,
  Bot,
  RefreshCw,
  Info,
  CheckCircle,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { matchUserQuery, MatchResult } from "@/lib/nlp";
import { ChatMessage, MessageItem } from "@/components/ChatMessage";

const INITIAL_WELCOME_MESSAGE: MessageItem = {
  id: "welcome-1",
  sender: "bot",
  text: "Hello! I'm DSCASC AI.\n\nI can help you with admissions, courses, fees, exams, timetables, BCA information, placements and more.\n\nWhat would you like to know?",
  timestamp: "Just now",
  responseMetadata: {
    text: "",
    highlights: [
      "Natural language understanding powered by TF-IDF & Cosine Similarity",
      "Official public information from Dayananda Sagar College of Arts, Science and Commerce",
      "Verified 2024-25 placement statistics and department links",
    ],
    suggestions: [
      "How can I apply for BCA?",
      "What courses does DSCASC offer?",
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
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle URL query parameter if passed (e.g. from Landing page topic cards)
  useEffect(() => {
    if (initialQueryHandled.current) return;
    const q = searchParams.get("q");
    if (q && q.trim().length > 0) {
      initialQueryHandled.current = true;
      handleSendMessage(q.trim());
    }
  }, [searchParams]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessageId = `user-${Date.now()}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: MessageItem = {
      id: userMessageId,
      sender: "user",
      text,
      timestamp: timeString,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Run the NLP intent matcher (simulating slight natural response delay for UX)
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
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-slate-100">
      {/* Top Chat Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5 sm:px-6 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-dsc-navy text-white shadow-2xs">
              <Bot className="h-5 w-5 text-dsc-gold" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <span>DSCASC AI</span>
              <span className="rounded-full bg-blue-100 px-1.5 py-0.2 text-[9px] font-extrabold text-dsc-blue">
                Online
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Automated Student Guidance &bull; NLP Intent Engine
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* AI Analysis / Demo Mode Toggle */}
          <button
            type="button"
            onClick={() => setShowAiAnalysis(!showAiAnalysis)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              showAiAnalysis
                ? "bg-dsc-navy text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
            title="Toggle expanded AI / NLP viva analysis panel on all responses"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">AI Analysis</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                showAiAnalysis ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              {showAiAnalysis ? "ON" : "OFF"}
            </span>
          </button>

          {/* Clear Chat */}
          <button
            type="button"
            onClick={handleClearChat}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
            title="Reset conversation"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Messages Timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
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
            <div className="flex items-center gap-2 text-xs text-slate-500 animate-fade-in pl-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-dsc-blue/10 text-dsc-blue">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 border border-slate-200 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-dsc-blue animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-dsc-blue animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-dsc-blue animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] font-medium text-slate-600">Matching intent...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="border-t border-slate-200 bg-white p-3 sm:p-4">
        <div className="mx-auto max-w-4xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about admissions, BCA timetable, syllabus, placements, fees..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-inner focus:border-dsc-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                disabled={isTyping}
                maxLength={400}
              />
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-medium transition-all ${
                inputValue.trim() && !isTyping
                  ? "bg-dsc-navy text-white shadow-sm hover:bg-dsc-blue active:scale-95 cursor-pointer"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
              aria-label="Send query"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600 px-1">
            <span>Press Enter to send &bull; Shift + Enter for newline</span>
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
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center text-sm text-slate-500">
          Loading DSCASC AI Assistant...
        </div>
      }
    >
      <ChatInterface />
    </Suspense>
  );
}
