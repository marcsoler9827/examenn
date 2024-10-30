const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulari.html'));
});

app.post('/createChampion', (req, res) => {
  const { name, role, skill, attack, region, image } = req.body;

  try {
    const champions = JSON.parse(fs.readFileSync('champions.json', 'utf-8'));

    champions.push({
      name,
      role,
      skill,
      attack: parseInt(attack),
      region,
      image
    });

    fs.writeFileSync('champions.json', JSON.stringify(champions, null, 2));

    res.redirect('/champions');
  } catch (error) {
    console.error('Error creating champion:', error);
    res.status(500).send('There was an error creating the champion.');
  }
});

app.get('/champions', (req, res) => {
  const champions = JSON.parse(fs.readFileSync('champions.json', 'utf-8'));

  const championsListHTML = champions.map(champion =>
    `<li><a href="/champions/${champion.name}">${champion.name}</a></li>`
  ).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>League of Legends Champions</title>
    </head>
    <body>
      <h1>Champion List</h1>
      <ul>
        ${championsListHTML}
      </ul>
      <a href="/formulari">Create New Champion</a>
    </body>
    </html>
  `);
});

app.get('/champions/:name', (req, res) => {
  const championName = req.params.name;

  const champions = JSON.parse(fs.readFileSync('champions.json', 'utf-8'));

  const champion = champions.find(c => c.name.toLowerCase() === championName.toLowerCase());

  if (!champion) {
    return res.status(404).send('Champion not found');
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Champion Details</title>
    </head>
    <body>
      <h1>Champion: ${champion.name}</h1>
      <ul>
        <li>Role: ${champion.role}</li>
        <li>Special Skill: ${champion.skill}</li>
        <li>Attack Power: ${champion.attack}</li>
        <li>Region: ${champion.region}</li>
        <li><img src="${champion.image}" alt="${champion.name}" style="max-width:300px;"></li>
      </ul>
      <a href="/champions">Back to List</a>
    </body>
    </html>
  `);
});

app.get('/formulari', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulari.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
