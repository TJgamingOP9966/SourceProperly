const { Role } = require('discord.js');

module.exports = {
    help: {
        name: "addrole"
    },
    run: async (bot, message, args) => {
        let member = message.mentions.members.first();
        if (!member && message.mentions.users.size) member = await message.guild.fetchMember(message.mentions.users.first());
        const role = message.guild.roles.find(r => r.name.toLowerCase() === args.slice(1).join(" ").toLowerCase());

        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You don't have the specified permissions to do this!").then(m => m.delete(5000));
        if (!member) return message.reply("You need to mention someone").then(m => m.delete(5000));
        if (!role) return message.reply("You need to use a valid role name!").then(m => m.delete(5000));
        if (Role.comparePositions(role, message.member.highestRole) >= 0) return message.reply("You don't have the specified permissions to do this!").then(m => m.delete(5000));
        if (Role.comparePositions(role, message.guild.me.highestRole) >= 0) return message.reply("I don't have the specified permissions to do this!").then(m => m.delete(5000));

        if (!member.roles.has(role.id)) {
            member.addRole(role);
            try {
                member.send(`Congrats, you have been given the \`${role.name}\` role!`);
            } catch (e) {
                message.channel.send(`Congrats to ${member}, you have been given the \`${role.name}\` role!`);
            }
        } else {
            message.reply(`That member already has role: \`${role.name}\``).then(m => m.delete(5000));
        }
    }
}