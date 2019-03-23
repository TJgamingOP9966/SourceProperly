const { token, prefix } = require("./config.json");
const { Client, Collection } = require("discord.js");
const { readdir } = require("fs");

const bot = new Client({
    disableEveryone: true
});

bot.commands = new Collection();
bot.aliases = new Collection();

const load = dir => {
    readdir(dir, (err, files) => {
        if(err) throw err;
        const jsfiles = files.filter(f => f.endsWith('.js'));

        jsfiles.forEach(f => {
            delete require.cache[require.resolve(`${dir}${f}`)];

            const props = require(`${dir}${f}`);
            console.log(`${f} loaded!`);
            
            bot.commands.set(props.help.name, props);
            if (props.help.aliases) props.help.aliases.forEach(alias => bot.aliases.set(alias, props.help.name));
        });
    });
}

load("./commands/");

bot.on("ready", () => {
    console.log(`${bot.user.username} is now online!`);
    bot.user.setActivity("proper code", {
        type: "WATCHING"
    });
});

bot.on("message", async message => {
    if (message.author.bot || message.channel.type != "text") return;

    // Note! You shouldn't store changing data in a JSON!
    // Save in a database to prevent possible data corruption.

    const prefixes = require('./prefixes.json');
    if(!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: prefix
        }
    }
    const updatedPrefix = prefixes[message.guild.id].prefixes;


    const args = message.content.slice(updatedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (!message.content.startsWith(updatedPrefix)) return;

    
    

    const commandfile = bot.commands.get(cmd);
    if (commandfile){
        if(!message.member) message.member = await message.guild.fetchMember(message);
        commandfile.run(bot, message, args);
    }
});

bot.login(token)
