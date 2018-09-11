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
    var conf = '{\n"token":"CHANGEME",\n"ServerIDs":[\n{"ServerID":"485972909567901706"},\n{"RetrieveID":"208947453024534528"}\n]\n,"prefix":"."\n}'
    console.log("[INIT] Defined config defaults")
    fs.appendFileSync("config.json", conf, err => {
        if(err) log.error(err.toString());
    } );

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
    section = 3
    console.log("+----------[ INITIALIZATION COMPLETE ]----------+")
    console.log("|                                               |")
    console.log("| The initialization of the bot has completed.. |")
    console.log("| Please run the Main.js file to complete setup |")
    console.log("|                                               |")
    console.log("+-----------------------------------------------+")
}