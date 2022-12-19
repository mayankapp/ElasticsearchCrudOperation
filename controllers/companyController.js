const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


const putMapping = async(indexName) => {
    try {
        const properties = {
            firstname: { type: 'text' },
            lastname: { type: 'text' },
            email: { type: 'text' },
            phone_number: { type: 'integer' }
        }
        const mapping = await client.indices.putMapping({
            index: indexName,
            type: 'staff',
            body: { properties },
            include_type_name: true
        });
        console.log("Mapping created..!!", mapping);
    } catch (error) {
        console.log("Error in creating mapping..!!", error.message);
    }
}

const createIndex = async(indexName) => {
    try {
        const index = await client.indices.exists({ index: indexName });
        if (index) return console.log("Index Already Exists..!!");
        const result = await client.indices.create({ index: indexName });
        console.log("Index Successfully created..!!", result);
    } catch (error) {
        console.log("Error creating index..!!", error.message);
    }
}

const getAllIndices = async() => {
    try {
        const indices = await client.cat.indices({ h: ['index'] })
        console.log("Indices retrieved..!!", indices);
    } catch (error) {
        console.log("Error in fetching indcess..!!", error.message);
    }
}

const deleteIndex = async(indexName) => {
    try {
        // if you want to delete multiple indices then pass indexName as an array ['index1','index2'].
        const index = await client.indices.exists({ index: indexName });
        if (!index) return console.log("Index not found..!!")
        await client.indices.delete({ index: indexName });
        console.log("Index Deleted...!!");
    } catch (error) {
        console.log("Error in deleting index..!!", error.message);
    }
}

const createIndexData = async(indexName) => {
    try {
        let id = "5";
        const data = {
            firstname: 'Anurag',
            lastname: 'Chaturvedi',
            email: 'anurag@appscrip.co',
            phone_number: 85450
        }
        const result = await client.exists({
            index: indexName,
            type: 'staff',
            id: String(id)
        });
        if (result) return console.log("Data already exists..!!")
        return await client.index({
            index: indexName,
            type: 'staff',
            id,
            body: data
        });
    } catch (error) {
        console.log("Error in adding data..!!", error.message);
    }
}

const getIndexData = async(indexName) => {
    try {
        const data = await client.search({
            index: indexName,
            body: {
                // size: 2,     // use limit query by using size keyword
                query: {
                    match_all: {},      // get all the records without using any conditions
                    // match: {
                    //     firstname: 'Rohit'      // we can specify the conditions inside match object
                    // },
                    // ids: {
                    //     values: [1, 3, 5]       // fetch multiple records by ids
                    // }
                },
                sort: [
                    { _id: 'desc'}
                    // { "firstname": { "order": "desc"} }
                ]
            }
        });
        console.log("dataaaaaaaa====>>>> ", data);
        console.log("dataaaaaaaa====>>>> ", data.hits);
        console.log("dataaaaaaaa====>>>> ", data.hits.hits);
    } catch (error) {
        console.log("Error in getting the data..!!", error.message);
    }
}

const getOneRecord = async(indexName) => {
    try {
        // const data = await client.search({
        //     index: indexName,
        //     body: {
        //         query: {
        //             "term": {
        //                 "_id": "1"
        //             }
        //         }
        //     }
        // });
        const data = await client.get({
            index: indexName,
            type: 'staff',
            id: "3"
        })
        console.log("dataaaaaaaa====>>>> ", data);
    } catch (error) {
        console.log("Error in getting the data..!!", error.message);
    }
}

const checkRecordExist = async(indexName) => {
    try {
        const data = await client.exists({
            index: indexName,
            type: "staff",
            id: "1"
        });
        // If the record exists then return true otherwise false
        console.log("dataaaaaaaa====>>>> ", data); 
    } catch (error) {
        console.log("Error in getting the data..!!", error.message);
    }
}

const updateIndexData = async(indexName, id) => {
    try {
        const data = await client.exists({
            index: indexName,
            type: "staff",
            id: String(id)
        });
        console.log("dataaaaaaaa====>>>>", data);
        if (!data) return console.log("User not registered..!!");
        return await client.update({
            index: indexName,
            type: "staff",
            id: String(id),
            body: {
                doc: {
                    firstname: "Aditya",
                    lastname: "Pathak",
                    email: "aditya@appscrip.co",
                    phone_number: 89446
                }
            }
        });        
    } catch (error) {
        console.log("Error in updating the index data..!!", error.message);
    }
}

const deleteIndexRecord = async (indexName, id) => {
    try {
        const isExists = await client.exists({ 
            index: indexName,
            type: "staff",
            id: String(id)
        });
        if (!isExists) return console.log("No Record found..!!")
        const data = await client.delete({
            index: indexName,
            type: "staff",
            id: String(id)
        })
        return console.log("Record deleted..!!", data);
    } catch (error) {
        console.log("Error in deleting the index data..!!", error.message);
    }
}

module.exports = {
    putMapping,
    createIndex,
    getAllIndices,
    deleteIndex,
    createIndexData,
    getIndexData,
    getOneRecord,
    checkRecordExist,
    updateIndexData,
    deleteIndexRecord
}