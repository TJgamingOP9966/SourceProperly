const warns = require("./warnings.json");

module.exports = {
    help: {
        name: "warnings"
    },
    run: async (bot, message, args) => {
        if(!warns[member.id]) warns[member.id] = {
            warns: 0
        }

        const member = message.mentions.members.first();
        if (!member && message.mentions.users.size) member = await message.guild.fetchMember(message.mentions.users.first());
        if (!member) member = message.member;

        const warnings = warns[member.id].warns;

        message.reply(`${member} has ${warnings} warnings.`);
        
    }
}