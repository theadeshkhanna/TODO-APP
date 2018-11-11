const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

var app = express();
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));

MongoClient.connect('mongodb://localhost:27017/MyTODO',(err,db) => {
    if(err){
         console.log('Unable to connect to database');
    }
    else{
        console.log('Connected to database');
        app.post('/new',(req,res) => {
            db.collection('Things').insertOne(req.body);
            res.send('Data entered succesfully');
        });

        app.get('/view', (req,res) => {
            db.collection('Things').find().toArray().then((docs) => {
                res.status(404).json(docs);    
            }, (err) => {
                console.log('Unable to retrive information');
            });
            
            
        });
        
    }
   
});

app.listen(3000, () => {
    console.log('Server is up and running at port 3000');
});