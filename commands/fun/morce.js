const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
				morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
				text = args.join(" ").toUpperCase();
			while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
				text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
			}
			if (text.startsWith(".") || text.startsWith("-")) {
				text = text.split(" ");
				let length = text.length;
				for (i = 0; i < length; i++) {
					text[i] = alpha[morse.indexOf(text[i])];
				}
				text = text.join("");
			} else {
				text = text.split("");
				let length = text.length;
				for (i = 0; i < length; i++) {
					text [i] = morse[alpha.indexOf(text[i])];
				}
				text = text.join(" ");
			}
			return message.reply({embeds: [{
    title: "morse! bip bup",
    description: "```"+text+"```",
    color: 8384739
  }]
})

}
exports.config = {
    test: false
}
exports.help = {
  name:"morse",
  permisoes: "nenhuma",
  aliases: ["traduzir-morse"],
  description: "\"morsa não, e morse\" tradusa um texto em morse ---..--",
  usage: "morse <texto>"
}