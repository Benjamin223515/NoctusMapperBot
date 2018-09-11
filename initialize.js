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
console.log("| of the Agate license  2015 agreement |")
console.log("|    which is stated clearly in the    |")
console.log("| License.md file  located in the main |")
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
        if(line.toLowerCase() == "yes") run();
        else if(line.toLowerCase() == "no") process.exit();
        else console.log("-> \"" + line + "\" Isn't a valid entry for this section of the Initialization")
    }
    
})

function run() {
    console.log("AGREED")
    section = 2;
}
//var conf = '{' + '"token":"CHANGEME",'+ '"ServerIDs":[' + '{"ServerID":"CHANGEME"},' + '{"RetrieveID":"CHANGEME"}' + ']}'
//config
/*fs.writeFile("./Data/credit.json", JSON.parse(conf), (err) => {
    if (err) log.error(err.stack)
});*/