const log = require(__dirname + "/../utilities/console.js")
const fs = require("fs");
const Discord = require("discord.js");
const embeds = require(__dirname + "/../utilities/embeds.js")

const _delay = 10000;

function Help(message, id) {
    const config = require(__dirname + "/../Configs/" + id + ".json");
    let embed = embeds.build("Server Settings", "")
    .addField("Prefix", `\`${config.prefix}\``, true)
    .addField("Logs Channel", `<#${config.LogsChannel}>`)
    return message.channel.send({embed}).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
}

exports.run = (client, message, args) => {
    let id = message.guild.id;
    const config = require(__dirname + "/../Configs/" + id + ".json");
    if(!args[1]) Help(message, id);
    else {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            switch(args[1].toLowerCase()) {
            default:
                return Help(message, id);

            case "prefix":
            if(!args[2]) {
                return message.channel.send(embeds.error("Invalid Syntax\n`" + config.prefix + "settings prefix <newPrefix>`")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
            config.prefix = args[2];
            fs.writeFile(__dirname + "/../config.json", JSON.stringify(config), (err) => {});
            return message.channel.send(embeds.success("Successfully changed the command prefix to `" + args[2] + "`.")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            
            case "logs":
            if(!args[2]||isNaN(args[2])) {
                return message.channel.send(embeds.error("Invalid Syntax\n`" + config.prefix + "settings logs <channelID>`")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
            config.LogsChannel = args[2];
            fs.writeFile(__dirname + "/../config.json", JSON.stringify(config), (err) => {});
            return message.channel.send(embeds.success("Successfully changed the log channel to to <#" + args[2] + ">.")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
        
        }
        else {
            return message.channel.send(embeds.error("You don't have permission to change values")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
        }
    }  
}