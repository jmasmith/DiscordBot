const { Events } = require('discord.js');
const { joinVoiceChannel,VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        const messageVal = message.content;
        const channelId = '604123367615758361';
        let checkConnection = getVoiceConnection(message.guild.id);

        if(!checkConnection && messageVal == "!!joinVoice"){
            joinVoiceChannel({
                channelId: channelId,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            console.log("join voice");
        }
        else if(checkConnection && messageVal == "!!leaveVoice"){
            checkConnection.destroy();
            console.log("leave voice");
        }
	},
};