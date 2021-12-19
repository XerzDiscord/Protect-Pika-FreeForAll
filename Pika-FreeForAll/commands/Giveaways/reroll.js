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

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('🎉 Giveaways relancé !');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
             message.channel.send(`${config.emoji.error} \`ERROR\` Ce Giveaway n'est pas terminé !`);
        } else {
            console.error(e);
            message.channel.send(`${config.emoji.error} \`ERROR\` Une erreur est survenu...`);
        }
    });

}

    module.exports.help = {
        name: 'reroll',
        category: 'giveaways',
        description: 'Relance un giveaway',
        aliases: ["giveaway-reroll", "greroll"],
        usage: "<channel> <time> <winner> <price>",
        cooldown: 2,
        args: true,
        guildOnly: false
    }