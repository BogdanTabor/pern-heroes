CREATE DATABASE pernsuperheroes;

CREATE TABLE SUPERHEROES (
  hero_id serial PRIMARY KEY,
  nickname VARCHAR(255),
  real_name VARCHAR(255),
  origin_description TEXT,
  superpowers TEXT,
  catch_phrase TEXT
);
