const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joinvc')
		.setDescription('joins the main voice channel'),
	async execute(interaction) {
        await interaction.reply(`Joining a voice channel`);

        if(interaction.client.user){
            const guild = interaction.client.guilds.cache.get(interaction.guildId)
            const member = guild.members.cache.get(interaction.member.user.id);
            var voiceChannel = member.voice.channel;

            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
        }
	},
};