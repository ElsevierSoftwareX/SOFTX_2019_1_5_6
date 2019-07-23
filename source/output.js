const OUTPUT_FILE_EXT = '.OUT';
const TREATMENT_DELIMITER = 'TREATMENT';
const MODEL_DELIMITER = 'MODEL';
const EXPERIMENT_DELIMITER = 'EXPERIMENT';
const DATA_PATH_DELIMITER = 'DATA PATH';
const START_HEADER_DELIMITER = '@';
const BLANK_SPACE_DELIMITER = " ";
const EMPTY_DELIMITER = "";

class Output {
    constructor(fs) {
        this._fs = fs;
    }

    notEmptyString(value) {
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== " " && value[i]) return true;
      }
      return false;
    }

    getOutFiles(globalBasePath, delimiterPath, cropSelected) {
        let path = globalBasePath + delimiterPath + cropSelected;
        let cropFolderContent = this._fs.readdirSync(path);
        let outFiles = [];
        try {
            for (let i = 0; i < cropFolderContent.length; i++) {
                let isOutFile = cropFolderContent[i].endsWith(OUTPUT_FILE_EXT);

                if (isOutFile) {
                    outFiles.push(cropFolderContent[i]);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            return outFiles;
        }
    }
    
    read(globalBasePath, crop, outFile) {
        let path = globalBasePath + crop + "//" + outFile;
        let data = this._fs.readFileSync(path);
        let lines = data.toString().split(/[\r\n]+/g);
        let headers = [];
        let experiments = [];
        let result = [];
        let experiment = "";
        let treatmentDescription = "";
    
        for (let i = 0; i <= lines.length; i++) {
          // get last treatment
          if (i == lines.length) {
            break;
          }
    
          if (lines[i].startsWith(' EXPERIMENT')) {
            experiment = lines[i].substring(18, lines[i].length).split(' ')[0];
          }
    
          if (lines[i].startsWith(' TREATMENT')) {
            let run = lines[i].split(':');
    
            let treatmentNumber = run[0];
            treatmentDescription = run[1];
    
            // Get treatment number only
            let treatment = treatmentNumber.toString().replace(TREATMENT_DELIMITER, EMPTY_DELIMITER).trim();
    
            let hasTreatment = result.find(item => item.run === treatmentDescription.toString().trim());
    
            if (hasTreatment === 'undefined' || !hasTreatment) {
              let model = { run: treatmentDescription.toString().trim(), experiment: experiment, treatmentNumber: treatment, values: [] };
              result.push(model);
            }
            // clean up header to the next round
            experiments = [];
    
            treatment = treatmentNumber;
            continue;
          }
    
          if (lines[i].startsWith(START_HEADER_DELIMITER)) {
            // clean up header to the next round
            headers = [];
    
            let arrayHeaders = lines[i].split(BLANK_SPACE_DELIMITER);
    
            for (let j = 0; j < arrayHeaders.length; j++) {
              if (arrayHeaders[j] !== EMPTY_DELIMITER) {
                headers.push(arrayHeaders[j]);
              }
            }
            continue;
          }
    
          // check if line start with space and isn't empty line
          if (lines[i].startsWith(BLANK_SPACE_DELIMITER) &&
            this.notEmptyString(lines[i]) &&
            !lines[i].includes(MODEL_DELIMITER) &&
            !lines[i].includes(EXPERIMENT_DELIMITER) &&
            !lines[i].includes(DATA_PATH_DELIMITER) &&
            !lines[i].includes(TREATMENT_DELIMITER)) {
            // remove firt space from lines
            let simulationValues = lines[i].substring(1, lines[i].length);
            let simulationValuesArray = simulationValues.split(BLANK_SPACE_DELIMITER);
    
            // variable used to keep an index to retrieve the header from headers array
            let index = 0;
    
            for (let k = 0; k < simulationValuesArray.length; k++) {
              if (simulationValuesArray[k] !== EMPTY_DELIMITER) {
                let values = [simulationValuesArray[k]];
                let obj = { cde: headers[index], values: values };
                if (experiments[index] != undefined) {
                  experiments[index].values.push(simulationValuesArray[k]);
                } else {
                  experiments.push(obj);
                }
                index++;
              }
            }
    
            // add experiments to the array position results
            result[result.length - 1].values = experiments;
          }
        }
    
        return result;
    }
}

module.exports = Output;