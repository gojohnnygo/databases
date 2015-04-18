DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) DEFAULT 'anonymous',
  UNIQUE (username)
);

-- CREATE TABLE rooms (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(255) DEFAULT 'lobby'
-- );

-- CREATE TABLE messages (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   text VARCHAR(255) DEFAULT 'you forgot a message',
--   user_id INT,
--   room_id INT,
--   FOREIGN KEY (user_id) REFERENCES users(id),
--   FOREIGN KEY (room_id) REFERENCES rooms(id)
-- );

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255) DEFAULT 'you forgot a message',
  user_id INT,
  roomname VARCHAR(255) DEFAULT 'lobby',
  FOREIGN KEY (user_id) REFERENCES users(id)
);
