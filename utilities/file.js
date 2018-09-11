//imports
const fs = require("fs");

//functions
this.startup_file = function (path) {
    if(!fs.existsSync(path)) fs.appendFileSync(path, '{}', err => {
        if(err) log.error(err.toString());
    } );
}

this.saveData = function (path, array) {
    fs.writeFile(path, JSON.stringify(array), (err) => {
      if (err) log.error(err.toString());
    });
  };