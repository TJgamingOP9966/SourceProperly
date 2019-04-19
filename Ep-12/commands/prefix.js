const { RichEmbed } = require("discord.js");

module.exports = {
    help: { 
        name: "prefix"
    },
    run: async (bot, message, args) => {

        if(!message.member.hasPermission("MANAGE_SERVER")) message.reply("Sorry, you don't have permissions");
        if(!args[0]) return message.reply(`Usage: ${bot.prefixes[message.guild.id]}prefix <new prefix>`);

        if (!bot.prefixes[message.guild.id]) {
            bot.warns[message.guild.id] = args[0];
        }

        bot.prefixes = storage(`${__dirname}/prefixes.json`, err => { 
            console.error('Whoops! An error occured while trying to save prefixes.json\n', err);
        });

        const embed = new RichEmbed()
        .setTitle("Prefix Set!")
        .setDescription(`Set prefix to ${args[0]}`)
        .setColor("#e56b00")
        .setTimestamp()

        message.channel.send(embed)


    }
}