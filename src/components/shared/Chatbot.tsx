"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaMinus,
  FaLightbulb,
} from "react-icons/fa";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages,
        }),
      });

      const data = await res.json();

      setMessages([...updatedMessages, { role: "model", text: data.reply }]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          role: "model",
          text: "Sorry, I'm having trouble connecting. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatAIResponse = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => {
      if (line.match(/^[\s]*[•\-*]\s/)) {
        return (
          <div key={index} className="flex items-start gap-2 my-1.5">
            <span className="text-green-500 mt-0.5">•</span>
            <span className="text-gray-700 text-sm">{line.replace(/^[\s]*[•\-*]\s/, '')}</span>
          </div>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <div key={index} className="flex items-start gap-2 my-1.5">
            <span className="text-green-600 font-semibold text-sm min-w-[20px]">
              {line.match(/^\d+\./)?.[0]}
            </span>
            <span className="text-gray-700 text-sm">{line.replace(/^\d+\.\s/, '')}</span>
          </div>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={index} className="flex items-center gap-2 my-2">
            <span className="text-green-600 text-sm">✨</span>
            <span className="font-semibold text-gray-800 text-sm">
              {line.replace(/\*\*/g, '')}
            </span>
          </div>
        );
      }
      if (line.toLowerCase().includes('recommend') || line.toLowerCase().includes('suggest')) {
        return (
          <div key={index} className="flex items-start gap-2 my-1.5 p-2 bg-green-50 rounded-lg border border-green-100">
            <FaLightbulb className="text-yellow-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{line}</span>
          </div>
        );
      }
      return (
        <p key={index} className="text-gray-700 text-sm leading-relaxed my-1">
          {line}
        </p>
      );
    });
  };

  const suggestedQuestions = [
    "My AC isn't cooling properly",
    "I need a plumber for a leak",
    "How much does cleaning cost?",
    "Find a tutor for math",
  ];

  return (
    <>
      {/* Chat Button - Floating */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-300 hover:scale-110 flex items-center justify-center group cursor-pointer"
          aria-label="Open chat"
        >
          <FaCommentDots className="text-2xl group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FaRobot className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">HomeCrew AI</h3>
                <p className="text-emerald-100/80 text-[10px]">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleMinimize}
                className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                aria-label="Minimize"
              >
                <FaMinus className="text-sm" />
              </button>
              <button
                onClick={toggleChat}
                className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                aria-label="Close chat"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>

          {/* Minimized State */}
          {isMinimized ? (
            <div className="p-4 text-center">
              <button
                onClick={toggleMinimize}
                className="text-sm text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
              >
                Expand chat
              </button>
            </div>
          ) : (
            <>
              {/* Messages - Original height */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-3">
                      <FaRobot className="text-2xl text-green-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-700">Hi there! 👋</h4>
                    <p className="text-xs text-gray-500 max-w-[220px] mt-1">
                      Describe your home problem and I'll help find the right service.
                    </p>
                    <div className="mt-3 space-y-1.5 w-full">
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInput(question);
                            setTimeout(() => sendMessage(), 100);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex items-start gap-2 max-w-[85%]">
                        {msg.role === "model" && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FaRobot className="text-white text-xs" />
                          </div>
                        )}
                        <div
                          className={`px-3 py-2 rounded-xl text-sm ${
                            msg.role === "user"
                              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-sm"
                              : "bg-white border border-gray-200 text-gray-700 rounded-bl-sm shadow-sm"
                          }`}
                        >
                          {msg.role === "model" ? (
                            <div className="space-y-1">
                              {formatAIResponse(msg.text)}
                            </div>
                          ) : (
                            msg.text
                          )}
                        </div>
                        {msg.role === "user" && (
                          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FaUser className="text-gray-500 text-xs" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                      </div>
                      <span className="text-xs text-gray-400">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-gray-100 bg-white">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your problem..."
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                    disabled={loading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                    aria-label="Send message"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 text-center">
                  AI-powered assistant • May take a few seconds
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;