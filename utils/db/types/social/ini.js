let { rootRequire } = global

let hug = rootRequire("database/imagens/gifs/hug.json");
let kiss = rootRequire("database/imagens/gifs/kiss.json");
let kill = rootRequire("database/imagens/gifs/kill.json");

const gifsRandom = () => {
	return {
		hug: () => hug[mathRandom(hug.length)],
		kiss: () => kiss[mathRandom(kiss.length)],
		kill: () => kill[mathRandom(kill.length)],
	};
};

const mathRandom = number => ~~(Math.random() * number);

module.exports = gifsRandom()