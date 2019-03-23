const {
  RichEmbed
} = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
  help: {
    name: "doggo"
  },
  run: async (bot, message, args) => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(json => {
        return json
      });

    console.log(res);

    const embed = new RichEmbed()
      .setColor("RANDOM")
      .setImage(res.status == "success" ? res.message : "https://i.gyazo.com/4e7a4b6834400626ecf0a45d370e1f20.png");

    message.channel.send(embed);
  }
}