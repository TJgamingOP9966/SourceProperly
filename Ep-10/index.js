const {
  prefix,
  token
} = require("./config.json");
const {
  Client,
  Collection
} = require("discord.js");
const {
  readdir
} = require("fs");

const bot = new Client({
  disableEveryone: true
});

bot.commands = new Collection();
bot.aliases = new Collection();

const load = dir => {
  readdir(dir, (err, files) => {
    if (err) throw err;
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
  if (commandfile) {
    if (!message.member) message.member = await message.guild.fetchMember(message);
    commandfile.run(bot, message, args);
  }
});

bot.on("guildMemberAdd", member => {
  console.log(`${member.id} joined the server!`);

  const chan = member.guild.channels.find(c => c.name == "welcome_leave");
  chan.send(`Watch out! ${member} joined the server!`);
});

bot.on("guildMemberRemove", member => {
  console.log(`${member.id} left the server!`);

  const chan = member.guild.channels.find(c => c.name == "welcome_leave");
  chan.send(`Snap! ${member} left the server!`);
});

bot.on("channelCreate", channel => {
  console.log(`${channel.id} has been created!`);

  const chan = channel.guild.channels.find(c => c.name == "logs");
  chan.send(`${channel} has been created!`);
});

bot.on("channelDelete", channel => {
  console.log(`${channel.id} has been deleted!`);

  const chan = channel.guild.channels.find(c => c.name == "logs");
  chan.send(`${channel} has been deleted!`);
});


bot.login(token)