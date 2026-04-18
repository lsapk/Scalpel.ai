'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PitchData {
  slides: { title: string; content: string }[];
  landing_page: {
    hero_title: string;
    hero_subtitle: string;
    features: string[];
  };
}

export const PitchView: React.FC<{ idea: string }> = ({ idea }) => {
  const [data, setData] = useState<PitchData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/pitch/generate?idea=${encodeURIComponent(idea)}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [idea]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Le Ghost Pitcher prépare votre présentation...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <h3 className="text-2xl font-bold uppercase tracking-widest text-center">Pitch Deck</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {data?.slides.map((slide, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl aspect-video flex flex-col justify-center text-center space-y-2"
            >
              <h4 className="font-bold text-primary">{slide.title}</h4>
              <p className="text-xs text-muted-foreground">{slide.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-bold uppercase tracking-widest text-center">Aperçu Landing Page</h3>
        <div className="glass rounded-[32px] overflow-hidden border border-border/40 shadow-2xl">
          <div className="bg-secondary/30 p-4 border-b border-border/40 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-orange-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            <div className="bg-background/50 px-4 py-1 rounded-md text-[10px] text-muted-foreground w-64 text-center">
              www.votre-startup.com
            </div>
          </div>
          <div className="p-12 text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tight">{data?.landing_page.hero_title}</h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">{data?.landing_page.hero_subtitle}</p>
            <div className="flex justify-center gap-4">
              <button className="apple-button bg-primary text-primary-foreground">Démarrer</button>
              <button className="apple-button bg-secondary">En savoir plus</button>
            </div>
            <div className="grid md:grid-cols-3 gap-8 pt-12">
              {data?.landing_page.features.map((feature, i) => (
                <div key={i} className="space-y-2">
                  <div className="w-10 h-10 bg-primary/5 rounded-full mx-auto" />
                  <p className="text-sm font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
