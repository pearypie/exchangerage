
const express = require('express')
const path = require('path')
const router = express.Router()
const sql = require("../dboperation")
const request = require('request');
const multer = require('multer')
/*

const indexpage = path.join(__dirname,'../data-nodejs-basic/templates/index.html')
const product1 = path.join(__dirname,'../data-nodejs-basic/templates/product1.html')
const product2 = path.join(__dirname,'../data-nodejs-basic/templates/product2.html')
const product3 = path.join(__dirname,'../data-nodejs-basic/templates/product3.html')

router.get('/',(req,res)=>{
    res.status(200)
    res.type('text/html')
    res.sendFile(indexpage)
})



router.get('/product/:id',(req,res)=>{
    const productID = req.params.id
    if(productID === "1"){
        res.sendFile(product1)
    }else if(productID === "2"){
        res.sendFile(product2)
    }else if(productID === "3"){
        res.sendFile(product3)
    }else{
        res.redirect('/')
    }
})
*/


//xlsx value

var XLSX = require("xlsx");
filename = "Exchange_Rate.XLS"
let exchange = []

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,`Exclfiles`)
    },
    filename: (req,file,cb)=>{
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})
router.post(`/upload`, upload.single('Exclfiles'),async (req,res)=> {
    var workbook = XLSX.readFile(`Exclfiles/${filename}`)
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log(worksheet)
    for(let index = 2;index < 19;index++){
        console.log(`B${index}`)
         exchange.push({
            currency_name_th: worksheet[`A${index}`].v,
            currency_id: worksheet[`B${index}`].v,
            Sight_Bill: worksheet[`C${index}`].v,
            Transfer: worksheet[`D${index}`].v,
})
}
   console.log("-------------------------")
   console.table(exchange)
   await sql.insert_exchangerate(exchange)
   res.redirect('/')
})


router.get('/exchange',(req,res)=>{
    res.render(`readexcel.ejs`)
})



router.get('/database',(req,res)=>{
    sql.insert_exchangerate("GBP","อังกฤษ : ปอนด์สเตอร์ลิง (GBP)",41.6492000,42.5080000)
    res.redirect('/')
})


 router.get("/",async function(req,res){
let data = []
let dataexchange = await sql.getalldata()
res.render('index.ejs',{
    dataexchange:dataexchange["recordset"]
  })
/*
const options = {
  method: 'GET',
  url: 'https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/',
  qs: {
    start_period: '2022-11-10',
    end_period: '2022-11-11',
    currency: ''
  },
  headers: {'X-IBM-Client-Id': '6000df3c-02b9-4571-ae66-5d936a34f50e'}
};

request(options, function (error, response, body){
  if (error) throw new Error(error);
  const data = JSON.parse(body);
  for(let index in data[`result`].data.data_detail){
    dataexchange.push({
            currency_id:data[`result`].data.data_detail[index]["currency_id"],
            buying_transfer:data[`result`].data.data_detail[index]["buying_transfer"],
            selling:data[`result`].data.data_detail[index]["selling"]
    })
  }
 console.log(dataexchange)
 
});*/
})





module.exports = router

