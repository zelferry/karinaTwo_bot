module.exports = (client, message) => {
 if (message.author.bot) return;
 if (message.channel.type === "dm") return;
 /*
  if (message.content.includes("/owo") || message.content.includes("/OWO") || message.content.includes("/OwO") || message.content.includes("owo") || message.content.includes("OWO") || message.content.includes("OwO")) {
      message.channel.send(`ÒwÓ`);
  }*/
}