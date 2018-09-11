const Discord = require("discord.js");

this.error = function (a) {
    let embed = new Discord.RichEmbed()
        .setTitle("An error occured")
        .setColor("#f442c2")
        .setDescription(a)
        .setTimestamp(new Date())
    
    return embed;
}

this.success = function (a) {
    let embed = new Discord.RichEmbed()
        .setTitle("Success!")
        .setColor("#f442c2")
        .setDescription(a)
        .setTimestamp(new Date())
    
    return embed;
}

this.build = function (title, description) {
    let embed = new Discord.RichEmbed()
        .setTitle(title)
        .setColor("#f442c2")
        .setDescription(description)
        .setTimestamp(new Date())
    
    return embed;
}

this.addField = function (embed, title, value, inline) {
    let emb = new Discord.RichEmbed(embed)
        .addField(title, value, inline);

    return emb;
}