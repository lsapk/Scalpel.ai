from typing import TypedDict, List, Annotated
import operator
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from app.config import settings

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    idea: str
    target_count: int
    current_count: int

class DebateOrchestrator:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=settings.GOOGLE_API_KEY
        )
        self.graph = self._build_graph()

    def _build_graph(self):
        workflow = StateGraph(AgentState)

        workflow.add_node("marketing_agent", self._marketing_node)
        workflow.add_node("tech_agent", self._tech_node)

        workflow.set_entry_point("marketing_agent")
        workflow.add_edge("marketing_agent", "tech_agent")

        def should_continue(state):
            if state["current_count"] >= state["target_count"]:
                return END
            return "marketing_agent"

        workflow.add_conditional_edges("tech_agent", should_continue)

        return workflow.compile()

    async def _marketing_node(self, state: AgentState):
        prompt = f"""Tu es l'Expert Marketing de la War Room. Analyse cette idée : {state['idea']}.
        Ton but est de trouver les failles de marché, les problèmes d'acquisition client et de concurrence.
        Sois critique mais constructif. Regarde les messages précédents pour répondre aux points de l'expert tech."""

        response = await self.llm.ainvoke([SystemMessage(content=prompt)] + state["messages"])
        return {
            "messages": [HumanMessage(content=response.content, name="marketing")],
            "current_count": state["current_count"] + 1
        }

    async def _tech_node(self, state: AgentState):
        prompt = f"""Tu es l'Expert Technique de la War Room. Analyse cette idée : {state['idea']}.
        Ton but est de trouver les failles de faisabilité, de scalabilité et de complexité technique.
        Sois sceptique sur les promesses technologiques. Réponds aux arguments de l'expert marketing."""

        response = await self.llm.ainvoke([SystemMessage(content=prompt)] + state["messages"])
        return {
            "messages": [HumanMessage(content=response.content, name="tech")],
        }

    async def run_debate(self, idea: str, rounds: int = 3):
        initial_state = {
            "messages": [],
            "idea": idea,
            "target_count": rounds,
            "current_count": 0
        }

        async for output in self.graph.astream(initial_state):
            # Formater pour le frontend (SSE)
            node_name = list(output.keys())[0]
            message = output[node_name]["messages"][-1]
            yield {
                "agent": "marketing" if node_name == "marketing_agent" else "tech",
                "content": message.content
            }
