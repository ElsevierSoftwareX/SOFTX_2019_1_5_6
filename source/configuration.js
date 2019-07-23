const DSSAT_PRO_FILE = "DSSATPRO.TXT";
const FILE_TYPE = 'File type';
const FILE_EXT = 'File ext.';
const STRING_EMTPY = "";

class Configuration {
    constructor(fs, globalBasePath) {
        this._fs = fs;
        this._globalBasePath = globalBasePath;
    }

    profileModel(type, extension){
        let obj = {};
        obj.type = type;
        obj.extension = extension;
    
        return obj;
    }

    profile() {
        let filePath = this._globalBasePath + DSSAT_PRO_FILE;
        let dssatProResult = [];
        let dssatPro = this._fs.readFileSync(filePath);
        let fileLines = dssatPro.toString().split('\n');
        let fileType = STRING_EMTPY;

        for (let i = 0; i < fileLines.length; i++) {
            if (fileLines[i].includes(FILE_TYPE)) {
                fileType = fileLines[i].substring(14, fileLines[i].length).trim();
            } else if (fileLines[i].includes(FILE_EXT)) {
                let ext = fileLines[i].substring(14, fileLines[i].length).trim();
                let obj = this.profileModel(fileType, ext);
                dssatProResult.push(obj);
            }
        }
        return dssatProResult;
    }
}

module.exports = Configuration;