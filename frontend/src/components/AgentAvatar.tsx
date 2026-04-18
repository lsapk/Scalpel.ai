import React from 'react';
import { motion } from 'framer-motion';

interface AgentAvatarProps {
  type: 'tech' | 'marketing' | 'devil';
  isSpeaking?: boolean;
}

export const AgentAvatar: React.FC<AgentAvatarProps> = ({ type, isSpeaking }) => {
  const colors = {
    tech: '#0071e3', // Apple Blue
    marketing: '#ff9500', // Apple Orange
    devil: '#ff3b30', // Apple Red
  };

  const color = colors[type];

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      {isSpeaking && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          style={{ backgroundColor: color }}
        />
      )}
      <motion.div
        className="relative z-10 w-full h-full rounded-2xl flex items-center justify-center shadow-lg"
        animate={isSpeaking ? { y: [0, -4, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ backgroundColor: color }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          {type === 'tech' && (
            <>
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </>
          )}
          {type === 'marketing' && (
            <>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </>
          )}
          {type === 'devil' && (
            <>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
