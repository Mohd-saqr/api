`use strict`
require(`dotenv`).config()
const pg =require(`pg`)
const path = require(`path`)
const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// const client = new pg.Client(process.env.DATABASE_URL)


const express = require(`express`)
const cors = require(`cors`)
const axios = require(`axios`)
const server = express()
server.use(cors())
server.use(express.json())
const port = process.env.PORT


server.listen(5000,()=>{
    console.log("server is starting");
    })
client.connect().then(()=>{
    server.listen(port,()=>{
        console.log(`listining to port ${port}`)
    })
})






server.get(`/api/v1`, handelApi)
server.post('/api/post',handelAdddisease)
server.post('/api/advice',handelPostAdvive)
server.get('/api/advice',handelGetAdvice)
server.post('/api/con',handelPostcon)
server.get('/api/con',handelGetcon)


function handelPostcon(req,res){
    
    const add =req.body

    add.forEach(con1 => {
        let sql1 =`INSERT INTO APIcon(drug,conflicts_drugs) VALUES($1,$2) RETURNING *;`
     let values =[con1.drug,con1.conflicts_drugs]
        client.query(sql1,values).then(data1 =>{
            
              }).catch(err=>{
                 
              })
     });
     res.status(200).json("ok")

}
function handelGetcon(req,res){
    let sql1 =`SELECT * FROM APIcon`
    

    client.query(sql1).then(res1=>{
        res.status(200).json(res1.rows)
    
    }).catch(err =>{

    });

}


function handelPostAdvive(req,res){
    
    const add =req.body

    add.forEach(advice1 => {
        let sql1 =`INSERT INTO APIAdvice(advice) VALUES($1) RETURNING *;`
     let values =[advice1.advice]
        client.query(sql1,values).then(data1 =>{
            
              }).catch(err=>{
                 
              })
     });
     res.status(200).json("ok")

}
function handelGetAdvice(req,res){
    let sql1 =`SELECT * FROM APIAdvice`
    

    client.query(sql1).then(res1=>{
        res.status(200).json(res1.rows)
    
    }).catch(err =>{

    });

}

function handelApi(req,res){
    const queryApi= 'SELECT * FROM APItable'

client.query(queryApi).then(data =>{
    res.status(200).json(data.rows);

}).catch(err=>{
 res.status(500).send("Please try later  ")
});
}



function handelAdddisease(req,res){
    const add =req.body
    add.forEach(disease => {
       let sql1 =`INSERT INTO APItable(disease_name,description_t,drugs_names) VALUES($1,$2,$3) RETURNING *;`
    let values =[disease.disease_name,disease.description_t,disease.drugs_names]
       client.query(sql1,values).then(data1 =>{
           
             }).catch(err=>{
                 handelError(err,req,res)
             })
    });
    res.status(200).json("ok")
}

