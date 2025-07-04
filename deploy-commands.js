require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

const commands = [];
for (const dir of fs.readdirSync('./commands')) {
  for (const file of fs.readdirSync(`./commands/${dir}`)) {
    const cmd = require(`./commands/${dir}/${file}`);
    commands.push(cmd.data.toJSON());
  }
}

const rest = new REST().setToken(process.env.TOKEN);
(async () => {
  try {
    console.log('🔃 Registrando comandos...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Comandos registrados!');
  } catch (err) {
    console.error(err);
  }
})();
