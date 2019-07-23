const TREATMENTS_DELIMITER = "*TREATMENTS";
const CULTIVARS_DELIMITER = "*CULTIVARS";
const START_TREATMENT_NAME_INDEX = 9;
const END_TREATMENT_NAME_INDEX = 30;
const START_TREATMENT_NUM_INDEX = 0;
const END_TREATMENT_NUM_INDEX = 3;
const BLANK = "";

class Treatments {
    constructor(fs){
        this._fs = fs;
    }

    getRotation(line) {
      return line.substring(3, 5).trim();
    }

    getAll(globalBasePath, crop, delimiterPath, experiments) {
        let treatments = [];

        try {
          for (let i = 0; i < experiments.length; i++) {
            let filePath = globalBasePath + crop + delimiterPath + experiments[i];
            let data = this._fs.readFileSync(filePath);
            let content = data.toString();
            let str = content.substring(content.indexOf(TREATMENTS_DELIMITER), content.indexOf(CULTIVARS_DELIMITER));
            let lines = str.split(/[\r\n]+/g);
      
            for (let j = 2; j < lines.length; j++) {
              let treatment = lines[j].substring(START_TREATMENT_NAME_INDEX, END_TREATMENT_NAME_INDEX).trim();
              if (treatment !== BLANK) {
                let trtNo = lines[j].substring(START_TREATMENT_NUM_INDEX, END_TREATMENT_NUM_INDEX).trim();
                let experiment = experiments[i];
                let rotation = getRotation(lines[j]);
      
                let obj = { treatment: treatment, trtNo: trtNo, experiment: experiment, rotationNumber: rotation };
      
                treatments.push(obj);
              }
            }
          }
        } catch (error) {
          console.log(error)
        } finally {
          return treatments;
        }       
    }
}

module.exports = Treatments;