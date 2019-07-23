// jdssat.js

"use strict";

var fs = require('fs');
var operationSystem = require('os');
const { exec } = require('child_process');
var macopen = require('mac-open');

var Configuration = require('./source/configuration', true);
var CDE = require('./source/cde');
var Tree = require('./source/tree');
var Experiments = require('./source/experiments');
var Output = require('./source/output');
var Treatments = require('./source/treatments');
var Simulation = require('./source/simulation');
var config = require('./source/config');

String.prototype.format = function () {
  var formatted = this;
  for (var i = 0; i < arguments.length; i++) {
    var regexp = new RegExp('\\{' + i + '\\}', 'gi');
    formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};

Array.prototype.clean = function (deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

// Keep DSSAT base path
var globalBasePath;
var delimiterPath;
var dataCde = [];
var outputCdeObj = [];
var dssatPro = [];
var platformConfig;
var latestVersion;

// Main functions
class jdssat {

  constructor() { }

  // This function load all global variables that will be used in all functions of the dssat.js
  initialize() {
    try {
      let platform = operationSystem.platform();
      platformConfig = config.environmentVariables(platform);
      latestVersion = this.preferredVersion();

      console.log('dssat initialize plataform:{0} and version:{1}'.format(platform, latestVersion));

      globalBasePath = "{0}{1}/".format(platformConfig.path, latestVersion);

      let configuration = new Configuration(fs, globalBasePath);
      let cde = new CDE(fs, globalBasePath);

      if (platform === "win32" || platform === "browser") {
        delimiterPath = "//";
        dssatPro = configuration.profile();
      } else {
        delimiterPath = "/";
      }

      dataCde = cde.load();

      this.outputCde();
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }

  preferredVersion() {
    try {
      let dssatVersions = config.versions();
      for (let i = 0; i < dssatVersions.length; i++) {
        let directory = platformConfig.path + dssatVersions[i];
        try {
          let stats = fs.statSync(directory);

          if (stats.isDirectory()) {
            return dssatVersions[i];
          }
        } catch (error) {
          console.log(error);    
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  openExternalTool(tool) {
    let fullPath = globalBasePath + platformConfig.tools + tool;

    exec(fullPath, function (err, data) {
      console.log(err)
      console.log(data.toString());
    });
  }

  tree() {
    let tree = new Tree(fs, globalBasePath);
    return tree.loadTree();
  }

  experiments(crop) {
    let experiments = new Experiments(fs);
    return experiments.getAll(globalBasePath, crop);
  }

  experimentDescription(filePath) {
    let experiments = new Experiments(fs);
    return experiments.description(filePath);
  }

  treatments(crop, experiments) {
    let treatments = new Treatments(fs);
    return treatments.getAll(globalBasePath, crop, delimiterPath, experiments);
  }

  runSimulation(crop, experiments, callback) {
    let simulation = new Simulation(fs, exec, globalBasePath, delimiterPath);
    simulation.run(crop, experiments, callback);
  }

  outFiles(cropSelected) {
    let output = new Output(fs);
    return output.getOutFiles(globalBasePath, delimiterPath, cropSelected);
  }

  notEmptyString(value) {
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== " " && value[i]) return true;
    }
    return false;
  }

  readOutFile(crop, outFile) {
    let output = new Output(fs);
    return output.read(globalBasePath, crop, outFile);
  }

  getObservedDataFileExt(ext) {
    let extesionFileParts = ext.split('.');
    let extesion = extesionFileParts[1].slice(0, -1) + 't';
    return extesion.toUpperCase();
  }

  observedData(crop, experiment) {
    try {
      let result = [];
      let headers = [];

      // Get file extension for observed data
      let file = dssatPro.find(item => item.type === crop);
      let pathExtension = getObservedDataFileExt(file.extension);

      let path = globalBasePath + crop + '\\' + experiment + '.' + pathExtension;
      let data = fs.readFileSync(path);

      let lines = data.toString().split(/[\r\n]+/g);

      for (let i = 0; i <= lines.length; i++) {
        if (lines[i] !== undefined && lines[i].startsWith('@TRNO')) {
          headers = [];
          let arrayHeaders = lines[i].split(" ");
          arrayHeaders.clean("");

          for (let j = 0; j < arrayHeaders.length; j++) {
            headers.push(arrayHeaders[j]);
          }
          continue;
        }

        if (lines[i] !== undefined && lines[i].startsWith(" ") && notEmptyString(lines[i]) && lines[i] !== "*EXP" && lines[i] !== "!") {
          let observedValuesArray = lines[i].split(" ");
          observedValuesArray.clean("");
          let index = 0;
          for (let k = 0; k < observedValuesArray.length; k++) {
            if (observedValuesArray[k] !== "") {
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
      console.log(error);
    }
  }

  getVariablesFromOutFile(crop, fileName) {
    let outfile = globalBasePath + crop + "//" + fileName;

    let data = fs.readFileSync(outfile);
    console.log("Synchronous read: " + data.toString());

  }

  cde() {
    return dataCde;
  }

  openDssatFolder() {
    if (platformConfig.platform === "darwin") {
      macopen(globalBasePath, { a: "Finder" }, function (error) {
        console.log(error);
      });
    } else {
      exec('start "" ' + globalBasePath + '');
    }
  }

  openFileInEditor(crop, fileName) {
    let filePath = globalBasePath + crop + "//" + fileName;

    if (platformConfig.platform === "darwin") {
      macopen(filePath, { a: "TextEdit" }, function (error) {
        console.log(error);
      });
    } else {
      let command = `start notepad ${filePath}`;
      exec(command, function (err) {
        if (err) {
          alert("[openFileInEditor] error: " + err);
        } else {
          console.log("open file: " + filePath);
        }
      });
    }
  }

  getDataFiles(crop) {
    let path = globalBasePath + crop;
    console.log('getting data files from ' + path);
    let cropFolderContent = fs.readdirSync(path);
    let dataFiles = [];

    try {
      for (let i = 0; i < cropFolderContent.length; i++) {

        let fileName = cropFolderContent[i];

        if ((fileName.endsWith('A') || fileName.endsWith('T')) && !fileName.endsWith('.OUT')) {
          dataFiles.push(fileName);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      return dataFiles;
    }
  }

  folders() {
    let allfolders = [];

    try {
      let dssatFolders = fs.readdirSync(globalBasePath);

      for (let i = 0; i < dssatFolders.length; i++) {
        let fullPath = globalBasePath + dssatFolders[i];
        let stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          allfolders.push(dssatFolders[i]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      return allfolders;
    }
  }

  path() {
    return globalBasePath;
  }

  filePreview(crop, fileName) {
    try {
      let path = globalBasePath + crop + "//" + fileName;
      let data = fs.readFileSync(path, 'utf8');

      return data;

    } catch (error) {
      console.log("not able to read file content. Error: " + error);
    }
  }

  version() {
    return this.preferredVersion();
  }

  platform() {
    return operationSystem.platform();;
  }

  batchCommand() {
    return `${globalBasePath}DSCSM047.EXE CSCER047 B DSSBatch.v47`;
  }

  runBatchFile(crop) {
    let cmd = `cd ${globalBasePath}${delimiterPath}${crop} && ${globalBasePath}${delimiterPath}DSCSM047.EXE CSCER047 B DSSBatch.v47`;

    exec(cmd, function (err) {
      if (err) {
        console.log("[runSimulation] error: " + err);
      } else {
        console.log('Batch file ran successfully!');
      }
    });
  }

  isOutFileSupportForPlot(outFile) {
    return config.supportOutFiles(outFile);
  }

  outputCde() {
    let path = globalBasePath + 'OUTPUT.CDE';
    let cde = fs.readFileSync(path);

    let fileLines = cde.toString().split('\n');

    for (let i = 0; i < fileLines.length; i++) {
      if (fileLines[i].includes('.OUT')) {

        let fileName = fileLines[i].substring(0, 16).trim();
        let description = fileLines[i].substring(19, 70).trim();

        let obj = { "file": fileName, "description": description };

        outputCdeObj.push(obj);
      }
    }
  }

  outputFileDescription(fileName) {
    let file = outputCdeObj.find(out => out.file === fileName);
    if (file != null) {
      return file.description;
    }
    return "";
  }
  
  
  // added by Alex
  treatmentsData(folder, experiments) {
    let xfile = new Xfile(fs);
    return xfile.getTreatments(globalBasePath, folder, delimiterPath, experiments);
  }
  
  cultivarsData(folder, experiments) {
    let xfile = new Xfile(fs);
    return xfile.getCultivars(globalBasePath, folder, delimiterPath, experiments);
  }
  
  fertilizersData(folder, experiments) {
    let xfile = new Xfile(fs);
    return xfile.getFertilizers(globalBasePath, folder, delimiterPath, experiments);
  }
  
  tillageData(folder, experiments) {
    let xfile = new Xfile(fs);
    return xfile.getTillage(globalBasePath, folder, delimiterPath, experiments);
  }
  
  plantingData(folder, experiments) {
    let xfile = new Xfile(fs);
    return xfile.getPlantingDetails(globalBasePath, folder, delimiterPath, experiments);
  }
  
  harvestData(folder, experiments) {
    let xfile = new Xfile(fs);
    return xfile.getHarvestDetails(globalBasePath, folder, delimiterPath, experiments);
  }
  
  initialConditions(folder, experiments) {
    let xfile = new Xfile(fs);
    return xfile.getInitialConditions(globalBasePath, folder, delimiterPath, experiments);
  }
  
  initialConditionsProfile(folder, experiments) {
    let xfile = new Xfile(fs);
    return xfile.getInitialConditionsProfile(globalBasePath, folder, delimiterPath, experiments);
  }
  
  irrigation(folder, experiments) {
    let xfile = new Xfile(fs);
    return xfile.getIrrigation(globalBasePath, folder, delimiterPath, experiments);
  }
  
  cultivarsCrop(folder, crop) {
    let xfile = new Xfile(fs);
    return xfile.getCultivarsCrop(globalBasePath, folder, delimiterPath, crop);
  }
  
  tillageImplement() {
    let xfile = new Xfile(fs);
    return xfile.getTillageImplement(globalBasePath, delimiterPath, 'DETAIL.CDE');
  }
  
  fertilizersMaterial() {
    let xfile = new Xfile(fs);
    return xfile.getFertilizerMaterial(globalBasePath, delimiterPath, 'DETAIL.CDE');
  }
  
  fertilizersApplications() {
    let xfile = new Xfile(fs);
    return xfile.getFertilizerApplications(globalBasePath, delimiterPath, 'DETAIL.CDE');
  }
  
  plantingMethods() {
    let xfile = new Xfile(fs);
    return xfile.getPlantingMethods(globalBasePath, delimiterPath, 'DETAIL.CDE');
  }
  
  plantingDistribution() {
    let xfile = new Xfile(fs);
    return xfile.getPlantingDistribution(globalBasePath, delimiterPath, 'DETAIL.CDE');
  }
  
  harvestComponents() {
    let xfile = new Xfile(fs);
    return xfile.getHarvestComponents(globalBasePath, delimiterPath, 'DETAIL.CDE');
  }
  
  harvestSizeCategories() {
    let xfile = new Xfile(fs);
    return xfile.getHarvestSizeCategories(globalBasePath, delimiterPath, 'DETAIL.CDE');
  }
  
  irrigationMethods() {
    let xfile = new Xfile(fs);
    return xfile.getIrrigationMethods(globalBasePath, delimiterPath, 'DETAIL.CDE');
  }
  
  crops(returnType) {
    let xfile = new Xfile(fs);
    return xfile.getCrops(globalBasePath, delimiterPath, 'DETAIL.CDE', returnType);
  }
  
  makeCmb(dataArray, val){
	let xfile = new Xfile(fs);
    return xfile.makeCmb(dataArray, val);	
  }
  
  valToInput(val){
	let xfile = new Xfile(fs);
    return xfile.valToInput(val);	
  }
  
}

module.exports = jdssat;