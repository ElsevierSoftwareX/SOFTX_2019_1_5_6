const TREATEMTENT_IDENTIFIER = "@TRNO";
const EXP_IDENTIFIER = "*EXP";
const BLANCK_SPACE = " ";
const EMPTY_STRING = "";

const ERROR_MESSAGE = "not able to get observed content: ";

class ObservedData {

    constructor(fs, globalBasePath) {
        this._fs = fs;
        this._globalBasePath = globalBasePath;
    }
    getObservedDataFileExt(ext) {
        let extesionFileParts = ext.split('.');
        let extesion = extesionFileParts[1].slice(0, -1) + 't';
        return extesion.toUpperCase();
    }

    get(crop, experiment) {
        try {
            let result = [];
            let headers = [];

            // Get file extension for observed data
            let file = dssatPro.find(item => item.type === crop);
            let pathExtension = this.getObservedDataFileExt(file.extension);

            let path = this._globalBasePath + crop + '\\' + experiment + '.' + pathExtension;
            let data = this._fs.readFileSync(path);

            let lines = data.toString().split(/[\r\n]+/g);

            for (let i = 0; i <= lines.length; i++) {
                if (lines[i] !== undefined && lines[i].startsWith(TREATEMTENT_IDENTIFIER)) {
                    headers = [];
                    let arrayHeaders = lines[i].split(BLANCK_SPACE);
                    arrayHeaders.clean(EMPTY_STRING);

                    for (let j = 0; j < arrayHeaders.length; j++) {
                        headers.push(arrayHeaders[j]);
                    }
                    continue;
                }

                if (lines[i] !== undefined && lines[i].startsWith(BLANCK_SPACE) && notEmptyString(lines[i]) && lines[i] !== EXP_IDENTIFIER && lines[i] !== "!") {
                    let observedValuesArray = lines[i].split(BLANCK_SPACE);
                    observedValuesArray.clean(EMPTY_STRING);
                    let index = 0;
                    for (let k = 0; k < observedValuesArray.length; k++) {
                        if (observedValuesArray[k] !== EMPTY_STRING) {
                            let key = headers[index];
                            let valuesObj = {};
                            valuesObj.variable = key;
                            valuesObj.treatmentNumber = lines[i].substring(5, 7).trim();
                            valuesObj.value = observedValuesArray[k];
                            result.push(valuesObj);
                            index++;
                        }
                    }
                }
            }

            return result;
        } catch (error) {
            console.log(ERROR_MESSAGE + error);
        }
    }
}

module.exports = ObservedData;