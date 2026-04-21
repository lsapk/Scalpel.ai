from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from app.config import settings
from app.models import Question, ValidationResponse
from app.utils import extract_json
import json

class ValidationService:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=settings.GOOGLE_API_KEY
        )

    async def generate_questions(self, idea: str, previous_answers: list) -> ValidationResponse:
        system_prompt = """
        Tu es l'Avocat du Diable de la 'War Room'. Ton rôle est de décortiquer une idée de startup.

        Si c'est le début (pas de réponses précédentes), pose 3 questions fondamentales sur :
        1. La cible précise.
        2. Le problème exact résolu.
        3. Le modèle de revenu envisagé.

        Si l'utilisateur a déjà répondu, analyse ses réponses et pose des questions de plus en plus pointues pour trouver des failles ou des opportunités négligées.

        Réponds uniquement en format JSON avec cette structure :
        {
            "questions": [
                {"id": "q1", "text": "...", "type": "text"},
                ...
            ],
            "analysis": "Breve analyse du projet à ce stade",
            "is_complete": false
        }

        Si tu as assez d'informations pour passer au débat, mets is_complete à true.
        """

        user_msg = f"Idée : {idea}\n\nRéponses précédentes : {json.dumps(previous_answers)}"

        response = self.llm.invoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_msg)
        ])

        data = extract_json(response.content)
        if data:
            try:
                return ValidationResponse(**data)
            except:
                pass

        # Fallback
            # Fallback simple en cas d'erreur de parsing
            return ValidationResponse(
                questions=[Question(id="q_error", text="Pouvez-vous préciser davantage votre projet ?", type="text")],
                analysis="Désolé, j'ai eu une petite erreur d'analyse. Reprenons.",
                is_complete=False
            )
