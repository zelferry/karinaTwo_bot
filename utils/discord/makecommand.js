let discord = require('discord.js');

class commandMaker {
  #client
  constructor(client){
    this.#client = client
    this.cache = new discord.Collection()
  }
  makeOwnerComandCategoy(){
    let client = this.#client
    let commands = client.commands.filter((cmd) => cmd.help.category);
    return {
      label: `🛠 owner(${commands.filter((cmd) => cmd.help.category == "owner").size})`,
      commands: commands.filter((cmd) => cmd.help.category == "owner").map((x) => "`"+x.help.name+"`").join(", ")
    }
  }
  makeNsfwComandCategoy(message){
    let client = this.#client
    let commands = client.commands.filter((cmd) => cmd.help.category);

    let labellCommands 
    
    let channels_ = message.guild.channels.cache.filter((channel) => channel.nsfw).map(x => "<#"+x.id+">");
    
    if(channels_.length > 0){
      labellCommands = commands.filter((cmd) => cmd.help.category == "nsfw").map((x) => "`"+x.help.name+"`").join(", ")
    } else {
      labellCommands = "*`o servidor precisa ter pelo menos 1 CANAL DE TEXTO com a função NSFW ativada para você pode ver essa categoria`*"
    }
      
    return {
      label: `😈 nsfw(${commands.filter((cmd) => cmd.help.category == "nsfw").size})`,
      commands: labellCommands
    }
  }
  //-------
  makeComandCategoy(){
    let client = this.#client
    let commands = client.commands.filter((cmd) => cmd.help.category);
    return [
      {
        label: `📟 discord games (${commands.filter((cmd) => cmd.help.category == "activity").size})`,
        commands: commands.filter((cmd) => cmd.help.category == "activity").map((x) => "`"+x.help.name+"`").join(", ")
      },
      {
        label: `📱 discord(${commands.filter((cmd) => cmd.help.category == "discord").size})`,
        commands: commands.filter((cmd) => cmd.help.category == "discord").map((x) => "`"+x.help.name+"`").join(", ")
      },
      {
        label: `💸 economia(${commands.filter((cmd) => cmd.help.category == "economy").size})`,
        commands: commands.filter((cmd) => cmd.help.category == "economy").map((x) => "`"+x.help.name+"`").join(", ")
      },
      {
        label: `🤣 diversão(${commands.filter((cmd) => cmd.help.category == "fun").size})`,
        commands: commands.filter((cmd) => cmd.help.category == "fun").map((x) => "`"+x.help.name+"`").join(", ")
      },
      {
        label:`📷 imagens(${commands.filter((cmd) => cmd.help.category == "images").size})`,
        commands: commands.filter((cmd) => cmd.help.category == "images").map((x) => "`"+x.help.name+"`").join(", ")
      },
      {
        label: `👩‍⚖️ administração(${commands.filter((cmd) => cmd.help.category == "management").size})`,
        commands: commands.filter((cmd) => cmd.help.category == "management").map((x) => "`"+x.help.name+"`").join(", ")
      },
      {
        label: `🤡 memes(${commands.filter((cmd) => cmd.help.category == "meme").size})`,
        commands: commands.filter((cmd) => cmd.help.category == "meme").map((x) => "`"+x.help.name+"`").join(", ")
      },
      {
        label: `🔄 miscelânea(${commands.filter((cmd) => cmd.help.category == "miscellany").size})`,
        commands: commands.filter((cmd) => cmd.help.category == "miscellany").map((x) => "`"+x.help.name+"`").join(", ")
      },
      {
        label: `📸 photoshop(${commands.filter((cmd) => cmd.help.category == "photoshop").size})`,
        commands: commands.filter((cmd) => cmd.help.category == "photoshop").map((x) => "`"+x.help.name+"`").join(", ")
      },
      {
        label: `🙋‍♂️ social(${commands.filter((cmd) => cmd.help.category == "social").size})`,
        commands: commands.filter((cmd) => cmd.help.category == "social").map((x) => "`"+x.help.name+"`").join(", ")
      }
    ]
  }
};
//management
//photoshop
//miscellany
module.exports = commandMaker