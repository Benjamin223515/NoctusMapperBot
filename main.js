const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const _delay = 10000;
const utils = require("./utilities/utilsmain.js")

const v = "0.3"

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
  
function Command(message, args, command) {
    if(!fs.existsSync(`./commands/${command}.js`)) {
        let embed = utils.embeds.build("Command not found", `You requested the command \`${command}\`, which doesn't exist.`)
        message.channel.send({embed}).then(a => {setTimeout(() => {a.delete()}, _delay); }).catch(e => { log.error(e);})
        return;
    }
    
    try {
        let commandFile = require(`./commands/${command}.js`);
        utils.log.log(message.author.username + " ran command '" + message + "'")
        message.delete();
        commandFile.run(client, message, args);
    } catch (err) {
        console.log(err)
    }
}

client.on('raw', async event => {
	// `event.t` is the raw event name
	if (!events.hasOwnProperty(event.t)) return;

	const { d: data } = event;
	const user = client.users.get(data.user_id);
	const channel = client.channels.get(data.channel_id) || await user.createDM();

	// if the message is already in the cache, don't re-emit the event
	if (channel.messages.has(data.message_id)) return;

	// if you're on the master/v12 branch, use `channel.messages.fetch()`
	const message = await channel.fetchMessage(data.message_id);

	// custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
	// if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	const reaction = message.reactions.get(emojiKey);

	client.emit(events[event.t], reaction, user);
});

client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;
    let config = require("./config.json")
    let conf = require("./Configs/" + reaction.message.guild.id + ".json")
    //suggestions
    client.guilds.get(config.ServerID).channels.get(conf.SugRev).fetchMessages().then(a => {
            if(reaction.emoji.name == "✅") {
                reaction.remove(user);
            }
    })
});

client.on("ready", () => {
    client.user.setActivity("")
    utils.log.log("Started!")
    client.guilds.forEach(id => {
        if(!fs.existsSync("./Configs/" + id.id + ".json")) {
            var conf = '{\n"prefix":".",\n"LogsChannel":"' + id.channels.first().id + '",\n"RankSub":"null",\n"SugSub":"null",\n"RankRev":"null",\n"SugRev":"null",\n"MuteRole":"null"\n}'
            utils.file.startup_file("./Configs/" + id.id + ".json", conf);
        }
    })
    let users = client.users.size;
    client.users.forEach(a => {
        if(a.bot) users = users - 1;
    })
    let embed = utils.embeds.build("I'm awake!", `I have started! Here's my logistics\n\`\`\`diff\nVERSION\n- ${v}\nLIBRARIES\n- Discord.js ${Discord.version}\nGUILDS AND USERS\n- In ${client.guilds.size} guild${client.guilds.size > 1 ? "s" : ""}\n- Watching ${users} users\nDEVELOPER\n+ Fubbo (AXIUS)\n\`\`\``)
    client.guilds.forEach(a => {
        let co = require('./Configs/' + a.id + ".json")
        a.channels.get(co.LogsChannel).send({embed});
    })
});

client.on("message", (message) => {
    let id = message.guild.id;
    let config = require("./Configs/" + id + ".json")
    let conf = config;
    if (!message.guild) return;
    if (message.author.bot) return;

    //suggestions
    if(message.channel.id === config.SugSub) {
        try {
            message.guild.channels.get(config.SugRev).send(utils.embeds.build(`${message.author.tag}'s Suggestion`, message.content)).then(a=>{
                a.react("✅")
                a.react("❎")
            })
            message.delete()
        }
        catch (e)
        {
            console.error(e);
            message.author.send(utils.embeds.error("An error occured.\n\n```" + e.stack + "```"))
        }
    }
    else
    //ranks
    if(message.channel.id === config.RankSub) {
        if(message.mentions.roles.size < 1||args.length > 1) {
            message.author.send(utils.embeds.error("You need to mention a role you wish to request!"))
        }
        else
        {
            try {
                message.guild.channels.get(config.RankRev).send(utils.embeds.build(`${message.author.tag}'s Rank Request`, "<@&" + message.mentions.roles.first().id + ">")).then(a=>{
                    a.react("✅")
                    a.react("❎")
                })
                message.delete()
            }
            catch (e)
            {
                message.author.send(utils.embeds.error("An error occured.\n\n```" + e.stack + "```"))
            }
        }
    }
    else {
        if (message.content.indexOf(conf.prefix) !== 0) return;

        const args = message.content.slice(conf.prefix.length).trim().split(/ +/g);
        const command = args[0].toLowerCase();
        Command(message, args, command)
    }
    
});

client.login(config.token);