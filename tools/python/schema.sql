-- Crear base de datos (ejecutar en phpMyAdmin o MySQL CLI)
-- CREATE DATABASE reddit_app;
-- USE reddit_app;

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page VARCHAR(100) NOT NULL,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    heat INT DEFAULT 0,
    source_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO trends (title, description, category, heat) VALUES
('OpenAI GPT-5 Omni', 'Modelo multimodal con agentic API', 'IA', 95),
('Apple Vision Pro 2', 'Lanzamiento a $1,999', 'Tech', 88),
('SpaceX Starship 50ª recarga', 'Hito para Artemis 4', 'Espacio', 82);
