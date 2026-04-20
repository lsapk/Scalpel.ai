'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentAvatar } from './AgentAvatar';
import API_BASE_URL from '@/lib/api-config';

interface Question {
  id: string;
  text: string;
  type: string;
}

interface QuestionTunnelProps {
  idea: string;
  onComplete: (data: any) => void;
}

export const QuestionTunnel: React.FC<QuestionTunnelProps> = ({ idea, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState("");

  const fetchQuestions = async (prevAnswers: any[] = []) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/validate/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, previous_answers: prevAnswers }),
      });
      const data = await response.json();

      if (data.is_complete) {
        onComplete(data);
      } else {
        setQuestions(data.questions);
        setAnalysis(data.analysis);
        setCurrentQuestionIndex(0);
      }
    } catch (error) {
      console.error("Failed to fetch questions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All current questions answered, get more or finish
      const newAnswers = questions.map(q => ({
        question: q.text,
        answer: answers[q.id]
      }));
      fetchQuestions(newAnswers);
    }
  };

  if (loading && questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 h-64">
        <AgentAvatar type="devil" isSpeaking={true} />
        <p className="text-muted-foreground animate-pulse">L'Avocat du Diable analyse votre idée...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="space-y-8">
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-primary/5 border border-primary/10 rounded-2xl text-sm"
        >
          <span className="font-bold text-primary">Analyse:</span> {analysis}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <AgentAvatar type="devil" isSpeaking={false} />
              <div className="space-y-2">
                <h3 className="text-2xl font-medium leading-tight">{currentQuestion.text}</h3>
              </div>
            </div>

            <textarea
              autoFocus
              className="w-full h-32 bg-secondary/50 border border-border rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-lg"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
              placeholder="Votre réponse..."
            />

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground font-medium">
                Question {currentQuestionIndex + 1} sur {questions.length}
              </div>
              <button
                disabled={!answers[currentQuestion.id]}
                className="apple-button bg-primary text-primary-foreground shadow-lg shadow-primary/20 disabled:opacity-30"
                onClick={handleNext}
              >
                {currentQuestionIndex === questions.length - 1 ? "Suivant" : "Question suivante"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
