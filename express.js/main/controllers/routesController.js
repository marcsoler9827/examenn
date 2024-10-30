import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const home = (req, res) => {
  res.send('<h1>Welcome to the League of Legends Champion Creation App!</h1>');
};

export const about = (req, res) => {
  res.send('<h2>This page contains information about the application!</h2>');
};

export const createChampion = (req, res) => {
  const { name, role, skill, attack, region, image } = req.body;

  try {

    const championsFilePath = path.join('C:', 'Users', 'Marc Soler', 'Documents', 'Tasques', 'express.js', 'formulari', 'champions.json');
    

    const champions = JSON.parse(fs.readFileSync(championsFilePath, 'utf-8'));


    champions.push({
      name,
      role,
      skill,
      attack: parseInt(attack),
      region,
      image
    });


    fs.writeFileSync(championsFilePath, JSON.stringify(champions, null, 2));
    

    res.redirect('/rt/champions');
  } catch (error) {
    console.error('Error creating champion:', error.message);
    res.status(500).send('There was an error creating the champion.');
  }
};

export const listChampions = (req, res) => {
  try {
    const championsFilePath = path.join('C:', 'Users', 'Marc Soler', 'Documents', 'Tasques', 'express.js', 'formulari', 'champions.json');
    const champions = JSON.parse(fs.readFileSync(championsFilePath, 'utf-8'));

    let listHTML = champions.map(champion => 
      `<li><a href="/rt/champions/${champion.name}">${champion.name}</a></li>`
    ).join('');

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>List of Champions</title>
        <link rel="stylesheet" href="/stylesList.css">
      </head>
      <body>
        <h1>List of Champions</h1>
        <ul>${listHTML}</ul>
        <a href="/rt/formulari">Create New Champion</a>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error reading champions list:', error.message);
    res.status(500).send('There was an error listing the champions.');
  }
};

export const championDetails = (req, res) => {
  try {
    const championName = req.params.name;
    const championsFilePath = path.join('C:', 'Users', 'Marc Soler', 'Documents', 'Tasques', 'express.js', 'formulari', 'champions.json');
    const champions = JSON.parse(fs.readFileSync(championsFilePath, 'utf-8'));
    const champion = champions.find(champ => champ.name.toLowerCase() === championName.toLowerCase());

    if (!champion) {
      return res.status(404).send('Champion not found');
    }

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Champion Details</title>
        <link rel="stylesheet" href="/stylesDetail.css">
      </head>
      <body>
        <h1>Champion: ${champion.name}</h1>
        <ul>
          <li>Name: ${champion.name}</li>
          <li>Role: ${champion.role}</li>
          <li>Special Skill: ${champion.skill}</li>
          <li>Attack Power: ${champion.attack}</li>
          <li>Region: ${champion.region}</li>
          <li><img src="${champion.image}" alt="${champion.name}" style="max-width:300px"></li>
        </ul>
        <a href="/rt/champions">Back to List</a>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error reading champion details:', error.message);
    res.status(500).send('There was an error fetching the champion details.');
  }
};

export const championForm = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
};
