const { RichEmbed, Role } = require("discord.js");
const ms = require("ms");

module.exports = {
    help: {
        name: "tempmute"
    },
    run: async (bot, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member && message.mentions.users.size) member = await message.guild.fetchMember(message.mentions.users.first());
        if (!member && /^[0-9]+$/.test(args[0])) member = await message.guild.fetchMember(args[0]).catch(() => null);
        if (!member) return message.reply("Couldn't find that member.").then(m => m.delete(5000));
        if (member.hasPermission("MANAGE_MESSAGES")) return message.reply("Couldn't mute that person.").then(m => m.delete(5000));
        if (Role.comparePositions(member.highestRole, message.member.highestRole) >= 0) return message.reply("Couldn't mute that person.").then(m => m.delete(5000));
        if (Role.comparePositions(member.highestRole, message.guild.me.highestRole) >= 0) return message.reply("Couldn't mute that person.").then(m => m.delete(5000));

        let role = message.guild.roles.find(r => r.name === "muted");

        if (!role) {
            try {
                role = await message.guild.createRole({
                    name: "muted",
                    color: "BLACK"
                })
                await Promise.all(message.guild.channels.map(chan => chan.overwritePermissions(role, {
                    SEND_MESSAGES: false
                })))
            } catch(_) {
                return message.reply("Couldn't find \"muted\" role, please create it.").then(m => m.delete(5000));
            }
        }

        const time = args[1] || "30m";

        await member.addRole(role);
        message.reply(`${member} has been muted for ${ms(time)}`);

        setTimeout(() => {
            member.removeRole(role);
        }, ms(time));

        const embed = new RichEmbed()
            .setDescription("Mute")
            .setColor("#e56b00")
            .addField("Muted member", `${member} with ID ${member.id}`)
            .addField("Muted by", `${message.author} with ID ${message.author.id}`)
            .addField("Time", args[1])
            .setTimestamp()

        const channel = message.guild.channels.find(c => c.name === "logs");
        if (!channel) return message.reply("Couldn't find reports channel").then(m => m.delete(5000));
        return channel.send(embed);
    }
}
