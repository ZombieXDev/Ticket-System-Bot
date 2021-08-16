const Discord = require('discord.js');
const client = new Discord.Client();

///////////////////
const prefix = "!"; /// [ - Prefix Bot - ]
///////////////////

/*
- [ Copyright ZombieX in YT ] -
*/

client.on("ready", () => {
  console.log(`[ - Bot is Online - ]`);
  console.log(`Name Bot : ${client.user.username}`);
  console.log(`Guilds : ${client.guilds.cache.size}`);
  console.log(`Users : ${client.users.cache.size}`);
  console.log(`Channels : ${client.channels.cache.size}`);
  client.user.setStatus("online");
  client.user.setActivity(`${prefix}help | ZombieX Ticket System`, {
    type: "PLAYING"
  });
});


/*
- [ Copyright ZombieX in YT ] -
*/


client.on('message', message =>{
if(message.content === prefix +"create-log"){
message.guild.channels.create(`ticket-log`, { type: "text" })
message.channel.send('Done Create log channel , ☑️')
}
});


/*
- [ Copyright ZombieX in YT ] -
*/
client.on('message', message =>{
if(message.content.startsWith(prefix + "new")){
  let args = message.content.split(" ").slice(1).join(" ");
    if (!args) return message.channel.send(`**__Ex :__ ${prefix}new Nitro**`);
message.react("✅")
message.react("❎")

  // Filters
  const yesFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id
  const noFilter = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id

  const yes = message.createReactionCollector(yesFilter, {timer: 6000})
  const no = message.createReactionCollector(noFilter, {timer: 6000})
   yes.on('collect', (r, u) => {
      message.delete();
      message.reply("Done Create Your Ticket , ☑️")
      message.guild.channels.create(`ticket-${message.author.id}`, { type: "text" }).then(async channel => {
      channel.createOverwrite(message.guild.id, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false
      });
            channel.createOverwrite(message.author.id, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true
      });
            channel.send(`<@${message.author.id}>`, new Discord.MessageEmbed()
            .setTitle("Welcome to your ticket!")
            .setColor("GREEN")
            .setDescription(`Reason : ${args}`)
            
            )
})       
          const log = client.channels.cache.find(channel => channel.name === 'ticket-log');
      const embed = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setColor("GREEN")
      .setTitle("Created Ticket 🎟️")
      .addField("Created By :" , `${message.author.username}`)
      .addField("Reason :" , `${args}`)
      .setFooter(message.author.id,message.author.avatarURL())
      log.send(embed)
  })

     no.on('collect', (r, u) => {
      message.delete();
  })

}
});

/*
- [ Copyright ZombieX in YT ] -
*/


client.on('message', message =>{
if(message.content === prefix +"close"){
             if(!message.channel.name.includes("ticket-")) return message.channel.send("**❌ | This is Not Ticket Channel**");
message.channel.createOverwrite(message.guild.id, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false
});

message.channel.createOverwrite(message.author.id, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false
});
       const log = client.channels.cache.find(channel => channel.name === 'ticket-log');
      const embed = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setColor("GREEN")
      .setTitle("Closed Ticket 🔒")
      .addField("Closed By :" , `${message.author.username}`)
      .setFooter(message.author.id,message.author.avatarURL())
      log.send(embed);
             if(!log) message.author.send("**لا يوجد روم لوق من فضلك قم بأنشاء روم اللوق**");

}
});

/*
- [ Copyright ZombieX in YT ] -
*/

client.on('message', message =>{
if(message.content === prefix +"delete"){
    if (!message.member.hasPermission('MANAGE_GUILD')) {
message.channel.send(`**انت لا تمتلك البرمشن المطلوب MANAGE_GUILD**`);
};
         if(!message.channel.name.includes("ticket-")) return message.channel.send("**❌ | This is Not Ticket Channel**")
  message.react("✅")
message.react("❎")
  // Filters
  const yesFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id
  const noFilter = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id

  const yes = message.createReactionCollector(yesFilter, {timer: 6000})
  const no = message.createReactionCollector(noFilter, {timer: 6000})
     yes.on('collect', (r, u) => {
message.channel.delete();
       const log = client.channels.cache.find(channel => channel.name === 'ticket-log');
      const embed = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setColor("GREEN")
      .setTitle("Deleted Ticket 🗑️")
      .addField("Deleted By :" , `${message.author.username}`)
      .setFooter(message.author.id,message.author.avatarURL())
      log.send(embed)
  })
       no.on('collect', (r, u) => {
      message.delete();
  })

}
});

