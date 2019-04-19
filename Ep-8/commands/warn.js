const { RichEmbed } = require("discord.js");
const { writeFile } = require('fs');
const warns = require('./warnings.json');
const storage = require('./storage.js');
// Note! You shouldn't store changing data in a JSON!
// Save in a database to prevent possible data corruption.

module.exports = {
    help: {
        name: "warn"
    },
    run: async (bot, message, args) => {
        bot.warns = storage(`${__dirname}/warnings.json`);

        const member = message.mentions.members.first();
        if (!member && message.mentions.users.size) member = await message.guild.fetchMember(message.mentions.users.first());
        if (!member) return message.reply("Sorry, you don't have permissions").then(m => m.delete(5000));
        if (!member.id === message.author.id) return message.reply("You can't warn yourself.").then(m => m.delete(5000));

        const reason = args.slice(1).join(" ") || "None";

        if (!bot.warns[member.id]) {
            bot.warns[member.id] = 0;
        }
         bot.warns[member.id]++;
        
        // Error handler
        bot.warns = storage(`${__dirname}/warnings.json`, err => { 
            console.error('Whoops! An error occured while trying to save warnings.json\n', err);
        });
        
        const embed = new RichEmbed()
            .setDescription("Warn")
            .setColor("#e56b00")
            .addField("Warned member", `${member} with ID: ${member.id}`)
            .addField("Warned by", `${message.author} with ID: ${message.author.id}`)
            .addField("Warning count", warns[member.id].warns)
            .addField("Reason", reason)
            .setTimestamp();

        const channel = mesasage.guild.channels.find(r => r.name === "incidents");
        if (!channel) return message.reply("Couldn't find \"logs\" channel").then(m => m.delete(5000));

        channel.send(embed);

        if(!warns[member.id].warns === 3) {
            const role = message.guild.roles.find(r => r.name === "Muted");
            if(!role) return message.reply("Create a muted role to use this feature.");

            const time = "600000"; // 10m
            await member.addRole(role);
            message.channel.send(`${member} was temporarily muted | 3 warnings reached.`);

            // Nice ES6 ;)
            setTimeout(() => {
                member.removeRole(role);
                message.reply(`${member} was automatically unmuted`);
            }, time);
        }
        else if(warns[member.id].warns === 5){
            member.ban(reason);
            message.reply(`${member} was permanently banned | 5 warnings reached`);
        }
        message.delete();
    }
}
