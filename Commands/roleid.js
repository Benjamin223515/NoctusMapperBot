const fs = require('fs');
const utils = require(__dirname + "/../utilities/utilsmain.js")
const _delay = 10000;

exports.run = (client, message, args) => {
    message.mentions.roles.forEach(a => {
        return message.channel.send(utils.embeds.success(`ID for "${a.name}": \`${a.id}\``)).then(a => {setTimeout(() => {a.delete()}, _delay)}).catch(b => {log.error(b)})
    })
}