
const CDE_FILE = "DATA.CDE";
const IGNORED_CHARS = ['*', '!', ' ', '@'];

class CDE {
    constructor(fs, globalBasePath) {
        this._fs = fs;
        this._globalBasePath = globalBasePath;
    }

    load() {
       let cdeFile = this._globalBasePath + CDE_FILE;
       let data = this._fs.readFileSync(cdeFile);

       let fileLines = data.toString().split('\n');
       let dataCde = [];

       for (let i = 0; i < fileLines.length; i++) {
           let ignored = IGNORED_CHARS.forEach((searchString) => { return fileLines[i].startsWith(searchString) });
          
           if (ignored || fileLines[i].length === 0 || fileLines[i] === "") {
               continue;
           }
           let cdeModel = {};
           cdeModel.cde = fileLines[i].substr(0, 6);
           cdeModel.label = fileLines[i].substr(7, 16);
           cdeModel.description = fileLines[i].substr(22, 57);

           dataCde.push(cdeModel);
       }
       return dataCde;

       /*this._fs.readFile(cdeFile, 'utf-8', function (err, data) {
            let fileLines = data.toString().split('\n');
            let dataCde = [];

            for (let i = 0; i < fileLines.length; i++) {
                let ignored = IGNORED_CHARS.forEach((searchString) => { return fileLines[i].startsWith(searchString) });
                console.log(ignored);
                if (ignored || fileLines[i].length === 0 || fileLines[i] === "") {
                    continue;
                }
                let cdeModel = {};
                cdeModel.cde = fileLines[i].substr(0, 6);
                cdeModel.label = fileLines[i].substr(7, 16);
                cdeModel.description = fileLines[i].substr(22, 57);

                dataCde.push(cdeModel);
            }
            return dataCde;
        });*/
    }
}

module.exports = CDE;