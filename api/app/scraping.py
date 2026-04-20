import httpx
from app.config import settings

class FirecrawlService:
    async def search(self, query: str):
        if not settings.FIRECRAWL_API_KEY:
            return {"error": "API Key not configured", "results": []}

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.firecrawl.dev/v0/search",
                json={"query": query},
                headers={"Authorization": f"Bearer {settings.FIRECRAWL_API_KEY}"}
            )
            return response.json()
