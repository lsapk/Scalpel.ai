'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API_BASE_URL from '@/lib/api-config';

interface ArchitectureData {
  stack: {
    frontend: string;
    backend: string;
    database: string;
    auth: string;
    apis: string[];
  };
  database_schema: string;
}

export const ArchitectView: React.FC<{ idea: string; onComplete: () => void }> = ({ idea, onComplete }) => {
  const [data, setData] = useState<ArchitectureData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/architect/generate?idea=${encodeURIComponent(idea)}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [idea]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">L'Architecte conçoit votre infrastructure...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-3xl p-8 space-y-6"
        >
          <h3 className="text-xl font-bold uppercase tracking-widest">Stack Technique</h3>
          <div className="space-y-4">
            {data && Object.entries(data.stack).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center border-b border-border/40 pb-2">
                <span className="text-sm font-medium uppercase text-muted-foreground">{key}</span>
                <span className="font-semibold">{Array.isArray(value) ? value.join(', ') : value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-3xl p-8 space-y-6"
        >
          <h3 className="text-xl font-bold uppercase tracking-widest">Base de Données</h3>
          <pre className="text-xs bg-black/5 p-4 rounded-xl overflow-x-auto font-mono">
            {data?.database_schema}
          </pre>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <button
          className="apple-button bg-primary text-primary-foreground shadow-xl shadow-primary/20"
          onClick={onComplete}
        >
          Finaliser le Pitch & Landing Page
        </button>
      </div>
    </div>
  );
};
