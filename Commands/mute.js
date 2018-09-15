const log = require(__dirname + "/../utilities/console.js")
const fs = require("fs");
const Discord = require("discord.js");
const embeds = require(__dirname + "/../utilities/embeds.js")

const _delay = 10000;

exports.run = (client, message, args) => {
    const config = require(__dirname + "/../Configs/" + message.guild.id + ".json");
    if(!args[1]||message.mentions.members.size < 1) {
        return message.channel.send(embeds.error("Invalid Syntax\n`" + config.prefix + "mute <@user>`")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
    }
    else
    {
        message.mentions.members.forEach(a => {
            if(a.roles.has(config.MuteRole)) {
                let role = message.guild.roles.find("id", config.MuteRole);
                a.removeRole(role).catch(console.error);
                return message.channel.send(embeds.error(`<@${a.id}> Unmuted.`)).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
            else
            {
                let role = message.guild.roles.find("id", config.MuteRole);
                a.addRole(role).catch(console.error);
                return message.channel.send(embeds.error(`<@${a.id}> Muted.`)).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
        })
    }
}