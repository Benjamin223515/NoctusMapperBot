const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const _delay = 10000;
const utils = require("./utilities/utilsmain.js")

const v = "0.1-beta"

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
        utils.log.error(err.stack);
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
    client.guilds.get(config.ServerIDs[ServerID]).channels.get("482230604419563567").fetchMessages({limit: 1}).then(a => {
        if(reaction.message.id == a.first().id) {
            if(reaction.emoji.name == "✅") {
                reaction.remove(user);
                reaction.message.guild.members.get(user.id).addRole("482230687299010563").then(() => {}).catch(e => {console.log(e)})
                utils.console.log(`${user.tag} verified themselves.`)
            }
        }
    })
});

client.on("ready", () => {
    utils.log.log("Started!")
    let embed = utils.embeds.build("I'm awake!", `I have started! Here's my logistics\n\`\`\`diff\nVERSION\n- ${v}\nDISCORD API\n- Discord.js ${Discord.version}\nGUILDS AND USERS\n- In ${client.guilds.size} guild${client.guilds.size > 1 ? "s" : ""}\n- Watching ${client.users.size} users\nDEVELOPER\n+ Fubbo (AXIUS)\n\`\`\``)
    client.guilds.get("485972909567901706").channels.get(config.LogsChannel).send({embed});
});

client.on("message", (message) => {
    if (!message.guild) return;
    //if(message.channel.id == "482228566352855081" && message.content.indexOf(config.prefix + "%")) {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args[0].toLowerCase();
    Command(message, args, command)
});

client.login(config.token);