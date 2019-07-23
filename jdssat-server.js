const express = require('express')
const jdssat = require('./jdssat')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('server is up and running'))

app.listen(port, function() {
    console.log(`app listening on port ${port}!`)
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/api/treatments/:crop/:experiments', (request, response) => {
    let crop = request.params.crop;
    let experiments = request.params.experiments;
    let experimentsObj = JSON.parse(experiments);
    jdssatInstance = new jdssat();
    jdssatInstance.initialize();
    let treatments = jdssatInstance.treatments(crop, experimentsObj);
    response.end(JSON.stringify(treatments));
})

app.get('/api/experiments/:crop', (request, response) => {
    let crop = request.params.crop;
    console.log(crop);
    jdssatInstance = new jdssat();
    jdssatInstance.initialize();
    let experiments = jdssatInstance.experiments(crop);
    response.end(JSON.stringify(experiments));
})

app.get('/api/data/:crop', (request, response) => {
    let crop = request.params.crop;
    console.log(crop);
    jdssatInstance = new jdssat();
    jdssatInstance.initialize();
    let experiments = jdssatInstance.getDataFiles(crop);
    response.end(JSON.stringify(experiments));
})

app.get('/api/outfiles/:crop', (request, response) => {
    let crop = request.params.crop;
    console.log(crop);
    jdssatInstance = new jdssat();
    jdssatInstance.initialize();
    let outFiles = jdssatInstance.outFiles(crop);

    response.end(JSON.stringify(outFiles));
})

app.get('/api/runSimulation/:crop/:experiments', (request, response) => {
    let crop = request.params.crop;
    let experiments = request.params.experiments;
    let experimentsObj = JSON.parse(experiments);

    jdssatInstance = new jdssat();
    jdssatInstance.initialize();
    jdssatInstance.runSimulation(crop, experimentsObj);

    response.end("simulations are completed");
})

app.get('/api/out/:crop/:file', (request, response) => {
    let crop = request.params.crop;
    let outfile = request.params.file;

    jdssatInstance = new jdssat();
    jdssatInstance.initialize();
    let fileContent = jdssatInstance.readOutFile(crop, outfile);

    response.end(JSON.stringify(fileContent));
})

app.get('/api/cde', (request, response) => {

    jdssatInstance = new jdssat();
    jdssatInstance.initialize();
    let cdeVariables = jdssatInstance.cde();

    response.end(JSON.stringify(cdeVariables));
})

app.get('/api/tool/', (request, response) => {

    //let tool = request.params.tool;
    let tool = request.query.tool;

    console.log(tool);

    jdssatInstance = new jdssat();
    jdssatInstance.initialize();
    jdssatInstance.openExternalTool(tool);

    response.end(JSON.stringify("ok"));
})

app.get('/api/config/', (request, response) => {
    let config = request.query.config;

    console.log(config);

    jdssatInstance = new jdssat();
    jdssatInstance.initialize();

    if (config === "path") {
        let path = jdssatInstance.path();
        response.end(JSON.stringify(path));
    } else if (config === "version") {
        let version = jdssatInstance.version();
        response.end(JSON.stringify(version));
    } else if (config === "platform") {
        let platform = jdssatInstance.platform();
        response.end(JSON.stringify(platform));
    }

    response.end(JSON.stringify("not found"));
})