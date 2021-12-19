const config = require('../../config/config.json');
const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async(client, message, args) => {

    if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send(`${config.emoji.error} \`ERROR\` Il me manque la permission \`MANAGE_ROLES\` !`)

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${config.emoji.error} \`ERROR\`Vous n'avez pas la permission requises !`)
    const member = message.mentions.members.first()
    
    if (!member) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous devez mentionnez quelqu'un !`)
    
    if(member.id === client.user.id) return message.channel.send(`${config.emoji.error} \`ERROR\` Je ne peux pas me mute moi même...`)
    
    if (member.id === message.guild.ownerID) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous ne pouvez mute le propriétaire du serveur !`)
    
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(`${config.emoji.error} \`ERROR\` Vous ne pouvez pas réduire au silence un membre plus haut que dans la hiérarchie !`)
    
    if (!member.manageable) return message.channel.send(`${config.emoji.error} \`ERROR\` Je n'ai pas pu mute car il est plus haut que moi dans la hiérarchie !`)
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
    await member.roles.remove(muteRole)

    const embed = new Discord.MessageEmbed()

    .setAuthor('Sanction', message.guild.iconURL())
    .setDescription(`${message.author} a redonné la voix à ${member.user.tag} !`)
    .setColor(`${config.color.bot}`)
           .setTimestamp()
           message.channel.send(embed)
            
    }

    module.exports.help = {
        name: 'unmute',
        category: 'mods',
        description: 'Redonne la voix à un membre',
        aliases: [" "],
        usage: "<user>",
        args: true,
        guildOnly: true
    }