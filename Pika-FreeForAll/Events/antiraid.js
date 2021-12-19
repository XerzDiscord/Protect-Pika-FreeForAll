const config = require('../config/config.json');
const Discord = require('discord.js');
const { readdirSync } = require("fs"); 
const db = require('quick.db');
   
module.exports = {
	name: 'message',
    async execute(message, client) {
        if(message.channel.type !== "text") return;

        let user = message.author;

 let automod = db.get(`automod_${message.guild.id}`) || "off"
   let automod_warns = db.get(`automods_warns_${message.guild.id}`)
   let warn = db.get(`warn_${message.guild.id}_${user.id}`)
   let action = db.get(`automods_action_${message.guild.id}`)
   let logs = message.guild.channels.cache.get(db.get(`logs_${message.guild.id}`))

        if (/(discord|dsc\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content) && db.get(`antilinks_${message.guild.id}`) === "on") {
      if(db.get(`whitelist_${message.author.id}_${message.guild.id}`) === "on" || message.author.id === message.guild.owner.user.id) return;
      if(message.author.id === client.user.id) return;
      message.delete();
      let em = new Discord.MessageEmbed()
      .setColor(config.color.bot)
      .setDescription(`${config.emoji.warn} ${user} Vous avait reçu un avertissement car votre message contenait des liens`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      message.channel.send(em).then(msg => {setTimeout(() => {msg.delete()}, 2000)})

      let emb = new Discord.MessageEmbed()
        .setDescription(`${message.author} ( \`${message.author.id} \` ) reçu un avertissement !`) 
        .addField('Raison :', 'Anti Links')
        .setAuthor('Anti Links', message.author.displayAvatarURL())
        .setColor(config.color.bot)
        .setThumbnail(message.author.displayAvatarURL())
      if(logs) {
        logs.send(emb)
        }
       db.add(`warn_${message.guild.id}_${user.id}`, 1)
    db.set(`raison_${message.guild.id}_${user.id}`, "Protect Xapex・Anti Links")

     
   if(automod === "on" && automod_warns <= warn) {
        if(action === "ban") message.guild.members.ban(user, { reason: `Aneko Protect・Automod ( ${automod_warns} warns = ${action} )`}); db.set(`warn_${message.guild.id}_${user.id}`, 0)
        if(action === "kick") message.guild.members.cache.get(user.id).kick({ reason: `Aneko Protect・Automod ( ${automod_warns} warns = ${action} )`}); db.set(`warn_${message.guild.id}_${user.id}`, 0)
        if(action === "mute") {
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
            if (!muteRole) {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        permissions: 0
                    }
                })
                message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    CONNECT: false,
                    ADD_REACTIONS: false
                }))
            }
            await message.guild.members.cache.get(user.id).roles.add(muteRole); 
            db.set(`warn_${message.guild.id}_${user.id}`, 0)
        }
   }
}


    // Anti everyone
   if(message.mentions.everyone || message.mentions.here && db.get(`antieveryone_${message.guild.id}`) === "on") {
    if(db.get(`whitelist_${user.id}_${message.guild.id}`) === "on" || message.author.id === message.guild.owner.user.id) return;
        message.delete()
         let em = new Discord.MessageEmbed()
        .setDescription(`${message.author} ( \`${message.author.id} \` ) reçu un avertissement !`) 
        .addField('Raison :', 'Anti Everyone')
        .setAuthor('Anti Everyone', message.author.displayAvatarURL())
        .setColor(config.color.bot)
        .setThumbnail(message.author.displayAvatarURL())
        if(logs) {
        logs.send(em)
        }
        let emb = new Discord.MessageEmbed()
      .setColor(config.color.bot)
      .setDescription(`${config.emoji.warn} ${user} Vous avait reçu un avertissement car il est interdit de mentionner everyone/here ici !`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      message.channel.send(emb).then(msg => {setTimeout(() => {msg.delete()}, 2000)})
        
            db.add(`warn_${message.guild.id}_${user.id}`, 1)
    db.set(`raison_${message.guild.id}_${user.id}`, "Protect Xapex・Anti Everyone")
   
      if(automod === "on" && automod_warns <= warn) {
        if(action === "ban") message.guild.members.ban(user, { reason: `Aneko Protect・Automod ( ${automod_warns} warns = ${action} )`}); db.set(`warn_${message.guild.id}_${user.id}`, 0)
        if(action === "kick") message.guild.members.cache.get(user.id).kick({ reason: `Aneko Protect・Automod ( ${automod_warns} warns = ${action} )`}); db.set(`warn_${message.guild.id}_${user.id}`, 0)
        if(action === "mute") {
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
            if (!muteRole) {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        permissions: 0
                    }
                })
                message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    CONNECT: false,
                    ADD_REACTIONS: false
                }))
            }
            await message.guild.members.cache.get(user.id).roles.add(muteRole); 
            db.set(`warn_${message.guild.id}_${user.id}`, 1)
        }
   }

}

 }
}