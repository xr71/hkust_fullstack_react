const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

// const url = 'mongodb://localhost:27017/';
const url = 'mongodb://192.168.99.100:27017';
const dbname = 'conFusion';

// MongoClient.connect(url, (err, client) => {

//     assert.equal(err,null);

//     console.log('Connected correctly to server');

//     const db = client.db(dbname);
//     // const collection = db.collection("dishes");
//     // collection.insertOne({"name": "Uthappizza", "description": "test"},
//     // (err, result) => {
//     //     assert.equal(err,null);

//     //     console.log("After Insert:\n");
//     //     console.log(result.ops);

//     //     collection.find({}).toArray((err, docs) => {
//     //         assert.equal(err,null);
            
//     //         console.log("Found:\n");
//     //         console.log(docs);

//     //         db.dropCollection("dishes", (err, result) => {
//     //             assert.equal(err,null);

//     //             client.close();
//     //         });
//     //     });
//     // });

//     dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, 'dishes', (result) => {
//         console.log(`Insert document ${result.ops}`);

//         dboper.findDocuments(db, 'dishes', (docs) => {
//             console.log(`Found documents ${docs}`);

//             dboper.updateDocument(db, { name: 'Vadonut' }, { description: 'Updated Test' }, 'dishes', (result) => {
//                 console.log(`Updated document\n`, result.result);

//                 db.dropCollection('dishes', (result) => {
//                     console.log(`Droped ${result}`);

//                     client.close();
//                 });
//             });
//         });
//     });

// });


// promises

MongoClient.connect(url).then((client) => {
    console.log('Connected correctly to server');

    const db = client.db(dbname);

    dboper.insertDocument(db, { name: 'Vadonut', description: 'Test' }, 'dishes')
    .then((result) => {
        console.log('Inserted document', result);

        return dboper.findDocuments(db, 'dishes');        
    })
    .then((docs) => {
        console.log('Found documents:', docs);

        return dboper.updateDocument(db, { name: 'Vadonut' }, { description: 'Updated test' }, 'dishes');
    })
    .then((result) => {
        console.log('Updated document:', result.result);

        return db.dropCollection('dishes');
    })
    .then((result) => {
        console.log('Dropped collection', result);

        client.close();
    })
    .catch((err) => {
        console.log(err);
    });

}).catch((err) => {
    console.log(err);
});