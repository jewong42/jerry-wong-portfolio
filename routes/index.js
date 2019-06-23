var express = require('express');
var router = express.Router();
var pool = require('./database');
var fs = require('fs');

router.get('/', async function (req, res, next) {
  try {
    var projects = await pool.query('SELECT * FROM projects')
    getProjectImages(projects);
    var education = await pool.query('SELECT * FROM education')
    var skills_pw = await pool.query('SELECT * FROM skills WHERE level = "proficient with"')
    var skills_ew = await pool.query('SELECT * FROM skills WHERE level = "experienced with"')
    var skills_ww = await pool.query('SELECT * FROM skills WHERE level = "worked with"')
  } catch (err) {
    throw new Error(err)
  }
  res.render('index', { projects: projects, education: education, skills_pw: skills_pw, skills_ew: skills_ew, skills_ww: skills_ww, images: ["test1"] });
});

function getProjectImages(projects) {
  var files;
  for (index in projects) {
    try {
      files = fs.readdirSync("./public/" + projects[index].image_source + "/");
      projects[index].images = files;
    } catch(err) {
    }
  }
}

module.exports = router;