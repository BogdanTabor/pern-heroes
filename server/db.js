const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "pernsuperheroes"
});

module.exports = pool;

// {
//   "hero_id":"1",
//   "nickname":"superman",
//   "real_name":"clark kent",
//   "origin_description":"he was born Kal-El on the planet Krypton",
//   "superpowers":"solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...",
//   "catch_phrase":"“Look, up in the sky, it's a bird, it's a plane, it's Superman!”"
// }