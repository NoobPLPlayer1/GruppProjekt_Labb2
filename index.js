require('dotenv').config();
const express = require('express');
const { getSuggestions } = require('./notion')
const PORT = process.env.PORT || 5000;

const app = express(); 
app.set("views", "./");
app.set("view engine", "ejs");

app.get('/', async (req, res) => {
  const suggestions = await getSuggestions();
  res.render("index", { suggestions })
})

app.listen(PORT, console.log(`Server started on port ${PORT}`));
