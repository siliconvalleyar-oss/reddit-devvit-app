from fastapi import APIRouter, Query
from pydantic import BaseModel

from ..database import execute, init_schema, query

router = APIRouter(prefix="/api/data", tags=["database"])


class ContactMessage(BaseModel):
    name: str
    email: str
    message: str


@router.get("/trends")
async def get_trends():
    rows = query("SELECT * FROM trends ORDER BY heat DESC LIMIT 20")
    return {"data": rows}


@router.post("/trends")
async def add_trend(title: str = Query(...), description: str = "", category: str = "general"):
    sql = "INSERT INTO trends (title, description, category) VALUES (%s, %s, %s)"
    execute(sql, (title, description, category))
    return {"ok": True}


@router.post("/contact")
async def contact(msg: ContactMessage):
    sql = "INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)"
    execute(sql, (msg.name, msg.email, msg.message))
    return {"ok": True}


@router.get("/messages")
async def get_messages(limit: int = 10):
    rows = query("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT %s", (limit,))
    return {"data": rows}


@router.post("/pageview")
async def pageview(page: str = "/"):
    execute("INSERT INTO page_views (page) VALUES (%s)", (page,))
    return {"ok": True}


@router.get("/stats")
async def stats():
    views = query("SELECT page, COUNT(*) as count FROM page_views GROUP BY page ORDER BY count DESC")
    messages = query("SELECT COUNT(*) as total FROM contact_messages")
    trends = query("SELECT COUNT(*) as total FROM trends")
    return {
        "page_views": views,
        "total_messages": messages[0]["total"] if messages else 0,
        "total_trends": trends[0]["total"] if trends else 0,
    }
