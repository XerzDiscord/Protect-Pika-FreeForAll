const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
       
    if(!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.channel.send(`${config.emoji.error} \`ERROR\` Il me manque la permission \`MANAGE_CHANNELS\` !`)
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${config.emoji.error} \`ERREUR\` Vous n'avez pas les permissions requises !`);
   
    let channel = message.mentions.channels.first() || message.channel;

    if (!channel) {
        return message.channel.send(`${config.emoji.error} \`ERREUR\` Veuillez fournir un salon valide !`);
    }
    message.delete()

            const position = channel.position;
            const topic = channel.topic;
            const channel2 = await channel.clone();
            channel2.setPosition(position);
            channel2.setTopic(topic);
            channel.delete();

    let em = new Discord.MessageEmbed()
    .setAuthor('Nuke', message.guild.iconURL())
    .setDescription(`Salon réinitialisez avec succés !`)
    .setColor(config.color.bot)
            channel2.send(`**${message.author},**`, em).then((msg) => {
                setTimeout(() => {
                       msg.delete()
                }, 4000)
            })
    }

    module.exports.help = {
        name: 'nuke',
        category: 'moderation',
        description: 'Dévérouille un salon',
        aliases: ["nuked", "renew"],
        usage: " ",
        cooldown: 5,
        args: false,
        guildOnly: true
    }