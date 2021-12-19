const config = require('../config/config.json');
const Discord = require('discord.js');
const db = require('quick.db');
   
module.exports = {
	name: 'guildMemberAdd',
    async execute(member, client) {
        
        let message = member;

        let prefix = config.prefix;
        logs = member.guild.channels.cache.get(db.get(`logs_${message.guild.id}`));
        let addbot = db.get(`antibots_${message.guild.id}`) || "off";
        let raidmode = db.get(`raidmode_${message.guild.id}`) || "off";

        // Anti add bot
    if(addbot === "on" && member.user.bot) {
        member.ban({reason: 'Anti Add Bot'})
        if(!logs) return;
        let em = new Discord.MessageEmbed()
        .setDescription(`${member} ( \`${member.id} \`) à été banni`)
        .addField('Raison :', 'Anti Add Bot')
        .setAuthor('Anti Add-Bot', member.user.displayAvatarURL())
        .setColor(config.color.bot)
        .setThumbnail(member.user.displayAvatarURL())
        return logs.send(em)
        }
    
    // raidmode
    if(raidmode === "on") {
        member.kick({reason: 'Anti Raid mode'})
        if(!logs) return;
        let em = new Discord.MessageEmbed()
        .setDescription(`${member} ( \`${member.id} \`) à été banni`)
        .addField('Raison :', 'Raid mode')
        .setAuthor('Raid mode', member.user.displayAvatarURL())
        .setColor(config.color.bot)
        .setThumbnail(member.user.displayAvatarURL())
        logs.send(em)
    }
     
    }
};

