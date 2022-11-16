const sql = require('mssql')
var config = require("./dbconnect")


var data = [{
    "period": "2022-11-10",
    "currency_id": "LKR",
    "currency_name_th": "ศรีลังกา : รูปี ศรีลังกา (LKR)",
    "currency_name_eng": "SRI LANKA : SRI LANKA RUPEE (LKR) ",
    "buying_sight": "",
    "buying_transfer": "0.0999000",
    "selling": "0.1008000",
    "mid_rate": "0.1004000"
},
{
    "period": "2022-11-10",
    "currency_id": "IQD",
    "currency_name_th": "อิรัก : ดีนาร์ อิรัก (IQD)",
    "currency_name_eng": "IRAQ : IRAQI DINAR (IQD) ",
    "buying_sight": "",
    "buying_transfer": "0.0252000",
    "selling": "0.0254000",
    "mid_rate": "0.0253000"
},
{
    "period": "2022-11-10",
    "currency_id": "BHD",
    "currency_name_th": "บาห์เรน : ดีนาร์ บาห์เรน (BHD)",
    "currency_name_eng": "BAHRAIN : BAHRAIN DINAR (BHD) ",
    "buying_sight": "",
    "buying_transfer": "97.4179000",
    "selling": "98.2802000",
    "mid_rate": "97.8491000"
},
{
    "period": "2022-11-10",
    "currency_id": "OMR",
    "currency_name_th": "โอมาน : เรียล โอมาน (OMR)",
    "currency_name_eng": "OMAN : RIAL OMANI (OMR) ",
    "buying_sight": "",
    "buying_transfer": "95.3683000",
    "selling": "96.2125000",
    "mid_rate": "95.7904000"
},
{
    "period": "2022-11-10",
    "currency_id": "JOD",
    "currency_name_th": "จอร์แดน : ดอลลาร์ จอร์แดน (JOD)",
    "currency_name_eng": "JORDAN : JORDANIAN DINAR (JOD) ",
    "buying_sight": "",
    "buying_transfer": "51.7867000",
    "selling": "52.2451000",
    "mid_rate": "52.0159000"
},
{
    "period": "2022-11-10",
    "currency_id": "QAR",
    "currency_name_th": "กาตาร์ : เรียล กาตาร์ (QAR)",
    "currency_name_eng": "QATAR : QATARI RIAL (QAR) ",
    "buying_sight": "",
    "buying_transfer": "10.0327000",
    "selling": "10.1215000",
    "mid_rate": "10.0771000"
},
{
    "period": "2022-11-10",
    "currency_id": "MVR",
    "currency_name_th": "มัลดีฟส์ : รูฟียา (MVR)",
    "currency_name_eng": "MALDIVES : RUFIYAA (MVR) ",
    "buying_sight": "",
    "buying_transfer": "2.3750000",
    "selling": "2.3960000",
    "mid_rate": "2.3855000"
},]

async function getalldata(){
    console.log(config)
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(
            {
                server: 'localhost',
                authentication: { type: 'default', options: { userName: 'sa', password: 'As1597307' } },
                options: {database: "arttest",encrypt:false }
                }
        );
        const result = await sql.query`SELECT TOP (200) Ex_id, Ex_currency_id, Ex_currency_name_th, Ex_buying_transfer, Ex_selling, Ex_date
FROM     Exchange_rate` 
        
        return result
    } catch (err) {
        console.log(`Database Not Connect ${err}`)
    }
}

async function insert_exchangerate(data){
    const x = new Date();
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(
            {
                server: 'localhost',
                authentication: { type: 'default', options: { userName: 'sa', password: 'As1597307' } },
                options: {database: "arttest",encrypt:false }
                }
        );
        const result = await sql.query`SELECT TOP (200) Ex_id, Ex_currency_id, Ex_currency_name_th, Ex_buying_transfer, Ex_selling, Ex_date
        FROM     Exchange_rate WHERE Ex_date = ${Date().toString().slice(0, 15)}`
        console.log(result.recordset.length)
        if (result.recordset.length > 0) {
            console.log("มีข้อมูลซ้ำ")
        }else{
            for (let index = 0; index < data.length; index++) {
                await sql.query`INSERT INTO Exchange_rate (Ex_currency_id, Ex_currency_name_th, Ex_buying_transfer, Ex_selling,Ex_date)
        VALUES (${data[index].currency_id},${data[index].currency_name_th} ,${data[index].Sight_Bill} ,${data[index].Transfer},${Date().toString().slice(0, 15)});`
            }
        }
        
    } catch (err) {
        console.log(`Database Not Connect ${err}`)
    }
}

/*
INSERT INTO Exchange_rate
                  (Ex_currency_id, Ex_currency_name_th, Ex_buying_transfer, Ex_selling)
VALUES ('USD', 'สหรัฐอเมริกา : ดอลลาร์ (USD)', 35.8374000, 36.1859000)
*/
module.exports = {
    getalldata: getalldata,
    insert_exchangerate: insert_exchangerate,
};