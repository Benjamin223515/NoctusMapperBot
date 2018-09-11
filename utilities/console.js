const dt = require("./datetime.js");
const fs = require("fs");

this.log = function (a) {
    console.log("[LOG](" + dt.getDateTime() + ") " + a);
    fs.appendFileSync("./Logs/" + dt.getDateFILE() + '.txt', "[LOG](" + dt.getDateTime() + ") " + a + "\n");
}

this.error = function (a) {
    console.error("[ERROR](" + dt.getDateTime() + ") An error occured! the error has been logged.");
    fs.appendFileSync("./Errors/" + Date.now() + '.txt', "[ERROR](" + dt.getDateTime() + ") " + a + "\n");
    fs.appendFileSync("./Logs/" + dt.getDateFILE() + '.txt', "[ERROR](" + dt.getDateTime() + ") " + a + "\n");
    console.log(a)
}