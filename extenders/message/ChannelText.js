var version = require("discord.js").version.split("");
if (version.includes("(")) {
  version = version.join("").split("(").pop().split("");
}
version = parseInt(version[0] + version[1]);
const { Client, Structures } = require("discord.js");

const { MessageMenu, MessageMenuOption, MessageActionRow } = require("discord-buttons");

module.exports = (client) => {
	
  if (version != 12) throw new Error("'discord-menu-embed' => The discord.js version must be v12");
  if (!client || !client instanceof Client) throw new Error("'discord-menu-embed' => The discord.js client is not provided or is invalid.");

  class ExtendTextChannel extends Structures.get("TextChannel") {
     menu(author, options = {}) {
      var { embeds, menu, timeout = 1000*60 } = options;
      var Menu = {};
      Menu.option = [];
      Menu.check = {};
			Menu.check.selects = [];

      if (!(embeds.length > 0 || menu === undefined)) throw new Error("'discord-menu-embed' => Please provide embeds and menu/selects.");
			if (!menu.id) throw new Error("'discord-menu-embed' => Please provide ID for your menu.");
      if (!(Array.isArray(embeds) || Array.isArray(menu.selects))) throw new SyntaxError("'discord-menu-embed' => Embeds and Menu Select must be an Array typeof");
			Menu.check.id = menu.id;

			for (var i = 0; i < menu.selects.length; i++) {
			if (!menu.selects[i]) throw new Error(`'discord-menu-embed' => Please provide Menu Select for your embed, (Menu Select Index: ${i + 1}).`);
			if (!(menu.selects[i].label || menu.selects[i].emoji)) throw new Error(`'discord-menu-embed' => Please provide Emoji/Label for your Menu Select, (${menu[i] ? `Menu Select ID: ${menu[i].id || menu[i].value}` : `Menu Select Index: ${i + 1}`}).`);
			if (!(menu.selects[i].id || menu.selects[i].value)) throw new Error("'discord-menu-embed' => Please provide ID/VALUE for your Menu Select.");
			if (!embeds[i]) throw new Error(`'discord-menu-embed' => Please provide Embed for your button, (${menu[i] ? `Menu Select ID: ${menu[i].id || menu[i].value}` : `Menu Select Index: ${i + 1}`}).`);

				const id = menu.selects[i].id || menu.selects[i].value;
				const option = new MessageMenuOption();
				if (menu.selects[i].label) option.setLabel(menu.selects[i].label);
				if (menu.selects[i].emoji) option.setEmoji(menu.selects[i].emoji);
				if (menu.selects[i].description) option.setDescription(menu.selects[i].description);
				option.setValue(id);
				option.setDefault();
				Menu.option.push(option);
				
				//check
				var check = {};
				check.index = i;
				check.id = id;
				if (menu.selects[i].label) check.label = menu.selects[i].label;
				if (menu.selects[i].description) check.description = menu.selects[i].description;
				Menu.check.selects.push(check);
			}

			const component = new MessageMenu();
			component.setID(menu.id ? String(menu.id) : "nekoyasui");
			component.setPlaceholder(menu.placeholder ? String(menu.placeholder) : "Select any option.");
			component.addOptions(Menu.option);
			component.setMaxValues(1);
			component.setMinValues(1);

      const Row = [new MessageActionRow().addComponents(component)];
			
      this.send({
        embed: embeds[0],
        components: Row
      }).then((message) => {
        const filter = (menu) => menu.clicker.user.id === author;
        const collector = message.createMenuCollector(filter, {
          idle: timeout
        });

        collector.on("collect", button => {
					button.reply.defer();
					if (Menu.check.id == button.id) {
						const result = Menu.check.selects.find((x) => x.id == button.values[0]);
						if (result && !(result.index === null)) {
            client.emit("debug", `'discord-menu-embed' => ID: ${result.id} | Menu Select Index: ${result.index}`);
            message.edit("", { embed: embeds[result.index], components: Row });
						} else {
							client.emit("debug", `'discord-menu-embed' => No Menu Select ID: ${button.values[0]}\n${Buttons.check.selects.map((x) => {
								return `ID: ${x.id} | embed: ${x.index}`
							}).join("\n")}`);
						}
					} else {
						client.emit("debug", `'discord-menu-embed' => No ID: ${button.id}\n${Buttons.check.selects.map((x) => {
							return `ID: ${x.id} | embed: ${x.index}`
						}).join("\n")}`);
					}
        });
        collector.on("end", () => {
          message.edit({
            embed: embeds[0],
            components: null
          })
        });
        collector.on("error", (e) => {
          console.log(e);
        });
      })
    }
  };

  Structures.extend("TextChannel", () => ExtendTextChannel);
}