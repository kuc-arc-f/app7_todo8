
--
CREATE TABLE todos(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  complete INTEGER,
  uid INTEGER,
  up_date TIMESTAMP
);

