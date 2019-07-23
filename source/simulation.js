var StringUtils = require('./string-utils');

class Simulation {

    constructor(fs, exec, globalBasePath, delimiterPath) {
        this._fs = fs;
        this._exec = exec;
        this._globalBasePath = globalBasePath;
        this._delimiterPath = delimiterPath;
        this._stringUtils = new StringUtils();
    }

    createBashFile(crop, directory, experiment, experiments) {
        let content = `$BATCH(${crop})` + '\r\n' +
            "!" + '\r\n' +
            `! Directory    : ${directory}` + '\r\n' +
            "! Command Line : C:\\DSSAT47\\DSCSM047.EXE CSCER047 B DSSBatch.v47" + '\r\n' +
            `! Crop         : ${crop}     ` + '\r\n' +
            `! Experiment   : ${experiment}` + '\r\n' +
            "! ExpNo        : 1" + '\r\n' +
            "! Debug        : C:\\DSSAT47\\DSCSM047.EXE CSCER047 \" B DSSBatch.v47\"" + '\r\n' +
            "!" + '\r\n' +
            "@FILEX                                                                                        TRTNO     RP     SQ     OP     CO" + '\r\n';

        for (let i = 0; i < experiments.length; i++) {
            let customString = "                                                                                                                                ";
            customString = this._stringUtils.insert(customString, `${this._globalBasePath}${this._delimiterPath}${crop}${this._delimiterPath}${experiments[i].experiment}`, 0);
            customString = this._stringUtils.insert(customString, `${experiments[i].trtNo}`, 98);
            customString = this._stringUtils.insert(customString, "1", 105);
            customString = this._stringUtils.insert(customString, "0", 112);
            customString = this._stringUtils.insert(customString, "0", 119);
            customString = this._stringUtils.insert(customString, "0", 126);

            content += customString + "\r\n";
        }

        return content;
    }

    run(crop, experiments, callback) {
        let directory = this._globalBasePath + crop;

        // todo: remove hardcoded dssat version
        let fullBatchPath = this._globalBasePath + crop + '/DSSBatch.v47';

        // Get first experiment of the list, just like currect DSSAT shell does
        let experiment = experiments !== null ? experiments[0].experiment : "";

        let existsBatchFile = this._fs.existsSync(fullBatchPath);

        if (existsBatchFile) {
            this._fs.unlink(fullBatchPath, function (err) {
                if (err) throw err;
                console.log(fullBatchPath + ' File deleted!');
            });
        }

        let content = this.createBashFile(crop, directory, experiment, experiments);

        let basePath = this._globalBasePath;
        let delimiter = this._delimiterPath;
        let exec = this._exec;

        this._fs.appendFile(fullBatchPath, content, function (err) {
            if (err) {
                callback(false, err);
            } else {
                console.log('DSSBatch.v47 file created!');

                let cmd = `cd ${basePath}${delimiter}${crop} && ${basePath}${delimiter}DSCSM047.EXE CSCER047 B DSSBatch.v47`;

                exec(cmd, function (err) {
                    if (err) {
                        callback(false, err);
                    } else {
                        console.log('Command for simulation ran successfully');
                        callback(true, null);
                    }
                });
            }
        });
    }

}

module.exports = Simulation;