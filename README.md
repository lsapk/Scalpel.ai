# WAR ROOM - Startup Accelerator IA

Plateforme interactive organisée comme une "War Room" pour valider, architecturer et pitcher des idées de startup.

## Structure
- `/frontend`: Next.js 14+ (App Router), Tailwind CSS, Framer Motion.
- `/backend`: FastAPI, LangGraph, Gemini 2.0.

## Installation

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. Créer un fichier `.env` avec vos clés (voir `app/config.py`)
4. `python main.py`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Fonctionnalités
1. **L'Avocat du Diable** : Tunnel de questions dynamiques et débat entre agents IA.
2. **L'Architecte** : Génération de stack technique et schéma de base de données.
3. **Ghost Pitcher** : Création de pitch deck et landing page.
