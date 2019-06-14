var express = require('express');
var router = express.Router();
var pool = require('./database');

var projects, education;
var skills_pw, skills_ew, skills_ww;

router.get('/', async function (req, res, next) {
  try {
    projects = await pool.query('SELECT * FROM projects')
    education = await pool.query('SELECT * FROM education')
    skills_pw = await pool.query('SELECT * FROM skills WHERE level = "proficient with"')
    skills_ew = await pool.query('SELECT * FROM skills WHERE level = "experienced with"')
    skills_ww = await pool.query('SELECT * FROM skills WHERE level = "worked with"')
  } catch (err) {
    throw new Error(err)
  }
  console.log(projects);
  console.log(skills_pw);
  res.render('index', { projects: projects, education: education, skills_pw: skills_pw, skills_ew: skills_ew, skills_ww: skills_ww });
});

module.exports = router;