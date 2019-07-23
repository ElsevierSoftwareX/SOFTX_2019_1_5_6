const OUT_FILE_EXTENSION = "X";
const EXCEPTION_MESSAGE = "Error to build the tree: ";

class Tree {
    constructor(fs, globalBasePath) {
        this._fs = fs;
        this._globalBasePath = globalBasePath;
    }

    /**
     * Checks if a file is a DSSAT experiment file.
     * @param {string} file full file name, including extesion.
     * @return {string} file name.
    */
    experimentFile(file) {
        if (file.endsWith(OUT_FILE_EXTENSION)) return file;
        else return null;
    }
    /**
     * Get all folder that have experiments files in it's content.
     * @return {Array} Returns a tree with folder name and file names.
    */
    loadTree() {
        let tree = [];
        try {
            let dssatFolders = this._fs.readdirSync(this._globalBasePath);

            for (let i = 0; i < dssatFolders.length; i++) {
                let fullPath = this._globalBasePath + dssatFolders[i];
                let stats = this._fs.statSync(fullPath);

                if (stats.isDirectory()) {
                    let fullPathContent = this._fs.readdirSync(fullPath);

                    // Get all folders that contains file extesion 'x'
                    let containsXFile = fullPathContent.some(this.experimentFile);

                    if (containsXFile) {
                        let model = { path: "", files: [] };
                        model.path = dssatFolders[i];

                        for (let j = 0; j < fullPathContent.length; j++) {
                            if (fullPathContent[j].endsWith(OUT_FILE_EXTENSION)) {
                                model.files.push(fullPathContent[j]);
                            }
                        }
                        tree.push(model);
                    }
                }
            }
        } catch (error) {
            console.log(EXCEPTION_MESSAGE + error);
        } finally {
            return tree;
        }
    }
}

module.exports = Tree;