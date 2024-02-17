const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hw')
		.setDescription('replies with Hello World'),
	async execute(interaction) {
		await interaction.reply('Hello World');
	},
};