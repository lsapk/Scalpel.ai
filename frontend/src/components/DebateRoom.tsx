'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentAvatar } from './AgentAvatar';

interface Message {
  agent: 'tech' | 'marketing';
  content: string;
}

interface DebateRoomProps {
  idea: string;
  onComplete: () => void;
}

export const DebateRoom: React.FC<DebateRoomProps> = ({ idea, onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8000/api/debate/stream?idea=${encodeURIComponent(idea)}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsFinished(true);
    };

    return () => eventSource.close();
  }, [idea]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold uppercase tracking-widest">Le Grand Débat</h3>
        <p className="text-muted-foreground text-sm uppercase tracking-wide">Marketing vs Technique</p>
      </div>

      <div
        ref={scrollRef}
        className="h-[500px] overflow-y-auto space-y-6 pr-4 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-4 ${msg.agent === 'marketing' ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <AgentAvatar type={msg.agent} isSpeaking={i === messages.length - 1 && !isFinished} />
              <div className={`flex-1 p-5 rounded-3xl glass ${
                msg.agent === 'marketing' ? 'rounded-tl-none' : 'rounded-tr-none'
              }`}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">
                  Expert {msg.agent}
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {!isFinished && (
          <div className="flex justify-center py-4">
            <div className="flex gap-1">
              {[0, 1, 2].map((d) => (
                <motion.div
                  key={d}
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {isFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center pt-4"
        >
          <button
            className="apple-button bg-success text-white shadow-xl shadow-success/20"
            onClick={onComplete}
          >
            Accéder à l'Architecture Technique
          </button>
        </motion.div>
      )}
    </div>
  );
};
