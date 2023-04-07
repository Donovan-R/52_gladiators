CREATE DATABASE game52;

CREATE TABLE lanistes(
  laniste_id SERIAL PRIMARY KEY,
  lastname VARCHAR(50) NOT NULL, 
  firstname VARCHAR(50) NOT NULL,
  mail VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  denier INTEGER DEFAULT 10,
  CHECK (char_length(firstname) >= 1 AND char_length(firstname) <= 50),
  CHECK (char_length(lastname) >=1 AND char_length(lastname)<=50),
  CHECK (char_length(password) >= 6),
  UNIQUE (email)
);

CREATE TABLE ludi(
  ludus_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  speciality VARCHAR(50) NOT NULL,
  gladiators_number INTEGER DEFAULT 1 NOT NULL,
  laniste_id INTEGER REFERENCES lanistes(laniste_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE gladiators(
  gladiator_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  avatar TEXT NOT NULL,
  dexterity INTEGER,
  strength INTEGER,
  balance INTEGER,
  speed INTEGER,
  strategy INTEGER,
  ludus_id INTEGER REFERENCES ludi(ludus_id) ON DELETE CASCADE NOT NULL
);
