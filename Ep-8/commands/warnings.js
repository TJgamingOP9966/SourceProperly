const warns = require("./warnings.json");

module.exports = {
    help: {
        name: "warnings"
    },
    run: async (bot, message, args) => {

        const member = message.mentions.members.first();
        if (!member && message.mentions.users.size) member = await message.guild.fetchMember(message.mentions.users.first());
        if (!member) member = message.member;

        if(!bot.warns[member.id] {
            bot.warns[member.id] = 0; 
        }
           
        const warnings = bot.warns[member.id];

        message.reply(`${member} has ${warnings} warnings.`);
        
    }
}
