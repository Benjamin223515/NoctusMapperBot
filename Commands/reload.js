const log = require(__dirname + "/../utilities/console.js")
const fs = require("fs");
const Discord = require("discord.js");
const embeds = require(__dirname + "/../utilities/embeds.js")

const _delay = 10000;

exports.run = (client, message, args) => {
    if(!args[1] || args.size < 2) {
        return message.channel.send(embeds.error("You need to specify a command!")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
    }

    try {
        delete require.cache[require.resolve(`./${args[1].toLowerCase()}.js`)];
        return message.channel.send(embeds.success("Successfully reloaded the command `" + args[1] + "`!")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
    }
    catch (e)
    {
        return message.channel.send(embeds.error(`The command \`${args[1]}\` doesn't exist!`)).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
    }
  };