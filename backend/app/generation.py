from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from app.config import settings
import json

class ArchitectService:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=settings.GOOGLE_API_KEY
        )

    async def generate_architecture(self, idea: str):
        prompt = f"""
        En tant qu'Architecte Full-Stack, génère une architecture technique pour ce projet : {idea}

        Réponds uniquement en format JSON avec cette structure :
        {{
            "stack": {{
                "frontend": "...",
                "backend": "...",
                "database": "...",
                "auth": "...",
                "apis": ["...", "..."]
            }},
            "database_schema": "Schéma SQL ou Mermaid",
            "files": [
                {{"path": "...", "content": "..."}}
            ]
        }}
        """

        response = await self.llm.ainvoke([SystemMessage(content=prompt)])
        content = response.content.replace("```json", "").replace("```", "").strip()
        return json.loads(content)

class PitchService:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=settings.GOOGLE_API_KEY
        )

    async def generate_pitch(self, idea: str):
        prompt = f"""
        En tant que Ghost Pitcher VC-ready, crée un pitch deck pour ce projet : {idea}

        Réponds uniquement en format JSON avec cette structure :
        {{
            "slides": [
                {{"title": "The Problem", "content": "..."}},
                {{"title": "The Solution", "content": "..."}},
                {{"title": "Market Opportunity", "content": "..."}}
            ],
            "landing_page": {{
                "hero_title": "...",
                "hero_subtitle": "...",
                "features": ["...", "..."]
            }}
        }}
        """

        response = await self.llm.ainvoke([SystemMessage(content=prompt)])
        content = response.content.replace("```json", "").replace("```", "").strip()
        return json.loads(content)
