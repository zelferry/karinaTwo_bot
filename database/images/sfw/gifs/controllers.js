let hug = require("./gifs_files/hug.json");
let kiss = require("./gifs_files/kiss.json");
let kill = require("./gifs_files/kill.json");
let dance = require("./gifs_files/dance.json");
let slap = require("./gifs_files/slap.json");


const animeRandom = () => {
	return {
		hug: () => hug[mathRandom(hug.length)],
        dance: () => dance[mathRandom(dance.length)],
		kiss: () => kiss[mathRandom(kiss.length)],
		kill: () => kill[mathRandom(kill.length)],
        slap: () => slap[mathRandom(slap.length)]
	};
};

const mathRandom = number => ~~(Math.random() * number);

module.exports = {
	social: animeRandom()
}