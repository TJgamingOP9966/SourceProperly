const { writeFile } = require('fs');

module.exports = {
    help: { 
        name: "prefix"
    },
    run: async (bot, message, args) => {
        
        const prefixes = require('./prefixes.json');
        // Note! You shouldn't store changing data in a JSON!
        // Save in a database to prevent possible data corruption.


        if(!message.member.hasPermission("MANAGE_SERVER")) message.reply("Sorry, you don't have permissions");
        if(!args[0]) return message.reply(`Usage: ${prefixes[message.guild.id].prefixes}prefix <new prefix>`);

        prefixes[message.guild.id] = {
            prefixes: args[0]
        }

        writeFile("./prefixes.json", JSON.stringify(prefixes), err => {
            if(err) console.log(err);
        })

        const embed = new RichEmbed()
        .setTitle("Prefix Set!")
        .setDescription(`Set prefix to ${args[0]}`)
        .setColor("#e56b00")
        .setTimestamp()

        message.channel.send(embed)


    }
}