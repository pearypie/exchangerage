/*
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')


const detailpage = fs.readFileSync(`${__dirname}/webpages/detail.html`,'utf-8')
const indexpage = fs.readFileSync(`${__dirname}/data-nodejs-basic/templates/index.html`,'utf-8')
const product1 = fs.readFileSync(`${__dirname}/data-nodejs-basic/templates/product1.html`,'utf-8')
const product2 = fs.readFileSync(`${__dirname}/data-nodejs-basic/templates/product2.html`,'utf-8')
const product3 = fs.readFileSync(`${__dirname}/data-nodejs-basic/templates/product3.html`,'utf-8')

const server = http.createServer((req,res)=>{

    
    const {pathname,query} = url.parse(req.url,true)
    pagename = pathname === '/home' ? "home" : "anotherpage"
    const content = `
    <h1>Hello node.js</h1>
    <p style="background:green">Supakon Panjaiyen</p>
    <p>this page is => ${pagename}</p>
    `
    if (pathname === '/home' || pathname === '/') {
        
        res.end(indexpage)
    }
    else if(pathname === '/product'){
        console.log(query.id)
        if (query.id === '1') {
            res.end(product1)
        }else if(query.id === '2'){
            res.end(product2)
        }else if(query.id === '3'){ 
            res.end(product3)
        }
    }
    else{
        res.writeHead(404)
        res.write(content)
    }
    
    res.end()
})

server.listen(8000,'localhost',()=>{
    console.log('Start server in port 8000')
})

*/



const express = require('express')
const app = express()
const router = require('./routes/myrouter')


const path = require('path')

//app.use(router)

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.use(router)
app.use(express.static(path.join(__dirname,'public')))




app.listen(8000,()=>{
    console.log('Start server at 8000')
})