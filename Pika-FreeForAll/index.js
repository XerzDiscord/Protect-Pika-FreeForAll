const Discord = require('discord.js');
const { readdirSync } = require('fs');
const config = require('./config/config.json');
const client = new Discord.Client();
const disbut = require('discord-buttons');
disbut(client);
const keepAlive = require('./server.js');


const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 1000,
    default: {
        botsCanWin: false,
        embedColor: config.color.bot,
        reaction: "🎉"
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    member.send(`🎉 Votre participation au giveaway a bien été retenue !`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    member.send(`🎉 Votre participation au giveaway a bien été retirée...`);
});

['commands', 'cooldowns'].forEach(x => (client[x] = new Discord.Collection()));

const loadCommands = (dir = './commands/') => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files =>
            files.endsWith('.js')
        );

        for(const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
        }
    });
};
loadCommands();

const eventFiles = readdirSync('./Events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./Events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

keepAlive();

client.login(config.token);