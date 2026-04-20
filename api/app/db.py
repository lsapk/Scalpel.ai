from supabase import create_client, Client
from app.config import settings

def get_supabase() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

class ProjectStore:
    def __init__(self):
        self.supabase = get_supabase()

    async def save_project(self, user_id: str, idea: str, status: str):
        data = {
            "user_id": user_id,
            "idea": idea,
            "status": status
        }
        return self.supabase.table("projects").insert(data).execute()

    async def get_user_projects(self, user_id: str):
        return self.supabase.table("projects").select("*").eq("user_id", user_id).execute()
