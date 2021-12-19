const config = require('../../config/config.json');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

   let reponses = ["https://purr.objects-us-east-1.dream.io/i/SOgqO.jpg", 
   "https://purr.objects-us-east-1.dream.io/i/ThRz6.jpg", 
   "https://purr.objects-us-east-1.dream.io/i/img_0645.jpeg", 
   "https://purr.objects-us-east-1.dream.io/i/wKKER.jpg", 
   "https://purr.objects-us-east-1.dream.io/i/vJtAi.jpg", 
   "https://purr.objects-us-east-1.dream.io/i/Tp5gI.jpg", 
   "https://purr.objects-us-east-1.dream.io/i/wgFuU.jpg", 
   "https://purr.objects-us-east-1.dream.io/i/SDcfu.jpg", 
   "https://purr.objects-us-east-1.dream.io/i/1001993_717282713070_557582143_n.jpg", 
   "https://purr.objects-us-east-1.dream.io/i/tumblr_m421kru3Gq1r6nwiqo2_1280.jpg",
   "https://media.giphy.com/media/TgDEErjoOQD1OQemI4/giphy.gif",
   "https://media1.tenor.com/images/aab2790fa0c8f652998de4381807feeb/tenor.gif",
   "https://media.tenor.com/images/b19085e7e923d14d5eba1f27a697fb63/tenor.gif",
   "https://media1.tenor.com/images/9e749336bd24c570f28322d2bc33f86d/tenor.gif",
   "https://media.tenor.com/images/042ef64f591bdbdf06edf17e841be4d9/tenor.gif",
   "https://media.tenor.com/images/59a44ad36354cb4a30205c2deaf87d70/tenor.gif",
   "https://media.tenor.com/images/94a128b634971fd2709b8c6d61a3f6e4/tenor.gif",
   "https://media1.tenor.com/images/ad6ae686f6e8ed9fd6b6cf27731432e8/tenor.gif",
   "https://media.tenor.com/images/e65f4d8066036f681a2c34219c2aa0e5/tenor.gif",
   "https://media.tenor.com/images/2906768a584deafea042d98b61b683d2/tenor.gif",
   "https://cdn.discordapp.com/attachments/722442647003725825/838118948737908766/SmartSelect_20210501-201842_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838118948984848394/SmartSelect_20210501-201913_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838118949400477736/SmartSelect_20210501-201856_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838118949668388874/SmartSelect_20210501-201723_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838118949908250634/SmartSelect_20210501-201804_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838118950159777852/SmartSelect_20210501-201752_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838118950402523177/SmartSelect_20210501-201641_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838118950948175912/SmartSelect_20210501-201713_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838118951249641472/SmartSelect_20210501-201656_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119016664137739/SmartSelect_20210501-201921_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119017117909052/SmartSelect_20210501-201941_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119017348071434/SmartSelect_20210501-202000_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119017646522418/SmartSelect_20210501-202013_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119018023485520/SmartSelect_20210501-202041_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119018320625684/SmartSelect_20210501-202025_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119040017891339/SmartSelect_20210501-202326_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119040257491025/SmartSelect_20210501-202246_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119040617545728/SmartSelect_20210501-202307_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119040891224064/SmartSelect_20210501-202235_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119041133707284/SmartSelect_20210501-202202_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119041381695560/SmartSelect_20210501-202218_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119041603600414/SmartSelect_20210501-202141_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119041838088252/SmartSelect_20210501-202100_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119042195521536/SmartSelect_20210501-202126_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119228514107432/SmartSelect_20210501-201556_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119228754100264/SmartSelect_20210501-201629_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119229030137896/SmartSelect_20210501-201607_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119269124145182/SmartSelect_20210501-201544_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119269433737246/SmartSelect_20210501-201520_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119269723537428/SmartSelect_20210501-201529_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119270104956968/SmartSelect_20210501-201507_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119270336561163/SmartSelect_20210501-201429_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119270621380608/SmartSelect_20210501-201440_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119270880772096/SmartSelect_20210501-201417_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119336639725628/SmartSelect_20210501-200844_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119679007916062/Snapchat-1333400474.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119871781797898/image0.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119899846148116/image0.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838121169231282267/IMG_20210224_114909.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838122440222572584/20200125_230915.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838122440642396181/20190427_161507.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838122548880736266/IMG_20180831_162743.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838125229397245962/image0.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119271389200394/SmartSelect_20210501-201346_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119271648460851/SmartSelect_20210501-201358_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119299410558986/SmartSelect_20210501-201335_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119299898015764/SmartSelect_20210501-201305_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119300244963378/SmartSelect_20210501-201317_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119300610261022/SmartSelect_20210501-201210_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119300954849310/SmartSelect_20210501-201252_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119301234819072/SmartSelect_20210501-201222_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119301541920768/SmartSelect_20210501-201202_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119301859901440/SmartSelect_20210501-201056_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119302125060167/SmartSelect_20210501-201118_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119334274007060/SmartSelect_20210501-201035_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119334508494858/SmartSelect_20210501-201005_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119334794494002/SmartSelect_20210501-201026_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119335041826836/SmartSelect_20210501-200935_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119335553269780/SmartSelect_20210501-200914_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119335892615188/SmartSelect_20210501-200925_Firefox.jpg",
   "https://cdn.discordapp.com/attachments/722442647003725825/838119336274034788/SmartSelect_20210501-200905_Firefox.jpg"];
   
   let reponse = Math.floor(Math.random() * reponses.length);
   let cat = reponses[reponse];

   author = message.author;

   let reactions = ["🤩", "🥰", "🤤", "🥺", "😚"];
   let reaction = Math.floor(Math.random() * reactions.length);
   let react = reactions[reaction];

  
  
       const embed = new Discord.MessageEmbed() 
       .setTitle('Meow...')
.setImage(cat)
.setColor(`${config.color.bot}`)
message.channel.send(embed).then(msg => {
    msg.react(react)
})
       
   
 };

    module.exports.help = {
        name: 'cat',
        category: 'images',
        description: 'Envoi un gif aléatoire de chat',
        aliases: ["chat"],
        usage: "",
        cooldown: 1,
        args: false,
        guildOnly: false
    }