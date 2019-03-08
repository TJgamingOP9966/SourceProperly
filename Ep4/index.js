const { prefix, token } = require("./config.json");
const { Client, RichEmbed } = require("discord.js");

const bot = new Client({
    disableEveryone: true
});

bot.on("ready", () => {
    console.log(`${bot.user.username} is now online!`);
    bot.user.setActivity("proper code", {
        type: "WATCHING"
    });
});

bot.on("message", async message => {
    if (message.author.bot || message.channel.type != "text") return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(!message.member) message.member = await message.guild.fetchMember(message);

    if (cmd === "kick") {
        let member = message.mentions.members.first();
        if (!member && message.mentions.users.size) member = await message.guild.fetchMember(message.mentions.users.first());
        if (!member) return message.reply("You didn't mention someone.").then(m => m.delete(5000));
        if (!member.kickable) return message.reply("Sorry, you don't have permissions").then(m => m.delete(5000));
        if (member.id === message.author.id) return message.reply("You can't kick yourself.").then(m => m.delete(5000));

        const reason = args.slice(1).join(" ") || "None";

        const embed = new RichEmbed()
            .setDescription("Kick")
            .setColor("#e56b00")
            .addField("Kicked member", `${member} with ID ${member.id}`)
            .addField("Kicked by", `${message.author} with ID ${message.author.id}`)
            .addField("Reason", reason)
            .setTimestamp()

        const channel = message.guild.channels.find(c => c.name === "logs");
        if (!channel) return message.reply("Couldn't find reports channel").then(m => m.delete(5000));
        
        channel.send(embed);
        member.kick(reason);
        message.delete();
    }

    if (cmd === "ban") {
        let member = message.mentions.members.first();
        if (!member && message.mentions.users.size) member = await message.guild.fetchMember(message.mentions.users.first());
        if (!member) return message.reply("You didn't mention someone.").then(m => m.delete(5000));
        if (!message.member.hasPermission("BAN_MEMBERS") || !member.kickable) return message.reply("Sorry, you don't have permissions").then(m => m.delete(5000));
        if (member.id === message.author.id) return message.reply("You can't ban yourself.").then(m => m.delete(5000));

        const reason = args.slice(1).join(" ") || "None";

        const embed = new RichEmbed()
            .setDescription("Ban")
            .setColor("#e56b00")
            .addField("Banned member", `${member} with ID ${member.id}`)
            .addField("Banned by", `${message.author} with ID ${message.author.id}`)
            .addField("Reason", reason)
            .setTimestamp()

        const channel = message.guild.channels.find(c => c.name === "logs");
        if (!channel) return message.reply("Couldn't find reports channel").then(m => m.delete(5000));
        
        channel.send(embed);
        member.ban(reason);
        message.delete();
    }

    if (cmd === "report") {
        const member = message.mentions.members.first();
        if (!member && message.mentions.users.size) member = await message.guild.fetchMember(message.mentions.users.first());
        if (!member) return message.reply("You didn't mention someone.").then(m => m.delete(5000));
        if (member.id === message.author.id) return message.reply("You can't report yourself.").then(m => m.delete(5000));

        const reason = args.slice(1).join(" ") || "None";

        const embed = new RichEmbed()
            .setDescription("Report")
            .setColor("#FF0000")
            .addField("Reported user", `${member} with ID: ${member.id}`)
            .addField("Reported by", `${message.author} with ID ${message.author.id}`)
            .addField("Reason", reason)
            .setTimestamp()

        const channel = message.guild.channels.find(c => c.name === "reports");
        if (!channel) return message.reply("Couldn't find reports channel").then(m => m.delete(5000));

        channel.send(embed);
        message.delete();
    }

    if (cmd === "serverinfo") {
        const embed = new RichEmbed()
            .setDescription("Server information")
            .setColor("#15f153")
            .setThumbnail(message.guild.iconURL)
            .addField("Server name", message.guild.name)
            .addField("Created on", message.guild.createdAt.toLocaleString()())
            .addField("You joined", message.member.joinedAt.toLocaleString())
            .addField("Total members", message.guild.memberCount);

        return message.channel.send(embed);
    }

    if (cmd === "botinfo") { 
        const embed = new RichEmbed()
            .setDescription("Bot information")
            .setColor("#15f153")
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Bot name", bot.user.username)
            .addField("Created on", bot.user.createdAt.toLocaleString());

        return message.channel.send(embed);
    }
});

bot.login(token);