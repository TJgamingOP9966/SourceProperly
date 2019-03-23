const { RichEmbed } = require('discord.js');

module.exports = {
    help: {
        name: "8ball"
    },
    run: async (bot, message, args) => {
        if(!args[0]) return message.reply("Please enter a question to ask the magic 8ball.");
        const replies = [
            "Yes.",
            "No.",
            "I don't know.",
            "Try again later."
        ];
        const result = Math.floor((Math.random() * replies.length));
        const question = args.join(" ");

        const embed = new RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor("#e56b00")
        .addField("Question", question)
        .addField("Answer", replies[result])
        .setTimestamp();

        message.channel.send(embed);

    }
}