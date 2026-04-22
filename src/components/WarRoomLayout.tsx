import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

interface Step {
  id: number;
  title: string;
  status: 'locked' | 'current' | 'completed';
}

interface WarRoomLayoutProps {
  children: React.ReactNode;
  steps: Step[];
  currentStep: number;
}

export default function WarRoomLayout({ children, steps, currentStep }: WarRoomLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      <header className="fixed top-0 w-full z-50 glass border-b border-border/40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">W</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight">WAR ROOM</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-2 transition-opacity",
                  step.status === 'locked' ? "opacity-30" : "opacity-100"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border",
                  step.status === 'completed' ? "bg-success border-success text-white" :
                  step.status === 'current' ? "bg-primary border-primary text-primary-foreground" :
                  "border-border text-muted-foreground"
                )}>
                  {step.status === 'completed' ? "✓" : step.id}
                </div>
                <span className={cn(
                  "text-sm font-medium",
                  step.status === 'current' ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </span>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="text-sm font-medium px-4 py-2 rounded-full hover:bg-secondary transition-colors">
              Projets
            </button>
            <div className="w-8 h-8 rounded-full bg-secondary border border-border" />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full glass border-t border-border/40 px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          <div>STATUS: OPERATIONAL</div>
          <div>ENCRYPTED CONNECTION: AES-256</div>
          <div>VERSION: 1.0.0-ALPHA</div>
        </div>
      </footer>
    </div>
  );
}
