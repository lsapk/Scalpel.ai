# Guide de Déploiement Simplifié sur Vercel - War Room

L'architecture a été simplifiée pour que Vercel puisse tout gérer automatiquement.

## Étapes de déploiement

1. **Lier le projet** : Importez votre dépôt sur le dashboard Vercel.
2. **Configuration** :
   - Vercel devrait détecter automatiquement **Next.js**.
   - Vous n'avez **rien à changer** dans les commandes de build.
3. **Variables d'Environnement** :
   Ajoutez simplement ces variables dans Vercel :
   - `GOOGLE_API_KEY` : Votre clé API Gemini.
   - `SUPABASE_URL` : Votre URL Supabase.
   - `SUPABASE_KEY` : Votre clé API Supabase.

C'est tout ! Vercel déploiera le site et le backend Python simultanément.
