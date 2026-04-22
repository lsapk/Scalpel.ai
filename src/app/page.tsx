'use client';

import React, { useState } from 'react';
import WarRoomLayout from '@/components/WarRoomLayout';
import { motion } from 'framer-motion';
import { QuestionTunnel } from '@/components/QuestionTunnel';
import { DebateRoom } from '@/components/DebateRoom';
import { ArchitectView } from '@/components/ArchitectView';
import { PitchView } from '@/components/PitchView';

type StepStatus = 'locked' | 'current' | 'completed';

interface Step {
  id: number;
  title: string;
  status: StepStatus;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [idea, setIdea] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [showDebate, setShowDebate] = useState(false);
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: 'Validation', status: 'current' },
    { id: 2, title: 'Technique', status: 'locked' },
    { id: 3, title: 'Marché', status: 'locked' },
    { id: 4, title: 'Pitch', status: 'locked' },
  ]);

  const handleValidationComplete = (data: any) => {
    setShowDebate(true);
  };

  const handleDebateComplete = () => {
    setCurrentStep(2);
    setSteps(prev => prev.map(s => {
      if (s.id === 1) return { ...s, status: 'completed' };
      if (s.id === 2) return { ...s, status: 'current' };
      return s;
    }));
    setShowDebate(false);
  };

  const handleArchitectComplete = () => {
    setCurrentStep(3);
    setSteps(prev => prev.map(s => {
      if (s.id === 2) return { ...s, status: 'completed' };
      if (s.id === 3) return { ...s, status: 'current' };
      return s;
    }));
  };

  const handleRestart = () => {
    setIsStarted(false);
    setShowDebate(false);
    setCurrentStep(1);
    setIdea("");
    setSteps([
      { id: 1, title: 'Validation', status: 'current' },
      { id: 2, title: 'Technique', status: 'locked' },
      { id: 3, title: 'Marché', status: 'locked' },
      { id: 4, title: 'Pitch', status: 'locked' },
    ]);
  };

  return (
    <WarRoomLayout steps={steps} currentStep={currentStep}>
      <div className="space-y-12">
        {!isStarted ? (
          <>
            <section className="text-center space-y-4">
              <motion.h2
                className="text-4xl md:text-5xl font-bold tracking-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                Lancer votre startup n'est pas un jeu.
              </motion.h2>
              <motion.p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Passez par la War Room. Validez votre idée, construisez votre architecture et testez votre marché avec l'aide de l'IA.
              </motion.p>
            </section>

            <section className="glass rounded-[32px] p-8 md:p-12 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">Quelle est votre idée ?</h3>
                <p className="text-muted-foreground">Soyez aussi précis ou vague que vous le souhaitez. L'IA vous aidera à affiner.</p>
              </div>

              <div className="space-y-4">
                <textarea
                  className="w-full h-40 bg-background/50 border border-border rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-lg"
                  placeholder="Exemple: Une application qui permet de louer des outils de bricolage entre voisins via une carte interactive..."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                />

                <div className="flex justify-end">
                  <button
                    disabled={!idea.trim()}
                    className="apple-button bg-primary text-primary-foreground hover:opacity-90 shadow-xl shadow-primary/20 disabled:opacity-30"
                    onClick={() => setIsStarted(true)}
                  >
                    Initialiser la War Room
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : showDebate ? (
          <DebateRoom idea={idea} onComplete={handleDebateComplete} />
        ) : currentStep === 1 ? (
          <QuestionTunnel idea={idea} onComplete={handleValidationComplete} />
        ) : currentStep === 2 ? (
          <ArchitectView idea={idea} onComplete={handleArchitectComplete} />
        ) : (
          <PitchView idea={idea} onRestart={handleRestart} />
        )}

        <section className="grid md:grid-cols-3 gap-6">
          {[
            { title: "L'Avocat du Diable", desc: "Sature votre idée de critiques constructives pour trouver les failles." },
            { title: "L'Architecte", desc: "Génère votre stack technique et votre schéma de base de données." },
            { title: "Le Ghost Pitcher", desc: "Crée un pitch deck et une landing page professionnelle." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="glass rounded-3xl p-6 space-y-2 border-border/20"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <h4 className="font-bold">{feature.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </WarRoomLayout>
  );
}
