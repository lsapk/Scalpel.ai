import httpx
from app.config import settings

class GitHubService:
    async def get_access_token(self, code: str):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://github.com/login/oauth/access_token",
                data={
                    "client_id": settings.GITHUB_CLIENT_ID,
                    "client_secret": settings.GITHUB_CLIENT_SECRET,
                    "code": code
                },
                headers={"Accept": "application/json"}
            )
            return response.json()

    async def create_repo(self, token: str, name: str, description: str):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.github.com/user/repos",
                json={
                    "name": name,
                    "description": description,
                    "private": True
                },
                headers={
                    "Authorization": f"token {token}",
                    "Accept": "application/vnd.github.v3+json"
                }
            )
            return response.json()
