const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let teams = [
    "Arsenal", "Aston Villa", "Brighton and Hove Albion", "Chelsea", "Brentford",
    "Everton", "Liverpool", "Manchester City", "Manchester United", "Newcastle United",
    "Tottenham Hotspur", "West Ham United"
];

let pickedTeams = {};

app.post('/pick-team', (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    if (pickedTeams[userId]) {
        return res.json({ message: `You have already picked: ${pickedTeams[userId]}` });
    }

    const availableTeams = teams.filter(team => !Object.values(pickedTeams).includes(team));

    if (availableTeams.length === 0) {
        return res.json({ message: "All teams have been picked!" });
    }

    const team = availableTeams[Math.floor(Math.random() * availableTeams.length)];
    pickedTeams[userId] = team;

    res.json({ team });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
