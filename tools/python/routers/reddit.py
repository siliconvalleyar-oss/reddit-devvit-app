from fastapi import APIRouter, Query

from reddit_client import get_hot, get_subreddit_info, get_trending, get_trending_subreddits, search

router = APIRouter(prefix="/api/reddit", tags=["reddit"])


@router.get("/trending")
async def trending(limit: int = Query(10, ge=1, le=50)):
    return {"data": get_trending(limit=limit)}


@router.get("/hot")
async def hot(subreddit: str = Query("all"), limit: int = Query(10, ge=1, le=50)):
    return {"data": get_hot(subreddit, limit=limit)}


@router.get("/search")
async def search_reddit(
    q: str = Query(min_length=1),
    subreddit: str | None = Query(None),
    limit: int = Query(10, ge=1, le=50),
):
    return {"data": search(q, subreddit, limit=limit)}


@router.get("/subreddits/popular")
async def popular_subreddits(limit: int = Query(10, ge=1, le=50)):
    return {"data": get_trending_subreddits(limit=limit)}


@router.get("/subreddit/{name}")
async def subreddit_info(name: str):
    return {"data": get_subreddit_info(name)}
