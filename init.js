const fs = require("fs");
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

console.log("+----------[ INITIALIZATION ]----------+")
console.log("|                                      |")
console.log("| Bot developed by  Fubbo#0487 for use |")
console.log("| of NoctusMC Network, It's management |")
console.log("|   team and personal  use of Fubbo.   |")
console.log("|  Any unauthorised use of the bot is  |")
console.log("|  strictly forbidden under the terms  |")
console.log("| of the AxiusDesigns Software License |")
console.log("|    which is stated clearly in the    |")
console.log("|   License file located in the main   |")
console.log("|  directory in which this initialize  |")
console.log("| is found. By continuing this process |")
console.log("|      You agree to  these terms.      |")
console.log("|                                      |")
console.log("|         TYPE \"YES\" to agree          |")
console.log("|          TYPE \"NO\" to exit           |")
console.log("|                                      |")
console.log("+--------------------------------------+")

var section = 1

rl.on('line', line => {
    //LICENSE AGREEMENT
    if(section == 1) {
        if(line.toLowerCase() == "yes") return run();
        else if(line.toLowerCase() == "no") return process.exit();
        console.log("-> \"" + line + "\" Isn't a valid entry for this section of the Initialization")
    }
    
    //CREATE FOLDERS
    if(section == 2) {
        if(line.toLowerCase() == "done") files();
        else console.log("-> \"" + line + "\" Isn't a valid entry for this section of the Initialization")
    }

    if(section == 3) {
        if(line) process.exit();
    }
})

function run() {
    console.log("= AGREED")
    section = 0;

    //config
    if(fs.existsSync("./config.json")) {
        console.log("[INIT] Config file already exists.. ignoring.")
    }
    else
    {
        var conf = '{\n"token":"NDg5MTU4OTY1NjcwOTY5MzQ0.DnmtRA.NFbbk3xtyaIA7qo1qgsQerV1MQQ",\n"ServerID":"485972909567901706"\n}'
        console.log("[INIT] Defined config defaults")
        fs.appendFileSync("config.json", conf, err => {
            if(err) log.error(err.toString());
        } );
    }
    

    console.log("[CONT] Edit the config values. Type \"DONE\" when completed.")
    section = 2
}

function files() {
    console.log("= CONTINUING")
    section = 0

    //Tickets folder
    console.log("[INIT] Checking if Tickets folder exists..")
    if(!fs.existsSync("./Tickets")) {
        fs.mkdir("./Tickets", e => {if(e) console.log(e)})
        console.log("[INIT] Folder doesn't exist. Created tickets folder.")
    }
    else console.log("[INIT] Folder exists. Ignoring.")

    //Per-Server configs folder
    console.log("[INIT] Checking if Configs folder exists..")
    if(!fs.existsSync("./Configs")) {
        fs.mkdir("./Configs", e => {if(e) console.log(e)})
        console.log("[INIT] Folder doesn't exist. Created configs folder.")
    }
    else console.log("[INIT] Folder exists. Ignoring.")

    //Logs folder
    console.log("[INIT] Checking if Logs folder exists..")
    if(!fs.existsSync("./Logs")) {
        fs.mkdir("./Logs", e => {if(e) console.log(e)})
        console.log("[INIT] Folder doesn't exist. Created logs folder.")
    }
    else console.log("[INIT] Folder exists. Ignoring.")

    //Errors folder
    console.log("[INIT] Checking if Errors folder exists..")
    if(!fs.existsSync("./Errors")) {
        fs.mkdir("./Errors", e => {if(e) console.log(e)})
        console.log("[INIT] Folder doesn't exist. Created errors folder.")
    }
    else console.log("[INIT] Folder exists. Ignoring.")

    //Commands folder
    console.log("[INIT] Checking if Commands folder exists..")
    if(!fs.existsSync("./Commands")) {
        fs.mkdir("./Commands", e => {if(e) console.log(e)})
        console.log("[INIT] Folder doesn't exist. Created commands folder.")
    }
    else console.log("[INIT] Folder exists. Ignoring.")

    section = 3
    console.log("+----------[ INITIALIZATION COMPLETE ]----------+")
    console.log("|                                               |")
    console.log("| The initialization of the bot has completed.. |")
    console.log("| Please run the Main.js file to complete setup |")
    console.log("|                                               |")
    console.log("+-----------------------------------------------+")
}