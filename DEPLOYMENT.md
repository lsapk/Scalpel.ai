# Guide de Déploiement Simplifié sur Vercel - War Room

L'architecture a été simplifiée pour que Vercel puisse tout gérer automatiquement.

## Étapes de déploiement

1. **Lier le projet** : Importez votre dépôt sur le dashboard Vercel.
2. **Configuration** : Vercel détecte automatiquement **Next.js**. Rien à changer.
3. **Variables d'Environnement** : Dans les paramètres Vercel, ajoutez ces 3 clés obligatoires :
   - `GOOGLE_API_KEY` : À obtenir sur [Google AI Studio](https://aistudio.google.com/). Permet à l'IA de réfléchir.
   - `SUPABASE_URL` : L'URL de votre projet [Supabase](https://supabase.com/).
   - `SUPABASE_KEY` : La clé "anon" ou "service_role" de Supabase pour sauvegarder les données.

### Liste des APIs nécessaires (Où les trouver) :
1. **Google Gemini (Obligatoire)** :
   - Allez sur [Google AI Studio](https://aistudio.google.com/).
   - Cliquez sur "Get API Key".
   - Copiez-la dans `GOOGLE_API_KEY`.
2. **Supabase (Obligatoire)** :
   - Créez un projet sur [Supabase.com](https://supabase.com/).
   - Allez dans "Project Settings" > "API".
   - Copiez "Project URL" dans `SUPABASE_URL` et "API Key" dans `SUPABASE_KEY`.
3. **Firecrawl (Optionnel pour le Web Scraping)** :
   - Allez sur [Firecrawl.dev](https://firecrawl.dev/).
   - Prenez une clé API et ajoutez-la en tant que `FIRECRAWL_API_KEY` pour que l'IA puisse scanner le web.

C'est tout ! Vercel déploiera le site et le backend Python simultanément.
