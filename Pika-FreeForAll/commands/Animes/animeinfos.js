const config = require('../../config/config.json');
const Discord = require('discord.js');
let fetch = require('node-fetch');
const translate = require('@vitalets/google-translate-api');
const Kitsu = require('kitsu.js')
let kitsu = new Kitsu()

module.exports.run = (client, message, args) => {
   
   //main part
       var search = message.content.split(/\s+/g).slice(1).join(" ");
       kitsu.searchAnime(search).then(async result => {
           if (result.length === 0) {
               return message.channel.send(`No results found for **${search}**!`);
           }
         
         var anime = result[0]

           let embed = new Discord.MessageEmbed()
               .setColor(config.color.bot)
               .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
               .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
               .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
               .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
               .addField('❯\u2000\Status', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
               .setThumbnail(anime.posterImage.original, 100, 200);
         

           return message.channel.send({ embed })
       }).catch(err => {
           console.log(err) //cathing error
           return message.channel.send(`${config.emoji.error} \`ERROR\` Aucun résultats pour **${args[0]}**`);
       });

  };
    module.exports.help = {
        name: 'anime',
        category: 'animes',
        description: 'Envoi une citation d\'animé',
        aliases: ["ai", "ani"],
        usage: " ",
        cooldown: 2,
        args: true,
        guildOnly: false
    }