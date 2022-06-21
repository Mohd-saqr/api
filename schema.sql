DROP TABLE IF EXISTS APItable;
CREATE TABLE IF NOT EXISTS APItable(
    id SERIAL PRIMARY KEY,
    disease_name text,
    description_t text,
    drugs_names text[](512)
   
);
-- DROP TABLE IF EXISTS trending;
-- CREATE TABLE IF NOT EXISTS trending(
--     id SERIAL PRIMARY KEY,
--     title text,
--     overview text,
--     imgurl varchar(512),
--     release_date varchar(256),
--     rate float , 
--     lang varchar(256),
--     vot_count float
-- );