from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import praw
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")


@dataclass
class RedditConfig:
    client_id: str = field(default_factory=lambda: os.getenv("REDDIT_CLIENT_ID", ""))
    client_secret: str = field(
        default_factory=lambda: os.getenv("REDDIT_CLIENT_SECRET", "")
    )
    username: str = field(default_factory=lambda: os.getenv("REDDIT_USERNAME", ""))
    password: str = field(default_factory=lambda: os.getenv("REDDIT_PASSWORD", ""))
    user_agent: str = field(
        default_factory=lambda: os.getenv(
            "REDDIT_USER_AGENT", "script:my-client:v1.0 (by /u/your-username)"
        )
    )

    @property
    def is_configured(self) -> bool:
        return bool(self.client_id and self.client_secret)


_reddit: praw.Reddit | None = None


def get_reddit() -> praw.Reddit:
    global _reddit
    if _reddit is None:
        cfg = RedditConfig()
        if not cfg.is_configured:
            raise RuntimeError(
                "Reddit API no configurada. "
                "Crea un archivo .env en tools/python/ con:\n"
                "REDDIT_CLIENT_ID=tu_client_id\n"
                "REDDIT_CLIENT_SECRET=tu_client_secret\n"
                "REDDIT_USERNAME=tu_usuario\n"
                "REDDIT_PASSWORD=tu_password"
            )
        _reddit = praw.Reddit(
            client_id=cfg.client_id,
            client_secret=cfg.client_secret,
            username=cfg.username,
            password=cfg.password,
            user_agent=cfg.user_agent,
        )
    return _reddit


def post_to_dict(post: praw.models.Submission) -> dict[str, Any]:
    return {
        "id": post.id,
        "title": post.title,
        "score": post.score,
        "url": post.url,
        "permalink": f"https://reddit.com{post.permalink}",
        "subreddit": post.subreddit.display_name,
        "author": str(post.author),
        "created_utc": post.created_utc,
        "num_comments": post.num_comments,
        "upvote_ratio": post.upvote_ratio,
        "selftext": (post.selftext[:500] + "...") if len(post.selftext) > 500 else post.selftext,
        "domain": post.domain,
        "is_video": post.is_video,
        "thumbnail": post.thumbnail if hasattr(post, "thumbnail") and post.thumbnail and post.thumbnail != "self" else None,
    }


def get_trending(limit: int = 10) -> list[dict[str, Any]]:
    reddit = get_reddit()
    posts = []
    for post in reddit.subreddit("all").hot(limit=limit):
        posts.append(post_to_dict(post))
    return posts


def get_hot(subreddit: str, limit: int = 10) -> list[dict[str, Any]]:
    reddit = get_reddit()
    posts = []
    for post in reddit.subreddit(subreddit).hot(limit=limit):
        posts.append(post_to_dict(post))
    return posts


def search(query: str, subreddit: str | None = None, limit: int = 10) -> list[dict[str, Any]]:
    reddit = get_reddit()
    if subreddit:
        results = reddit.subreddit(subreddit).search(query, limit=limit)
    else:
        results = reddit.subreddit("all").search(query, limit=limit)
    return [post_to_dict(p) for p in results]


def get_trending_subreddits(limit: int = 10) -> list[dict[str, Any]]:
    reddit = get_reddit()
    subs = []
    for sub in reddit.subreddits.popular(limit=limit):
        subs.append({
            "name": sub.display_name,
            "title": sub.title,
            "subscribers": sub.subscribers,
            "description": sub.public_description[:200] if sub.public_description else "",
            "url": f"https://reddit.com/r/{sub.display_name}",
        })
    return subs


def get_subreddit_info(name: str) -> dict[str, Any]:
    reddit = get_reddit()
    sub = reddit.subreddit(name)
    return {
        "name": sub.display_name,
        "title": sub.title,
        "description": sub.public_description,
        "subscribers": sub.subscribers,
        "active_users": sub.active_user_count,
        "created_utc": sub.created_utc,
        "url": f"https://reddit.com/r/{sub.display_name}",
        "over18": sub.over18,
    }
