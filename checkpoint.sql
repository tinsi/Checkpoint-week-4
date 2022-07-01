CREATE DATABASE Keittio;

\c keittio;

CREATE TABLE astia (id SERIAL PRIMARY KEY, nimi VARCHAR(30), lkm int);


-- 2 p tehtävän sql

CREATE TABLE toimipaikka (id SERIAL PRIMARY KEY, nimi VARCHAR(30), sijainti VARCHAR(50), aloitusvuosi int);

INSERT INTO toimipaikka (nimi, sijainti, aloitusvuosi) VALUES ('Academy Finland', 'Espoo', 2017), ('Academy Sweden', 'Kista', 2015), ('Academy Germany', 'Munchen', 2018);

ALTER TABLE astia ADD toimipaikka_id int;

ALTER TABLE astia ADD CONSTRAINT fk_astia_toimipaikka FOREIGN KEY (toimipaikka_id) REFERENCES toimipaikka (id);