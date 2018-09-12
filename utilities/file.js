//imports
const fs = require("fs");

//functions
this.startup_file = function (path, conf) {
    if(conf) {
        if(!fs.existsSync(path)) fs.appendFileSync(path, conf, err => {
        if(err) log.error(err.toString());
    } );
    }
    else {
        if(!fs.existsSync(path)) fs.appendFileSync(path, '{}', err => {
        if(err) log.error(err.toString());
    } );
    }
}

this.saveData = function (path, array) {
    fs.writeFile(path, JSON.stringify(array), (err) => {
      if (err) log.error(err.toString());
    });
  };