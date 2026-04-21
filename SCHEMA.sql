-- SQL pour initialiser la base de données Supabase de la War Room

-- Table des projets
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  idea TEXT NOT NULL,
  status TEXT DEFAULT 'validation',
  analysis TEXT,
  architecture JSONB,
  pitch JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table des messages de débat (optionnel pour persistance)
CREATE TABLE debate_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  agent TEXT NOT NULL, -- 'marketing' ou 'tech'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Activer Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE debate_messages ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité (Seul l'utilisateur peut voir ses propres projets)
CREATE POLICY "Users can view their own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);
