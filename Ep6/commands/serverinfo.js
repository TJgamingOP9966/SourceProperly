const { RichEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "serverinfo"
    },
    run: async(bot, message, args) => {
        let embed = new RichEmbed()
            .setDescription("Server information")
            .setColor("#15f153")
            .setThumbnail(message.guild.iconURL)
            .addField("Server name", message.guild.name)
            .addField("Created on", message.guild.createdAt())
            .addField("You joined", message.member.joinedAt.toLocaleString())
            .addField("Total members", message.guild.members.size);

        return message.channel.send(embed);
    }
}