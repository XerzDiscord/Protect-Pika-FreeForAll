const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
   
 //   if(message.author.id !== config.yuko || message.author.id !== config.xapex) return message.channel.send(`${config.emoji.error} \`ERROR\` Cette commande est réservée à mon créateur ! `)
   
    if(args.includes === "config.token") return message.channel.send(`${config.emoji.error} \`ERROR\` Je ne peux pas réveler mon token ! `)
   
   
    function clean(text) {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }

    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        var emb = new Discord.MessageEmbed()
            .setTitle('Résultat')
            .setDescription(`\`\`\`js` + '\n' + clean(evaled) + `\n` + `\`\`\``)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor(config.color.bot)
        message.channel.send(emb);
    } catch (err) {
        var emb = new Discord.MessageEmbed()
            .setTitle('Résultat')
            .setDescription(`\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\``)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor(config.color.bot)
        message.channel.send(emb);
    }


}
    module.exports.help = {
        name: 'eval',
        category: 'owner',
        description: 'Evalue une variable',
        aliases: [""],
        usage: "",
        cooldown: 1,
        args: false,
        guildOnly: false
    }