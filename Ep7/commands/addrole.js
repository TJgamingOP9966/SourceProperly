module.exports = {
    help: {
        name: "addrole"
    },
    run: async (bot, message, args) => {
        let member = message.mentions.members.first();
        let role = message.guild.roles.find(r => r.name == args.slice(1).join(" "));

        if (!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don't have the specified permissions to do this!").then(m => m.delete(5000));
        if (!member) return message.reply("You need to mention someone").then(m => m.delete(5000));
        if (!role) return message.reply("You need to use a valid role name, case sensitive too.").then(m => m.delete(5000));
        if (!member.roles.find(role)) {
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