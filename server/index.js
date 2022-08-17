const express = require("express");
const app = express();
const cors = require("cors");
// const multer = require("multer");
const pool = require("./db");
const uuid = require('uuid');
const fileUpload = require('express-fileupload')
const path = require('path');
// const upload = multer({ dest: './public/data/uploads/' });

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));

//ROUTES//

//add a hero

app.post("/heroes", async (req, res) => {
  try {
    const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, 'static', fileName));
     
    const newHero = await pool.query(
      "INSERT INTO superheroes ( nickname, real_name, origin_description, superpowers, catch_phrase, img ) VALUES( $1, $2, $3, $4, $5, $6 ) RETURNING *",
      [ nickname, real_name, origin_description, superpowers, catch_phrase, [`${fileName}`] ]
    );

    res.json(newHero.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all heroes

app.get("/heroes", async (req, res) => {
  let {limit, page} = req.query;
  page = page || 1;
  limit = limit || 5;
  let offset = page * limit - limit;
  let heroes;
  //finddAndCountAll({limit}) //pagination
  try {
    const allHeroes = await pool.query("SELECT * FROM superheroes");
    res.json(allHeroes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a hero

app.get("/heroes/:hero_id", async (req, res) => {
  try {
    const { hero_id } = req.params;
    const hero = await pool.query("SELECT * FROM superheroes WHERE hero_id = $1", [
      hero_id
    ]);

    res.json(hero.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get a hero image

app.get("heroes/:hero_id/img", async (req, res) => { //url ?
  try {
    const { hero_id } = req.params;
    const hero = await pool.query("SELECT img [1] FROM superheroes WHERE hero_id = $1", [
      hero_id
    ]);

    res.json(hero. rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a hero

app.put("/heroes/:hero_id", async (req, res) => {
  try {
    const { hero_id } = req.params;
    const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;

    const updateHero = await pool.query(
      "UPDATE superheroes SET nickname = $2, real_name = $3, origin_description = $4, superpowers = $5, catch_phrase = $6 WHERE hero_id = $1",
      [ hero_id, nickname, real_name, origin_description, superpowers, catch_phrase ]
    );
    //UPDATE table SET array_field = array_field || '{"new item"}' WHERE ...

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a hero

app.delete("/heroes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteHero = await pool.query("DELETE FROM superheroes WHERE hero_id = $1", [
      id
    ]);
    res.json("Hero was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5050, () => {
  console.log("server has started on port 5050");
});