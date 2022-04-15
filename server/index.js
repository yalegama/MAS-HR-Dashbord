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


const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hrdashboard'
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
			
			// -> Create a connection to the database
			

			// Open the MySQL connection
			connection.connect((error) => {
				if (error) {
					console.error(error);
				} else {
					let query = 'INSERT INTO etoreport (date, area, internalcarder, actualcarder, vop, resign, total, voppercentage, etop, flowarea, shift, vsl, er, gl, godfather, lokuakka) VALUES ?';
					connection.query(query, [csvData], (error, response) => {
						console.log(error || response);
                        
					});
				}
			});
		});

	stream.pipe(csvStream);
}





app.get("/etodetails",(req,res)=>{
	const etoDetails="SELECT * FROM etoreport ";
	connection.query(etoDetails,(err,result)=>{
		res.send(result)
	})
})

app.get("/etoreason",(req,res)=>{
	const etoReasons="SELECT * FROM etoreasons ";
	connection.query(etoReasons,(err,result)=>{
		res.send(result)
	})
})



app.listen(PORT,(req,res)=>{
	console.log(`Server is started on ${PORT}`)
})