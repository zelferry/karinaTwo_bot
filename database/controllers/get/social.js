let hug = require("../../../database/imagens/gifs/hug.json");
let kiss = require("../../../database/imagens/gifs/kiss.json");
let kill = require("../../../database/imagens/gifs/kill.json");

const animeRandom = () => {
	return {
		hug: () => hug[mathRandom(hug.length)],
		kiss: () => kiss[mathRandom(kiss.length)],
		kill: () => kill[mathRandom(kill.length)],
	};
};

const mathRandom = number => ~~(Math.random() * number);

module.exports = {
	social:{
		gifs: animeRandom()
	}
}

//animeRandom();