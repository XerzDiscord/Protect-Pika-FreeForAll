const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if(!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`${config.emoji.error} \`ERROR\` Il me manque la permission \`MANAGE_MESSAGES\` !`)

    if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);

    message.delete()
    const messageArray = message.content.split(" ");

    let deleteamount;
    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez indiquer un chiffre ente 1 et 100 !`);
    }

    if (parseInt(args[0]) >  100) {
        return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous ne pouvez pas supprimer plus de 100 messages !`)
        deleteamount = parseInt(args[0]);
    }
    message.channel.bulkDelete(args[0])

 const embed = new Discord.MessageEmbed()


 .setAuthor("Clear", message.guild.iconURL())
 .setDescription(`J'ai supprimé ${args[0]} messages !`)
 .setColor(config.color.bot)
    .setTimestamp()
    message.channel.send(embed).then(msg => {
        setTimeout(() => {
            msg.delete()
            
        }, 3000);
        })
   
 };

    module.exports.help = {
        name: 'clear',
        category: 'mods',
        description: 'Supprime des messages facilement',
        aliases: ["purge", "delete"],
        usage: "<number>",
        args: false,
        guildOnly: false
    }