const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const _delay = 10000;
const utils = require("./utilities/utilsmain.js")

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
  
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
    utils.log.log(config.ServerIDs.ServerID)
    utils.log.log(config.ServerIDs.RetrieveID)
    utils.log.log("Started!")
    let embed = utils.embeds.build("I'm awake!", `I have started! Here's my logistics\n\`\`\`diff\nVERSION\n- ${config.version}\nDISCORD API\n- Discord.js ${Discord.version}\nGUILDS AND USERS\n- In ${client.guilds.size} guild${client.guilds.size > 1 ? "s" : ""}\n- Watching ${client.users.size} users\nDEVELOPER\n+ Fubbo (AXIUS)\n\`\`\``)
});

client.login(config.token);