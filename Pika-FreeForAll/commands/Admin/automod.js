const config = require('../../config/config.json');
const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async(client, message, args) => {

   if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);

   if(args[0] === "warn" || args[0] === "warns") {
     let num = args[1]; 
     if(!num) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez entrer une valeur entre 0 et 10 !`);
     if(isNaN(num) || num > 10) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez entrer une valeur entre 0 et 10 !`);
       
     let action = args[2]; 
     if(!action) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer une saction parmi \`kick\`, \`ban\` et \`mute\` !`);
     if(!["kick", "ban", "mute"].includes(args[2])) return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer une saction parmi \`kick\`, \`ban\` et \`mute\` !`);
   
     db.set(`automods_warns_${message.guild.id}`, num)
     db.set(`automods_action_${message.guild.id}`, action)
       return message.channel.send(`${config.emoji.succes} \`SUCCES\` Les membres seront ${action} si ils ont plus de ${num} warns !`)
      
   }
 };

    module.exports.help = {
        name: 'automod',
        category: 'admin',
        description: 'Configure le module anti raid',
        aliases: ["auto-mods", 'auto-mod'],
        usage: "<module>",
        cooldown: 5,
        args: true,
        guildOnly: true
    }