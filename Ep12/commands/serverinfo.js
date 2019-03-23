const { RichEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "serverinfo"
    },
    run: async(bot, message, args) => {
        const embed = new RichEmbed()
            .setDescription("Server information")
            .setColor("#15f153")
            .setThumbnail(message.guild.iconURL)
            .addField("Server name", message.guild.name)
            .addField("Created on", message.guild.createdAt.toLocaleString())
            .addField("You joined", message.member.joinedAt.toLocaleString())
            .addField("Total members", message.guild.memberCount);

        return message.channel.send(embed);
    }
}