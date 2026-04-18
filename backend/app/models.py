from typing import List, Optional
from pydantic import BaseModel

class UserInput(BaseModel):
    idea: str
    previous_answers: List[dict] = []

class Question(BaseModel):
    id: str
    text: str
    type: str  # 'text' | 'choice'
    options: Optional[List[str]] = None

class ValidationResponse(BaseModel):
    questions: List[Question]
    analysis: Optional[str] = None
    is_complete: bool = False
