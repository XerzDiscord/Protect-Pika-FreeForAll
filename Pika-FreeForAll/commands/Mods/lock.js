const config = require('../../config/config');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
       
    if(!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.channel.send(`${config.emoji.error} \`ERROR\` Il me manque la permission \`MANAGE_CHANNELS\` !`)
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);
   
    const guild = message.guild
    const salon = message.channel;
   
    salon.updateOverwrite(guild.id,{ 'SEND_MESSAGES': false}) 
   
const embed = new Discord.MessageEmbed()
 
.setDescription(`**🔒 Salon vérouillé !**`)
.setColor(`${config.color.bot}`)
message.channel.send(embed)        
    }

    module.exports.help = {
        name: 'lock',
        category: 'moderation',
        description: 'Vérouille un salon et empêche les membres de parler',
        aliases: ["mutechannel"],
        usage: " ",
        cooldown: 5,
        args: false,
        guildOnly: true
    }