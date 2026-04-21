import re
import json

def extract_json(text: str):
    """Extrait un objet JSON d'une chaîne de caractères, même si elle contient du texte autour ou des balises markdown."""
    try:
        # Chercher le premier '{' et le dernier '}'
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return json.loads(match.group())
        return json.loads(text)
    except:
        return None
