const config = require('../../config/config.json');
const Discord = require('discord.js');
const weather = require('weather-js')

module.exports.run = (client, message, args) => {
    
    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result){
    
    if(err) message.channel.send(err.message);

    if(result.length === 0) {
        message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer une location valide !`)
        return undefined;
    }

        var current = result[0].current;
        var location = result[0].location;

        const embed = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Météo pour ${current.observationpoint}`)
            .setColor(config.color.embed)
            .addField('**Timezone**', `UTC ${location.timezone}`, true)
            .addField('**Température**', `${current.temperature}°C`, true)
            .addField('**Plus élevé**', `${current.feelslike}°C`, true)
            .addField('**Vent**', `${current.winddisplay}`, true)
            .addField('**Humidité**', `${current.humidity}%`, true)
            .addField('**Date**', `${current.date}`, true)
            .addField('**Jour**', `${current.day}`, true)
            .setTimestamp()

        message.channel.send(embed)
})
}

    module.exports.help = {
        name: 'weather',
        category: 'utiles',
        description: 'Regarde la météo d\'aujourd\'hui',
        aliases: ["meteo"],
        usage: "<localisation>",
        cooldown: 1,
        args: true,
        guildOnly: false
    }