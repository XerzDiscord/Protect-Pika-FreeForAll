const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    
    if(!["pierre", "feuille", "papier", "ciseaux"].includes(args[0])) return message.channel.send(`${config.emoji.error} \`ERROR\` Veuillez choisir entre \`pierre/papier/ciseaux\` !`)
    const chifumi = args.join(" ").toLowerCase();

    const rep = [
        `pierre`,
        `ciseaux`,
        `papier`,
    ];
    const reps = Math.floor(Math.random() * (rep.length - 1) + 1);
    const reponse = rep[reps]

    let resp = {
        "pierre": "Pierre 🪨",
        "feuille": "Papier 🍃",
        "papier": "Papier 🍃",
        "ciseaux": "C️i️s️e️a️u️x️ ✂️"
    }
    let symbole = resp[args[0].toLowerCase()]

    let result;
    if(args[0] === "papier" && reponse === "papier" || args[0] === "feuille" && reponse === "pierre" || args[0] === "pierre" && reponse === "pierre" || args[0] === "ciseaux" && reponse === "ciseaux") {
        result = "🤔 Wow, nous avons fait égalité !"
    }
    if(["papier", "feuille"].includes(args[0]) && reponse === "ciseaux" || args[0] === "pierre" && reponse === "papier" || args[0] === "ciseaux" && reponse === "pierre") {
        result = "☹️ Dommage, vous avez perdu..."
    }
    if(["papier", "feuille"].includes(reponse) && args[0] === "ciseaux" || reponse === "pierre" && args[0] === "papier" || reponse === "ciseaux" && args[0] === "pierre") {
    result = "🎉 Bravo ! Vous avez gagné !"
}

   const embed = new Discord.MessageEmbed()

    .setColor(config.color.bot)
    .setFooter(`${message.author.username} contre ${client.user.username}`)
    .setTimestamp()
    .addField(`**${message.author.username} :**`, symbole)
    .addField(`**${client.user.username} :**`, resp[reponse])
    .addField(`**Résultat :**`, result)

    message.channel.send(embed)
                    };

    module.exports.help = {
        name: 'ppc',
        category: 'funs',
        description: 'Pierre, feuille, ciseaux !',
        aliases: ["pfc"],
        usage: "<pierre/feuille/ciseaux>",
        args: true,
        guildOnly: false
    }