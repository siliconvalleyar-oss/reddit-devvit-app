from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "reddit_app"),
}

_connection = None
_available = None


def get_connection():
    global _connection, _available
    try:
        if _connection is None or not _connection.is_connected():
            import mysql.connector

            _connection = mysql.connector.connect(**DB_CONFIG)
        _available = True
        return _connection
    except Exception:
        _available = False
        raise


def is_available() -> bool:
    global _available
    if _available is None:
        try:
            get_connection()
        except Exception:
            _available = False
    return _available


def query(sql: str, params: tuple = ()) -> list[dict]:
    if not is_available():
        return []
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(sql, params)
        rows = cursor.fetchall()
        cursor.close()
        return rows
    except Exception:
        return []


def execute(sql: str, params: tuple = ()) -> int:
    if not is_available():
        return 0
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(sql, params)
        conn.commit()
        affected = cursor.rowcount
        cursor.close()
        return affected
    except Exception:
        return 0


def init_schema():
    tables = [
        """
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS page_views (
            id INT AUTO_INCREMENT PRIMARY KEY,
            page VARCHAR(100) NOT NULL,
            viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS trends (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            category VARCHAR(50),
            heat INT DEFAULT 0,
            source_url VARCHAR(500),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
    ]
    conn = get_connection()
    cursor = conn.cursor()
    for t in tables:
        cursor.execute(t)
    conn.commit()
    cursor.close()
