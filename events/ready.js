const { Events } = require('discord.js');
const { joinVoiceChannel,VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const channelId = '123456';
		const mainChannel = client.channels.cache.get(channelId);
		const serverId = '123456';
		const srvr = client.guilds.cache.get(serverId);

		//logic to check if people are in voice
		if(mainChannel.members.size > 0){
			joinVoiceChannel({
				channelId: channelId,
				guildId: serverId,
				adapterCreator: srvr.voiceAdapterCreator,
			});
		}
	},
};