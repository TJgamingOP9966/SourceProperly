const { RichEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "kick"
    },
    run: async (bot, message, args) => {
        let member = message.mentions.members.first();
        if (!member && message.mentions.users.size) member = await message.guild.fetchMember(message.mentions.users.first());
        if (!member) return message.reply("You didn't mention someone.").then(m => m.delete(5000));
        if (!member.kickable) return message.reply("Sorry, you don't have permissions").then(m => m.delete(5000));
        if (member.id === message.author.id) return message.reply("You can't kick yourself.").then(m => m.delete(5000));

        const reason = args.slice(1).join(" ") || "None";

        const embed = new RichEmbed()
            .setDescription("Kick")
            .setColor("#e56b00")
            .addField("Kicked member", `${member} with ID ${member.id}`)
            .addField("Kicked by", `${message.author} with ID ${message.author.id}`)
            .addField("Reason", reason)
            .setTimestamp()

        const channel = message.guild.channels.find(c => c.name === "logs");
        if (!channel) return message.reply("Couldn't find \"logs\" channel").then(m => m.delete(5000));
        
        channel.send(embed);
        member.kick(reason);
        message.delete();
    }
}
