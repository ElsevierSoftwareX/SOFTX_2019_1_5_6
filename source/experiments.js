const EXPERIMENT_IDENTIFIER = "*EXP.DETAILS:";
const EXPERIMENT_EXT = 'X';
const ERROR_MESSAGE = "not able to retrieve experiments: ";

String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

class Experiments {
    constructor(fs) {
        this._fs = fs;
    }

    model(number, name, description, modified) {
        let experiment = {};
        experiment.number = number;
        experiment.name = name;
        experiment.description = description;
        experiment.modified = modified;
        return experiment;
      }

    description(filePath) {
        let data = this._fs.readFileSync(filePath);

        let fileLines = data.toString().split('\n');

        for (let i = 0; i < fileLines.length; i++) {
            if (fileLines[i].includes(EXPERIMENT_IDENTIFIER)) {
                return fileLines[i].replace(EXPERIMENT_IDENTIFIER, '');
            }
        }
    }

    getAll(dssatPath, crop) {
        let fullPath = dssatPath + crop;
        let cropFolderContent = this._fs.readdirSync(fullPath);
        let experiments = [];
        let number = 1;

        try {
            for (let i = 0; i < cropFolderContent.length; i++) {
                let isFileX = cropFolderContent[i].endsWith(EXPERIMENT_EXT);

                if (isFileX) {
                    let filePath = '{0}/{1}'.format(fullPath, cropFolderContent[i]);
                    let fileStats = this._fs.statSync(filePath);
                    let description = this.description(filePath);
                    let experiment = this.model(number, cropFolderContent[i], description, fileStats.mtime);
                    experiments.push(experiment);
                    number++;
                }
            }
        } catch (error) {
            console.log(ERROR_MESSAGE + error);
        } finally {
            return experiments;
        }
    }
}

module.exports = Experiments;