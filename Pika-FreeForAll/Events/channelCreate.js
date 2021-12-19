const config = require('../config/config.json');
const Discord = require('discord.js');
const { readdirSync } = require("fs"); 
const db = require('quick.db')

module.exports = {
	name: 'channelCreate',
    async execute(channel, client) {

        if(channel.type !== "text" || channel.type !== "voice") return;
    // Anti channels
      const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
                limit: 1,
                type: 'CHANNEL_CREATE'
            })

            const latestChannelCreated = fetchGuildAuditLogs.entries.first();
            const { executor } = latestChannelCreated;

            let logs = channel.guild.channels.cache.get(db.get(`logs_${channel.guild.id}`))


    if(db.get(`antichannels_${channel.guild.id}`) === "on") {
        if(db.get(`whitelist_${executor.id}_${message.guild.id}`) === "on") return;
            channel.delete()
            if(!logs) return;
            let em = new Discord.MessageEmbed()
            .setDescription(`**${channel.name}** à été supprimé`)
            .addField('Raison :', 'Anti Channels')
            .addField('Createur :', `${executor} (\`${executor.id}\`)`)
            .setAuthor('Anti Channels', executor.displayAvatarURL())
            .setColor(config.color.bot)
            .setThumbnail(executor.displayAvatarURL())
            logs.send(em)
        }

        if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })

    
  }
};
