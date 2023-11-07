const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cp = require("child_process");
const elasticsearchService = require('./elasticsearch');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    elasticsearchService.ping(req, res);
});

app.get("/elastic/index/init", (req, res) => {
    var index = req.query['index_name'];
    elasticsearchService.initIndex(req, res, index);
});

app.get("/elastic/index/check", (req, res) => {
    var index = req.query['index_name'];
    elasticsearchService.indexExists(req, res, index);
});

app.post("/elastic/index/mapping", (req, res) => {
    var payload = req.body.payload;
    var index = req.body.index_name;
    elasticsearchService.initMapping(req, res, index, payload);
});

app.post("/elastic/add", (req, res) => {
    var payload = req.body.payload;
    var index = req.body.index_name;
    var id = req.body.id;
    var type = req.body.type;
    elasticsearchService.addDocument(req, res, index, id, type, payload);   
});

app.put("/elastic/update", (req, res) => {
    var payload = req.body.payload;
    var index = req.body.index_name;
    var id = req.body.id;
    var type = req.body.type;
    // console.log(req.body);
    elasticsearchService.updateDocument(req, res, index, id, type, payload); 
});

app.post("/elastic/search", (req, res) => {
    var payload = req.body.payload;
    var index = req.body.index_name;
    var type = req.body.type;
    elasticsearchService.search(req, res, index, type, payload);
});

app.delete("/elastic/delete-document", (req, res) => {
    var index = req.body.index_name;
    var id = req.body.id;
    var type = req.body.type;
    elasticsearchService.deleteDocument(req, res, index, id, type);
});

app.delete("/elastic/delete-index/:index", (req, res) => {
    var index = req.params.index;
    elasticsearchService.deleteIndex(req, res, index);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});