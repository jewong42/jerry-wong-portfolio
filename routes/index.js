var express = require('express');
var router = express.Router();
var pool = require('./database')

var projects;

router.get('/', async function (req, res, next) {
  try {
    projects = await pool.query('SELECT * FROM projects')
  } catch (err) {
    throw new Error(err)
  }
  console.log(projects);
  res.render('index', { projects: projects });
});

module.exports = router;