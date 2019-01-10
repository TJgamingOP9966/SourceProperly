const { RichEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    help: {
        name: "tempmute"
    },
    run: async (bot, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return message.reply("Couldn't find that member.").then(m => m.delete(5000));
        if (member.hasPermission("MANAGE_MESSAGES")) return message.reply("Couldn't mute that person.").then(m => m.delete(5000));

        let role = message.guild.roles.find(r => r.name == "muted");

        if (!role) {
            try {
                message.guild.createRole({
                    name: "muted",
                    color: "BLACK",
                    permissions: []
                }).then(r => {
                    message.guild.channels.forEach(chan => {
                        chan.overwritePermissions(r, {
                            SEND_MESSAGES: false
                        });
                    });
                });
            } catch (e) {
                return message.reply("Couldn't find \"muted\" role, please create it.").then(m => m.delete(5000));
            }
        }

        let time = args[1] || "30m";

        await member.addRole(role);
        message.reply(`${member} has been muted for ${ms(time)}`);

        setTimeout(() => {
            member.removeRole(role);
        }, ms(mutetime));

        let embed = new RichEmbed()
            .setDescription("Mute")
            .setColor("#e56b00")
            .addField("Muted member", `${member} with ID ${member.id}`)
            .addField("Muted by", `${message.author} with ID ${message.author.id}`)
            .addField("Time", args[0])
            .setTimestamp()

        let channel = message.guild.channels.find(c => c.name == "logs");
        if (!channel) return message.reply("Couldn't find reports channel").then(m => m.delete(5000));
        return channel.send(embed);
    }
}