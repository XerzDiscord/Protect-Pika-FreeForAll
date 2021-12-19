const config = require('../../config/config.json');
const Discord = require('discord.js');
const novelcovid = require('novelcovid');
const { truncate } = require('fs');

module.exports.run = async(client, message, args) => {

  let text = args.join(" ")
  if(!text) {
      let corona = await novelcovid.all()

      const embed = new Discord.MessageEmbed()
      .setAuthor('Covid-19 Global Stats')
      .setColor(config.color.bot)
      .addField('Cas total :', corona.cases.toLocaleString(), true)
      .addField('Déces total :', corona.deaths.toLocaleString(), true)
      .addField('Soignés total :', corona.recovered.toLocaleString(), true)
      .addField('Cas aujourd\'hui :', corona.todayCases.toLocaleString(), true)
      .addField('Déces aujourd\'hui :', corona.todayDeaths.toLocaleString(), true)
      .addField('Soignés aujourd\'hui :', corona.todayRecovered.toLocaleString(), true)
      .addField('Cas critiques :', corona.critical.toLocaleString(), true)
      .addField('Update :', corona.updated.toLocaleString(), true)
      .setTimestamp()

      message.channel.send(embed)
 
  }
  else {
    let corona = await novelcovid.countries({country : args.join(' ')})

    if(corona.country === undefined) return message.channel.send(`${config.emoji.error} \`ERROR\` Location Invalide !`)
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Covid-19 ${corona.country} Stats`, corona.countryInfo.flag)
    .setColor(config.color.bot)
    .addField('Cas total :', corona.cases.toLocaleString(), true)
    .addField('Déces total :', corona.deaths.toLocaleString(), true)
    .addField('Soignés total :', corona.recovered.toLocaleString(), true)
    .addField('Cas aujourd\'hui :', corona.todayCases.toLocaleString(), true)
    .addField('Déces aujourd\'hui :', corona.todayDeaths.toLocaleString(), true)
    .addField('Soignés aujourd\'hui :', corona.todayRecovered.toLocaleString(), true)
    .addField('Cas critiques :', corona.critical.toLocaleString(), true)
    .addField('Update :', corona.updated.toLocaleString(), true)
    .setTimestamp()

    message.channel.send(embed)
  }
   
}

    module.exports.help = {
        name: 'covid',
        category: 'utiles',
        description: 'Obtiens les stats du coronavirus',
        aliases: ["corona", "coronavirus"],
        usage: "<country>",
        cooldown: 1,
        args: false,
        guildOnly: false
    }