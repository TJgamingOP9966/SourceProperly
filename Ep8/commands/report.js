const { RichEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "report"
    },
    run: async(bot, message, args) => {
        let member = message.mentions.members.first();
        if (!member && message.mentions.users.size) member = await message.guild.fetchMember(message.mentions.users.first());
        if (!member) return message.reply("You didn't mention someone.").then(m => m.delete(5000));

        const reason = args.slice(1).join(" ") || "None";

        const embed = new RichEmbed()
            .setDescription("Report")
            .setColor("#FF0000")
            .addField("Reported user", `${member} with ID: ${member.id}`)
            .addField("Reported by", `${message.author} with ID ${message.author.id}`)
            .addField("Reason", reason)
            .setTimestamp()

        const channel = message.guild.channels.find(c => c.name === "reports");
        if (!channel) return message.reply("Couldn't find reports channel").then(m => m.delete(5000));

        channel.send(embed);
        message.delete();
    }
}