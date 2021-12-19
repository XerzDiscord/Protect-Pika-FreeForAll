const config = require('../../config/config.json');
const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = (client, message, args) => {
      
       // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
          return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez mentionner un salon valide !`);
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez spécifier une durée !`);
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
           return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez spécifier un nombre de gagnants !`);
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
           return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un prix  !`);
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: parseInt(giveawayNumberWinners),
        // Who hosts this giveaway
        hostedBy: message.author,
        // Messages
        messages: {
            giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: "🎉🎉 **GIVEAWAY FINI** 🎉🎉",
            timeRemaining: "Temps restant  : **{duration}** !",
            inviteToParticipate: "Réagis avec 🎉 pour participer !",
            winMessage: "🎉 Félicitations, {winners} ! Vous avez gagné **{prize}** !",
            embedFooter: "Giveaways",
            noWinner: "Giveaway annulé, aucune participation...",
            hostedBy: "Hosted by : {user}",
            winners: "winner(s)",
            endedAt: "Fin à",
            units: {
                seconds: "secondes",
                minutes: "minutes",
                hours: "heures",
                days: "jours",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`🎉 Giveaways lancé dans ${giveawayChannel}!`);

}

    module.exports.help = {
        name: 'start',
        category: 'giveaways',
        description: 'Lance un giveaway',
        aliases: ["giveaway-start", "gstart"],
        usage: "<channel> <time> <winner> <price>",
        cooldown: 2,
        args: true,
        guildOnly: false
    }