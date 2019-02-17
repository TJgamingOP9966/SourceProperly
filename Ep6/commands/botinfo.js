const { RichEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "botinfo"
    },
    run: async(bot, message, args) => {
        let embed = new RichEmbed()
            .setDescription("Bot information")
            .setColor("#15f153")
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Bot name", bot.user.username)
            .addField("Created on", bot.user.createdAt.toLocaleString());

        return message.channel.send(embed);
    }
}