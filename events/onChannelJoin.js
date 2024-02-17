const { Events } = require('discord.js');
const { createReadStream } = require('node:fs');
const { getVoiceConnection, createAudioResource, joinVoiceChannel, createAudioPlayer, StreamType } = require('@discordjs/voice');

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
		// if(newState.channelId === null) console.log('user left channel ', oldState.channelId);
        // else if (oldState.channelId === null) console.log('user joined channel', newState.channelId);
        // else console.log('user moved channels', oldState.channelId, newState.channelId);
        const cId = '604123367615758361';
		const mainChannel = newState.client.channels.cache.get(cId);
        const serverId = '123456';
		const srvr = newState.client.guilds.cache.get(serverId);

        
        if(newState.channelId !==  cId && mainChannel.members.size == 1){
            console.log('no one is left');
            //leave voice channel
            let cc1 = getVoiceConnection(oldState.guild.id);
            if(cc1){
                console.log('leaving voice channel...');
                cc1.destroy();
            }
        }
        if(oldState.channelId !== cId && mainChannel.members.size == 1){
            console.log('someone joined empty main channel');
            //join voice
            joinVoiceChannel({
				channelId: cId,
				guildId: serverId,
				adapterCreator: srvr.voiceAdapterCreator,
			});
        }

    
        if(!newState.member.user.bot && newState.channelId == '604123367615758361'){
            // use mem to have the new joiner id, and use that for the sound logic
            let cc = getVoiceConnection(oldState.guild.id);
            const player = createAudioPlayer();
            let soundPath = "./assets/";

            let mem = newState.member.id;
            switch (mem) {
                case '110106223109496832':
                    console.log(`Josh joined`);
                    soundPath += 'Oof.mp3';
                    break;
                case '147562375971602432':
                    console.log('Paul joined');
                    soundPath += 'f.mp3';
                    break;
                case '213510490775617536':
                    console.log('Shannon joined');
                    soundPath += 'Oof.mp3';
                    break;
                case '340299484028207105':
                    console.log('Alex joined');
                    soundPath += 'wtf.mp3';
                    break;
                case '113827762648776707':
                    console.log('Austin joined');
                    soundPath += 're.mp3';
                    break;
                case '160800489737420800':
                    console.log('Gio joined');
                    soundPath += 'Oof.mp3';
                    break;
                case '164219024371220480':
                    console.log('Timmy joined');
                    soundPath += 'jerm.mp3';
                    break;
                case '160800395134763008':
                    console.log('Tristen joined');
                    soundPath += 'Oof.mp3';
                    break;
                default:
                    console.log('this guy needs a sound');
            }
            if(cc && !(newState.streaming || oldState.streaming) && soundPath.length > 10){
                try{
                    console.log('trying to play audio...');
                    const resource = createAudioResource(createReadStream(soundPath),{
                        inputType: StreamType.Ogg
                    });
                    cc.subscribe(player);
                    player.play(resource);
                }
                catch(error){
                    console.log(`Couldn't play sound: ${error}`);
                }
            }
        }
	},
};