client.on('message', message =>{
if(message.content.startsWith(prefix + "rename")){
  if (!message.member.hasPermission('MANAGE_GUILD')) {
message.channel.send(`**انت لا تمتلك البرمشن المطلوب MANAGE_GUILD**`);
};
 if(!message.channel.name.includes("ticket-")) return message.channel.send("**❌ | This is Not Ticket Channel**")
     let args = message.content.split(" ").slice(1).join(" ");
    if (!args) return message.channel.send(`**__Ex :__ ${prefix}rename Done**`);
message.channel.setName(`${args}`)
    message.channel.send(
      `**Done rename ticket to ${args}  , ☑️**`
    );
           const log = client.channels.cache.find(channel => channel.name === 'ticket-log');
      const embed = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setColor("GREEN")
      .setTitle("Renamed Ticket 🔖")
      .addField("Renamed By :" , `${message.author.username}`)
      .addField("New Name Channel :" , `${args}`)
      .setFooter(message.author.id,message.author.avatarURL())
      log.send(embed)
}
});
/*
- [ Copyright ZombieX in YT ] -
*/

client.on('message', message =>{
if(message.content.startsWith(prefix + "add")){
  if (!message.member.hasPermission('MANAGE_GUILD')) {
message.channel.send(`**انت لا تمتلك البرمشن المطلوب MANAGE_GUILD**`);
};
if(!message.channel.name.includes("ticket-")) return message.channel.send("**❌ | This is Not Ticket Channel**")
let member = message.mentions.members.first();
if (!member) return message.channel.send(`**Please mention the user**`);
    if (
      message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    )
      return message.channel.send(
        `This member already in this ticket , :rolling_eyes:`
      );
    message.channel.createOverwrite(member.id, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true
    });
    message.channel.send(
      `**Done added <@${member.user.id}> to the ticket , ☑️**`
    );
    const log = client.channels.cache.find(channel => channel.name === 'ticket-log');
      const embed = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setColor("GREEN")
      .setTitle("Add Memeber for ticket 📥")
      .addField(" Added By :" , `${message.author.username}`)
      .addField("Member :" , `${member}`)
      .setFooter(message.author.id,message.author.avatarURL())
      log.send(embed)
}
});


/*
- [ Copyright ZombieX in YT ] -
*/

client.on('message', message =>{
if(message.content.startsWith(prefix + "remove")){
    if (!message.member.hasPermission('MANAGE_GUILD')) {
message.channel.send(`**انت لا تمتلك البرمشن المطلوب MANAGE_GUILD**`);
};
if(!message.channel.name.includes("ticket-")) return message.channel.send("**❌ | This is Not Ticket Channel**")
let member = message.mentions.members.first();
if (!member) return message.channel.send(`**Please mention the user**`);
    if (
      message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    )

    message.channel.createOverwrite(member.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false
    });
    message.channel.send(
      `**Done removed <@${member.user.id}> to the ticket , ☑️**`
    );

        const log = client.channels.cache.find(channel => channel.name === 'ticket-log');
      const embed = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setColor("GREEN")
      .setTitle("Remove Memeber for ticket 📤")
      .addField("Removed By :" , `${message.author.username}`)
      .addField("Member :" , `${member}`)
      .setFooter(message.author.id,message.author.avatarURL())
      log.send(embed)

}
});

/*
- [ Copyright ZombieX in YT ] -
*/

client.on('message', message =>{
if(message.content === prefix+"help"){
const embed = new Discord.MessageEmbed()
.setThumbnail(client.user.avatarURL())
.setAuthor(client.user.username,client.user.avatarURL())
.setColor("GREEN")
.setTitle("Ticket Commands :")
.addField(`${prefix}new`, "To open a new Ticket", true)
.addField(`${prefix}close`, "To Close Ticket", true)
.addField(`${prefix}delete`, "To Delete Ticket", true)
.addField(`${prefix}add`, "To add a member to the Ticket", true)
.addField(`${prefix}remove`, "To Remove a member in the Ticket", true)
.addField(`${prefix}rename`, "To Rename Ticket Channel", true)
.addField(`${prefix}create-log`, "To Create Log Channel", true)
.setFooter(`Requested By ${message.author.username}`)
message.channel.send(embed)
}
});
///////////////////
require('./server')();
client.login(process.env.token)
///////////////////
