const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('../db/index')

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


db.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/addrule', (req, res) => { 
    db.collection("countryRules").insertOne(req.body,(err,val)=>{
        if(err){
            res.send(err);
        }
        else res.send(val);
    })
})

app.get('/transactions', (req, res) => { 
    db.collection("transactions").aggregate( [
        { $project : { _id: 0 } }] ).toArray((err,val)=>{
        if(err){
            res.send(err);
        }
        else res.send(val);
    })
})

app.post('/transactions', (req, res) => {
    
    let x = req.body
    var result = {};
    for (var i = 0; i < x.length; i++) {
      result[x[i].key] = x[i].value;
    }
    
    db.collection("transactions").insertOne(result,(err,val)=>{
        if(err){
            res.send(err);
        }
        else res.send(val);
    })
})

app.get("/getData/:id",(req, res) => {
    let id = parseInt(req.params.id);
   
    db.collection("templateData").aggregate([
        { $match: { TemplateID: id } },
        {
            $lookup:
            {
                from: 'countryData',
                localField: 'CountryCode',
                foreignField:'CountryCode',
                as: 'CountryDetails'
            }
        },
        {
            $lookup:
            {
                from: 'countryRules',
                localField: 'CountryCode',
                foreignField:'CountryCode',
                as: 'ScreenRules'
            }
        }

    ]).toArray((err, result)=> {
      if (err) {
        res.send(err);
      } else {

        let jsonData = result[0].ScreenRules.filter((rule,i)=>{
            if(rule.ControlID && rule.ControlID === "dpd"){
                return rule;
            }
        });

        if(jsonData != ''){
        db.collection("reasonData").find({ $and:[
            { "ControlID": jsonData[0].ControlID},{"RuleID": jsonData[0].RuleID}
        ]}
        ).toArray((err1,result1)=> {
            if(err1){
                res.send(err1);
            }
            else {
               result[0]["ControlValues"] = result1;
               let final = result;
                res.send(final);
            }
        })
    }
    else res.send(result);
     }
    });
  });

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))