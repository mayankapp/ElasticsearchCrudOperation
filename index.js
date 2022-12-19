const elasticsearch = require('elasticsearch');
const companyController = require('./controllers/companyController');

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

client.ping((error) => {
    if (error) console.trace('elasticsearch cluster is down!');
    console.log('All is well');
});

// CRUD Operation on Index
    // companyController.putMapping('company');
    // companyController.createIndex('company');
    // companyController.getAllIndices()
    // companyController.deleteIndex('myindex');

// CRUD Operation of Company Index
    // companyController.createIndexData('company');
    companyController.getIndexData('company');
    // companyController.getOneRecord('company');
    // companyController.checkRecordExist('company');
    // companyController.updateIndexData('company', 3);
    // companyController.deleteIndexRecord('company', 5);
