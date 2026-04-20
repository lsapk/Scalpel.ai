# Guide de Déploiement sur Vercel - War Room

Ce projet est configuré pour un déploiement facile sur Vercel en tant que Monorepo.

## Étapes de déploiement

1. **Lier le projet** : Importez votre dépôt sur le dashboard Vercel.
2. **Configuration du projet** :
   - **Root Directory** : Laissez vide (racine du projet).
   - **Build Command (Frontend)** : `cd frontend && npm run build`
   - **Output Directory (Frontend)** : `frontend/.next`
   - **Install Command (Frontend)** : `cd frontend && npm install`
3. **Variables d'Environnement** :
   Ajoutez les variables suivantes dans les paramètres de votre projet Vercel :
   - `GOOGLE_API_KEY` : Votre clé API Gemini.
   - `NEXT_PUBLIC_API_URL` : L'URL de votre déploiement Vercel (ex: `https://votre-projet.vercel.app`).
   - `SUPABASE_URL` : Votre URL Supabase.
   - `SUPABASE_KEY` : Votre clé API Supabase.
   - `GITHUB_CLIENT_ID` : (Optionnel) Pour l'export GitHub.
   - `GITHUB_CLIENT_SECRET` : (Optionnel) Pour l'export GitHub.
   - `FIRECRAWL_API_KEY` : (Optionnel) Pour le scraping web.

## Structure Vercel
- Le dossier `api/` contient le backend Python (FastAPI) déployé comme Serverless Functions.
- Le dossier `frontend/` contient l'application Next.js.
- `vercel.json` gère le routage entre les deux.
