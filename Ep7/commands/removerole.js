module.exports = {
    help: {
        name: "addrole"
    },
    run: async (bot, message, args) => {
        let member = message.mentions.members.first();
        let role = message.guild.roles.find(r => r.name.toLowerCase() == args.slice(1).join(" ").toLowerCase());

        if (!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don't have the specified permissions to do this!").then(m => m.delete(5000));
        if (!member) return message.reply("You need to mention someone").then(m => m.delete(5000));
        if (!role) return message.reply("You need to use a valid role name!").then(m => m.delete(5000));
        if (member.roles.find(role)) {
            member.removeRole(role);
            try {
                member.send(`Your \`${role.name}\` role has been removed.`);
            } catch (e) {
                message.channel.send(`${member}, your \`${role.name}\` role has been removed.`);
            }
        } else {
            message.reply(`That member doesn't have role: \`${role.name}\``).then(m => m.delete(5000));
        }
    }
}