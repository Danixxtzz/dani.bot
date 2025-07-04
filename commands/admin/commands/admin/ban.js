const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bane um usuário do servidor.')
    .addUserOption(option =>
      option.setName('usuário')
        .setDescription('Usuário para banir')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    
  async execute(interaction) {
    const user = interaction.options.getUser('usuário');
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) return interaction.reply({ content: 'Usuário não encontrado.', ephemeral: true });

    try {
      await member.ban();
      await interaction.reply({ content: `🔨 ${user.tag} foi banido com sucesso!` });
    } catch (error) {
      await interaction.reply({ content: '❌ Não consegui banir o usuário.', ephemeral: true });
    }
  }
};
