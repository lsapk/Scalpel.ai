from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="War Room API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.models import UserInput, ValidationResponse
from app.services import ValidationService
from app.debate import DebateOrchestrator
from app.generation import ArchitectService, PitchService
from fastapi.responses import StreamingResponse
import json
import asyncio

validation_service = ValidationService()
debate_orchestrator = DebateOrchestrator()
architect_service = ArchitectService()
pitch_service = PitchService()

@app.get("/")
async def root():
    return {"message": "Welcome to the War Room API"}

@app.post("/api/validate/questions", response_model=ValidationResponse)
async def get_questions(user_input: UserInput):
    return await validation_service.generate_questions(user_input.idea, user_input.previous_answers)

@app.get("/api/architect/generate")
async def generate_architecture(idea: str):
    return await architect_service.generate_architecture(idea)

@app.get("/api/pitch/generate")
async def generate_pitch(idea: str):
    return await pitch_service.generate_pitch(idea)

@app.get("/api/debate/stream")
async def stream_debate(idea: str):
    async def event_generator():
        async for chunk in debate_orchestrator.run_debate(idea):
            yield f"data: {json.dumps(chunk)}\n\n"
            await asyncio.sleep(0.5) # Petit délai pour l'effet fluide

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=8000, reload=True)
