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

