-- SQLITE3

-- CREATE TABLE users (
--     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
--     username TEXT NOT NULL UNIQUE,
--     password TEXT NOT NULL,
--     cash FLOAT NOT NULL DEFAULT 1000,
--     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     pokemon_caught INTEGER NOT NULL DEFAULT 0
-- );

-- CREATE TABLE pokemon (
--     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
--     user_id INTEGER NOT NULL,
--     name TEXT NOT NULL,
--     is_favorite INTEGER NOT NULL DEFAULT 0,
--     is_shiny INTEGER NOT NULL DEFAULT 0,
--     is_sale INTEGER NOT NULL DEFAULT 0,
--     price FLOAT,
--     caught_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- UPDATE pokemon
-- SET price = 10000, is_sale = 1
-- WHERE user_id = 1;

INSERT INTO pokemon (user_id, name, is_shiny, is_sale, price) VALUES (1, "Dialga", 0, 1, 300);
INSERT INTO pokemon (user_id, name, is_shiny, is_sale, price) VALUES (1, "Palkia", 0, 1, 330);
INSERT INTO pokemon (user_id, name, is_shiny, is_sale, price) VALUES (1, "Kyogre", 1, 1, 500);
INSERT INTO pokemon (user_id, name, is_shiny, is_sale, price) VALUES (1, "Pikachu", 0, 1, 100);
