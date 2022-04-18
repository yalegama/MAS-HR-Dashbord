const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const cors=require('cors');
const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');
const PORT=process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))


// -> Create a connection to the database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'synergydashboard'
});

// Import CSV Data to MySQL database
importCsvData2MySQL('customers.csv');

function importCsvData2MySQL(filename){
	let stream = fs.createReadStream(filename);
	let csvData = [];
	let csvStream = csv
		.parse()
		.on("data", function (data) {
			csvData.push(data);
		})
		.on("end", function () {
			// -> Remove Header ROW
			csvData.shift();
			
			

			// Open the MySQL connection
			connection.connect((error) => {
				if (error) {
					console.error(error);
				} else {
					let query = 'INSERT INTO etoreport (date,teamarea,internalcarder,actualcarder,vop,resign,total,voppercentage, etopercentage,area,shift,vsl,er,gl,godfather,lokuakka,day,month ) VALUES ?';
					connection.query(query, [csvData], (error, response) => {
						console.log(error || response);
					});
				}
			});
		});

	stream.pipe(csvStream);
}


//eto details
app.get("/etodetails",(req,res)=>{
	const etoDetails="SELECT * FROM etoreport ";
	connection.query(etoDetails,(err,result)=>{
		res.send(result)
	})
})

//eto details by id

app.get("/etodetails/:id",(req,res)=>{


	const dataId=req.params.id;

	const etoDetailsId=`SELECT * FROM etoreport WHERE id=?`;
	connection.query(etoDetailsId,dataId,(err,result)=>{
		res.send(result)
	})
})


//eto details by day

app.get("/etodetailsday/:day",(req,res)=>{

	const dataDay=req.params.day;

	const etoDetailsDay=`SELECT * FROM etoreport WHERE day=?`;
	//const etoDetailsDay=`SELECT * FROM etoreport WHERE day=? and id="2913"`;

	connection.query(etoDetailsDay,dataDay,(err,result)=>{
		res.send(result)
	})


})

//eto details by month

app.get("/etodetailsmonth/:month",(req,res)=>{

	const dataMonth=req.params.month;

	const etoDetailsMonth=`SELECT * FROM etoreport WHERE month=? `;
	//const etoDetailsDay=`SELECT * FROM etoreport WHERE day=? and id="2913"`;

	connection.query(etoDetailsMonth,dataMonth,(err,result)=>{
		res.send(result)
	})


})


//eto details by month and day

app.get("/etodetailsmonthmonthandday/:month/:day",(req,res)=>{

	const dataMonth=req.params.month;
	const dataDay=req.params.day;

	const etoDetailsMonthDay=`SELECT * FROM etoreport WHERE month=${dataMonth} and day=${dataDay}`;
	//const etoDetailsDay=`SELECT * FROM etoreport WHERE day=? and id="2913"`;

	connection.query(etoDetailsMonthDay,dataMonth,(err,result)=>{
		res.send(result)
	})


})






app.listen(PORT,(req,res)=>{
	console.log(`Server is started on ${PORT}`)
})