var environment = [
    { "platform": "win32", "path": "c:/", "tools": "Tools/" }, // windows
    { "platform": "linux", "path": "/", "tools": "Tools/" }, // linux
    { "platform": "darwin", "path": "/", "tools": "Tools/" }, // mac
    { "platform": "browser", "path": "c:/", "tools": "Tools/" } // browser
];

var dssatPro = [
    { "version": "DSSAT47", "dssatPro": "DSSATPRO.V47" },
    { "version": "DSSAT46", "dssatPro": "DSSATPRO.v46" }
];

var supportOutFilesData = ["PlantGro.OUT", "SoilNi.OUT", "SoilNiBal.OUT", "PlantN.OUT", "PlantGrf.OUT", "SoilTemp.OUT", "SoilWat.OUT", "Weather.OUT"];

// Update DSSAT version descending, because the function that decides which dssat version to use get the latest dssat version 
// for instance, if DSSAT47 is found on user's file system, the preferredVersion function ends loop
var dssatVersions = ["DSSAT47", "DSSAT46"];

exports.environmentVariables = function (platform) {
    return environment.find(env => env.platform === platform);
};

exports.profile = function(version) {
    return dssatPro.find(pro => pro.version === version);
};

exports.versions = function () {
    return dssatVersions;
};

exports.supportOutFiles = function (file) {
    for (let i = 0; i < supportOutFilesData.length; i++) {
        if (supportOutFilesData[i].trim() === file.trim()) {
            return true;
        }
    }
    return false;
}