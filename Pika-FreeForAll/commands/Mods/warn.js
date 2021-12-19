const config = require('../../config/config.json');
const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
       
    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);
   
    let xyz = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!xyz) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un membre existant !`);
    let user = xyz.user
    if(!user) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un membre existant !`);
    
    let reason = args.slice(1).join(' ')
    if(!reason) reason = 'Aucune raison donnée...'

    
    db.add(`warn_${message.guild.id}_${user.id}`, 1)
    db.set(`raison_${message.guild.id}_${user.id}`, reason)
   
   let automod_warns = db.get(`automods_warns_${message.guild.id}`)
   let warn = db.get(`warn_${message.guild.id}_${user.id}`)
   let action = db.get(`automods_action_${message.guild.id}`)
     
   if(automod_warns <= warn) {
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
        let em1 = new Discord.MessageEmbed()
        .setAuthor('Auto Modération', user.displayAvatarURL())
        .setDescription(`**${user.tag}** à été **${action}** par l'auto modération du serveur !`)
        .setColor(config.color.bot)
        return message.channel.send(em1)
    } 

    let em = new Discord.MessageEmbed()
    .setAuthor('Warn', user.displayAvatarURL())
    .setDescription(`**${user.tag}** à bien été avertis !`)
    .addField('Raison', reason)
    .setColor(config.color.bot)

    message.channel.send(em)    
    }

    module.exports.help = {
        name: 'warn',
        category: 'moderation',
        description: 'Avertis un utilisateur',
        aliases: ["avertir"],
        usage: "<user> <raison>",
        cooldown: 5,
        args: true,
        guildOnly: true
    }