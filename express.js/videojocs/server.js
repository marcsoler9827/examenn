const express = require('express');
const app = express();
const port = 3000;

const videogames = require('./videogames.json').videogames;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/videogames.html');
});

app.get('/search', (req, res) => {
    let { platform, multiplayer, decade } = req.query;

    if (!decade) {
        return res.status(400).json({ error: "La dècada és obligatòria" });
    }

    const startYear = parseInt(decade);
    const endYear = startYear + 9;

    const filteredGames = videogames.filter(game => {
        const gameReleaseYear = game.releaseYear;
        const matchesPlatform = platform ? game.platform.toLowerCase().replace(/\s+/g, '').includes(platform.toLowerCase().replace(/\s+/g, '')) : true;
        const matchesMultiplayer = multiplayer ? game.multiplayer === (multiplayer === 'true') : true;
        const matchesDecade = gameReleaseYear >= startYear && gameReleaseYear <= endYear;

        return matchesPlatform && matchesMultiplayer && matchesDecade;
    });

    res.json(filteredGames);
});

app.listen(port, () => {
    console.log(`Servidor escoltant a http://localhost:${port}`);
});