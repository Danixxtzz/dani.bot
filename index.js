require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
for (const dir of fs.readdirSync('./commands')) {
  for (const file of fs.readdirSync(`./commands/${dir}`)) {
    const cmd = require(`./commands/${dir}/${file}`);
    client.commands.set(cmd.data.name, cmd);
  }
}

for (const file of fs.readdirSync('./events')) {
  const evt = require(`./events/${file}`);
  if (evt.once) client.once(evt.name, (...args) => evt.execute(...args, client));
  else client.on(evt.name, (...args) => evt.execute(...args, client));
}

client.login(process.env.TOKEN);
