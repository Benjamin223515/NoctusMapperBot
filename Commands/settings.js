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
    .addField("Mute Role", (config.MuteRole == "null" ? "DISABLED" : `<@&${config.MuteRole}>`))
    .addField("Rank Submission Channel", (config.RankSub == "null" ? "DISABLED" : "<#" + config.RankSub + ">"))
    .addField("Rank Review Channel", (config.RankRev == "null" ? "DISABLED" : "<#" + config.RankRev + ">"))
    .addField("Suggestion Submission Channel", (config.SugSub == "null" ? "DISABLED" : "<#" + config.SugSub + ">"))
    .addField("Suggestion Review Channel", (config.SugRev == "null" ? "DISABLED" : "<#" + config.SugRev + ">"))
    .addField("Approved Suggestion Channel", (config.SugApp == "null" ? "DISABLED" : "<#" + config.SugApp + ">"))
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
            fs.writeFile(__dirname + "/../Configs/" + id + ".json", JSON.stringify(config), (err) => {});
            return message.channel.send(embeds.success("Successfully changed the command prefix to `" + args[2] + "`.")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            
            case "sugapp":
            if(!args[2]||isNaN(args[2])) {
                return message.channel.send(embeds.error("Invalid Syntax\n`" + config.prefix + "settings sugapp <channelID>`")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
            config.SugApp = args[2];
            fs.writeFile(__dirname + "/../Configs/" + id + ".json", JSON.stringify(config), (err) => {});
            return message.channel.send(embeds.success("Successfully changed the accepted suggestion channel to to <#" + args[2] + ">.")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})

            case "sugrev":
            if(!args[2]||isNaN(args[2])) {
                return message.channel.send(embeds.error("Invalid Syntax\n`" + config.prefix + "settings sugrev <channelID>`")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
            config.SugRev = args[2];
            fs.writeFile(__dirname + "/../Configs/" + id + ".json", JSON.stringify(config), (err) => {});
            return message.channel.send(embeds.success("Successfully changed the submission review channel to to <#" + args[2] + ">.")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})

            case "sugsub":
            if(!args[2]||isNaN(args[2])) {
                return message.channel.send(embeds.error("Invalid Syntax\n`" + config.prefix + "settings sugsub <channelID>`")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
            config.SugSub = args[2];
            fs.writeFile(__dirname + "/../Configs/" + id + ".json", JSON.stringify(config), (err) => {});
            return message.channel.send(embeds.success("Successfully changed the suggestion submission channel to to <#" + args[2] + ">.")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})

            case "rankrev":
            if(!args[2]||isNaN(args[2])) {
                return message.channel.send(embeds.error("Invalid Syntax\n`" + config.prefix + "settings rankrev <channelID>`")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
            config.RankRev = args[2];
            fs.writeFile(__dirname + "/../Configs/" + id + ".json", JSON.stringify(config), (err) => {});
            return message.channel.send(embeds.success("Successfully changed the rank request review channel to to <#" + args[2] + ">.")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})

            case "ranksub":
            if(!args[2]||isNaN(args[2])) {
                return message.channel.send(embeds.error("Invalid Syntax\n`" + config.prefix + "settings ranksub <channelID>`")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
            config.RankSub = args[2];
            fs.writeFile(__dirname + "/../Configs/" + id + ".json", JSON.stringify(config), (err) => {});
            return message.channel.send(embeds.success("Successfully changed the rank request channel to to <#" + args[2] + ">.")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})

            case "logs":
            if(!args[2]||isNaN(args[2])) {
                return message.channel.send(embeds.error("Invalid Syntax\n`" + config.prefix + "settings logs <channelID>`")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
            config.LogsChannel = args[2];
            fs.writeFile(__dirname + "/../Configs/" + id + ".json", JSON.stringify(config), (err) => {});
            return message.channel.send(embeds.success("Successfully changed the log channel to to <#" + args[2] + ">.")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            
            case "mute":
            if(!args[2]||isNaN(args[2])) {
                return message.channel.send(embeds.error("Invalid Syntax\n`" + config.prefix + "settings mute <roleID>`")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
            }
            config.MuteRole = args[2];
            fs.writeFile(__dirname + "/../Configs/" + id + ".json", JSON.stringify(config), (err) => {});
            return message.channel.send(embeds.success("Successfully changed the mute role to <@&" + args[2] + ">.")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
        }
        
        }
        else {
            return message.channel.send(embeds.error("You don't have permission to change values")).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
        }
    }  
}