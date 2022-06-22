DROP TABLE IF EXISTS APIcon;
CREATE TABLE IF NOT EXISTS APIcon(
    id SERIAL PRIMARY KEY,
    drug text,
    conflicts_drugs text[]


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