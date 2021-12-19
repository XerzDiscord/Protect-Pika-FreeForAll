const config = require('../../config/config.json');
const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = (client, message, args) => {
      
     // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
       return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
      return message.channel.send(`${config.emoji.error} \`ERREUR\` Veullez spécifier l'id du message !`);
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === message.guild.id) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0] && g.guildID === message.guild.id);

    // If no giveaway was found
    if(!giveaway){
      return message.channel.send(`${config.emoji.error} \`ERREUR\` Je n'ai pas trouvé de giveaways pour : **${args.join(" ")}`);
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('🎉 Le Giveaway prendre fin dans '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.channel.send(`${config.emoji.error} \`ERROR\` Le Giveaway avec l'ID ${giveaway.messageID} est déjà terminé !`);
        } else {
            console.error(e);
            message.channel.send(`${config.emoji.error} \`ERROR\` Une erreur est survenu...`);
        }
    });
    
}

    module.exports.help = {
        name: 'end',
        category: 'giveaways',
        description: 'Termine un giveaway',
        aliases: ["gend", "end-giveaway"],
        usage: "<id/price>",
        cooldown: 2,
        args: true,
        guildOnly: false
    }