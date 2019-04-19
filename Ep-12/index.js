const { prefix, token } = require("./config.json");
const { Client, Collection } = require("discord.js");
const { readdir } = require("fs");

const bot = new Client({
    disableEveryone: true
});
const storage = require('./storage.js');
bot.warns = storage(`${__dirname}/warnings.json`);
bot.prefixes = storage(`${__dirname}/prefixes.json`);

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

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix)) return;

    const commandfile = bot.commands.get(cmd);
    if (commandfile){
        if(!message.member) message.member = await message.guild.fetchMember(message);
        commandfile.run(bot, message, args);
    }
});

bot.login(token)
