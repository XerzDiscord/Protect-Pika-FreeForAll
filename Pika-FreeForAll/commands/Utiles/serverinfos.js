const config = require('../../config/config.json');
const Discord = require('discord.js'); 
const moment = require('moment');

module.exports.run = (client, message, args) => {
          
    const guild = message.guild;

    let region = {
        "brazil": ":flag_br: Brazil",
        "europe": ":flag_eu: Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };

    let verif = {
        "NONE": "Aucun",
        "LOW": "Bas",
        "MEDIUM": "Moyen", 
        "HIGH": "Elevé", 
        "VERY_HIGH": "Super elevé"
    }

const embed = new Discord.MessageEmbed()
.setTitle(`**✉️ Infos sur ${guild.name}**`)
 .addField(`**Nom + Id:**`, `${guild.name} \`${guild.id}\``, false)
 .addField(`**Owner :**`, `${guild.owner}`, true)
 .addField(`**Crée le :**`, `${moment(guild.createdAt).format('DD/MM/YYYY')}`, true)
 .addField(`**Région :**`, region[guild.region], true)
 .addField(`**Salons :**`, `Textuels : ${guild.channels.cache.filter(ch => ch.type === "text").size} \n Vocaux : ${guild.channels.cache.filter(ch => ch.type === "voice").size}`, true)
 .addField(`**Rôles :**`, `${guild.roles.cache.size || 0}`, true)
 .addField("Total・Humans・Bots", `**${guild.members.cache.size}** membres au total \n **${guild.members.cache.filter(member => !member.user.bot).size}** utilisateurs \n **${guild.members.cache.filter(member => member.user.bot).size}** bots`, false)
 .addField("Niveau de vérification", verif[guild.verificationLevel], true)
 .setThumbnail(guild.iconURL())
 .setColor(`${config.color.bot}`)
  .addField(`**Emojis :**`, `${guild.emojis.cache.size || 0}`,true)

 message.channel.send(embed)
}

    module.exports.help = {
        name: 'server-infos',
        category: 'utiles',
        description: 'Obtiens des infos sur le serveur',
        aliases: ["si", "serverinfo", "serverinfos"],
        usage: "",
        cooldown: 1,
        args: false,
        guildOnly: true
    }