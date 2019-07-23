# jdssat

jdssat is a module for reading, writing and processing DSSAT-CSM files.

## jdssat usage

``` html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<script src="./node_modules/jdssat/jdssat.js"></script>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```

## Initializing jdssat.js 

There are few things that jdssat.js must be aware in order to work with the correct DSSAT version. On the initialization function, the library will look for the platform that is running,it could be darwin (macOS), linux (any linux distro) or win32 (windows). There is a node module https://nodejs.org/api/os.html used by jdssat.js to identify the plaform. Once the platform is retrieved a jdssatconfig.js will be used to load extra OS variables. 

Initialize function:

``` javascript
jdssat.initialize()
```

``` html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<script type="text/javascript" src="./node_modules/jdssat/jdssat.js"></script>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    jdssat.initialize();
  });
</script>
</body>
</html>
```

Note that on the example above we are not using any JavaScript framework, such jQuery, Angular, React, Vue, and etc. DSSAT.js play with all of them, it just matter how we initialize it:
<br />
<br />
jQuery style:

``` javascript
<script>
  $(document).ready(function (){
      jdssat.initialize();
  })
</script>
```

Once jdssat.js is initialized we`ll query one of the configuration objects depending on platform that has being used:

```json
{ "platform": "darwin", "path": "/", "dssatPro": "DSSATPRO.L{dssatVersion}", "tools": "Tools/" }
{ "platform": "win32", "path": "c:/", "dssatPro": "DSSATPRO.V47", "tools": "Tools/" }
```

With the configuration ready to use, then a global variable will be loaded to keep the global dssat base path, using the latest version installed on user`s machine. For instance:

* macOS
    * /DSSAT46/
    * /DSSAT47/ `latest`
* windows
    * c:/DSSAT46
    * c:/DSSAT47 `latest`


``` javascript
globalBasePath = "{0}{1}/".format(platform.path, latestVersion);
```

In case we have to load dssat from a different path, it must be specified on the initialize function: 

``` javascript

jdssat.initialize('path')

```
## Reading Experiments

The experiments function receives as input a crop name. 

``` javascript
let experiments = jdssat.experiments('Maize');
```

![treatments](/images/experiments_response.png?raw=true)

## Getting Data Files

The getDataFiles function receives as input a crop name and returns an array with all data files name

``` javascript
let dataFiles = jdssat.getDataFiles('Maize');
```

![data files](/images/data_files_response.png?raw=true)

## Reading Treatments

The treatments function receives as input an array containing experiments name. 

``` javascript
let experiments = ["IEBR8201.BAX", "MTBO7701.BAX"];
let treatments = jdssat.treatments(experiments);
```

![treatments](/images/treatments_response.png?raw=true)

## Running a simulation

To run a simulation you just have to use `runSimulation` function and send a crop and what are the experiments as input. 

<br />

See an example below:                 
                                   
``` javascript
let cropSelected = 'Maize';
let experimentsSelected = [];
let experimentObj = {'experiment': 'BRPI0202.MZX', 'treatment': 'AG9010 - Rainfed', 'trtNo': '1'};
experimentsSelected.push(experimentObj);

jdssat.runSimulation(cropSelected, experimentsSelected);

```

jdssat.js will create a Batch file at the backgroup and execute a command using a node module https://nodejs.org/api/child_process.html

## Creating a Batch File 

You also can call `createBashFile` function without having to run a simulation, it could be useful if you want to run your simulation via command line.

``` javascript
let crop = 'Maize';
let experiments = [];
let experimentObj = {'experiment': 'BRPI0202.MZX', 'treatment': 'AG9010 - Rainfed', 'trtNo': '1'};
experiments.push(experimentObj);

jdssat.createBashFile(crop, experiments);

```

Note that the annotation is the same as `runSimulation` function, the only difference is that on the `createBashFile` function we won`t run anything at the backgroup.

## Running Batch File

There is also a possibility to run a batch file stand alone, by running the function below:

```javascript
let crop = 'Maize';
jdssat.runBatchFile(crop);
```

This function will create the command and use `child process` node module to execute the command created. 

## Reading .OUT files 

To read a DSSAT out file, you have to use `readOutFile` function:

``` javascript
let crop = 'Maize';
let file = 'PlantGro.OUT';

let outFileContent = jdssat.readOutFile(crop, file);

```

![data files](/images/outfile_response.png?raw=true)

The result of reading a DSSAT OUT file will be an array containing an object for each run. See the object format below:

``` javascript
let obj = {'experiment': 'experiment name', 'run': 'run name': 'values': '[{array of objects with the cde description and its values}]'}
```

<br />

See a sample of Graph built using the result of `readOutFile` function:

![data files](/images/graph_builder.png?raw=true)


## Explicitly reveal public pointers to the private functions 

``` javascript
  return {
    initialize: initialize,
    path: path,
    version: version,
    platform: platform,
    tree: tree,
    experiments: experiments,
    experimentDescription: experimentDescription,
    treatments: treatments,
    createBashFile: createBashFile,
    runSimulation: runSimulation,
    outFiles: outFiles,
    readOutFile: readOutFile,
    cde: cde,
    getVariablesFromOutFile: getVariablesFromOutFile,
    openExternalTool: openExternalTool,
    openDssatFolder: openDssatFolder,
    openFileInEditor: openFileInEditor,
    getDataFiles: getDataFiles,
    folders: folders,
    filePreview: filePreview,
    batchCommand: batchCommand,
    runBatchFile: runBatchFile
  }
```

## License
(LICENSE.md)
