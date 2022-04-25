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
// importCsvData2MySQL('customers.csv');
importCsvintoData2MySQL('dashboard1.csv');


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



function importCsvintoData2MySQL(filename){
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
					let query = 'INSERT INTO etoreasons (date,epf,firstname,lastname,team,resign,reason,service, age,grading,tl,area,shift,vsl,er,gl,godfather,lokuakka ) VALUES ?';
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

//informations all data
//eto details
app.get("/informations",(req,res)=>{
	const informations="SELECT * FROM etoreasons ";
	connection.query(informations,(err,result)=>{
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

app.get("/etodetailspercentage/:month/:day",(req,res)=>{

	const dataMonth=req.params.month;
	const dataDay=req.params.day;

	const etoDetailsMonthDay=`SELECT sum(etopercentage),sum(vop) FROM etoreport WHERE month=${dataMonth} and day=${dataDay} `;
	//const etoDetailsDay=`SELECT * FROM etoreport WHERE day=? and id="2913"`;

	connection.query(etoDetailsMonthDay,dataMonth,(err,result)=>{
		res.send(result)
	})

})


//all reasons and count
app.get("/allreasons",(req,res)=>{
	const allReasons="SELECT reason, COUNT(*) AS 'total' FROM etoreasons GROUP BY reason";
	connection.query(allReasons,(err,result)=>{
		res.send(result)
	})

})

//all reasons shift Wise
app.get("/allreasonsinshift",(req,res)=>{
	const allShiftReasons="SELECT shift, COUNT(*) AS 'shifttotal' FROM etoreasons GROUP BY shift";
	connection.query(allShiftReasons,(err,result)=>{
		res.send(result)
	})

})

//all reasons vsl Wise
app.get("/allreasonsinvsl",(req,res)=>{
	const allVslReasons="SELECT vsl, COUNT(*) AS 'vsltotal' FROM etoreasons GROUP BY vsl";
	connection.query(allVslReasons,(err,result)=>{
		res.send(result)
	})

})


//all reasons er Wise
app.get("/allreasonsiner",(req,res)=>{
	const allErReasons="SELECT er, COUNT(*) AS 'ertotal' FROM etoreasons GROUP BY er";
	connection.query(allErReasons,(err,result)=>{
		res.send(result)
	})

})


//all reasons gl Wise
app.get("/allreasonsingl",(req,res)=>{
	const allGlReasons="SELECT gl, COUNT(*) AS 'gltotal' FROM etoreasons GROUP BY gl";
	connection.query(allGlReasons,(err,result)=>{
		res.send(result)
	})

})

//all reasons godfather Wise
app.get("/allreasonsingodfather",(req,res)=>{
	const allGodFatherReasons="SELECT godfather, COUNT(*) AS 'godfathertotal' FROM etoreasons GROUP BY godfather;";
	connection.query(allGodFatherReasons,(err,result)=>{
		res.send(result)
	})

})


//all area Wise
app.get("/allareawise",(req,res)=>{
	const allAreaWise="SELECT area, COUNT(*) AS 'areatotal' FROM etoreasons GROUP BY area";
	connection.query(allAreaWise,(err,result)=>{
		res.send(result)
	})

})


//all lokuakka Wise
app.get("/alllokuakkawise",(req,res)=>{
	const alllokuakkaWise="SELECT lokuakka, COUNT(*) AS 'lokuakkatotal' FROM etoreasons GROUP BY lokuakka;";
	connection.query(alllokuakkaWise,(err,result)=>{
		res.send(result)
	})

})

//all lokuakka Wise
app.get("/monthwiseeto",(req,res)=>{
	const allmonthwiseeto="SELECT month, SUM(etopercentage) AS 'eto' FROM etoreport GROUP BY month";
	connection.query(allmonthwiseeto,(err,result)=>{
		res.send(result)
	})

})


//team area wise all vop
app.get("/teamareaallvop",(req,res)=>{
	const teamareaallvop="SELECT teamarea, SUM(vop) AS 'vop' FROM etoreport GROUP BY teamarea;";
	connection.query(teamareaallvop,(err,result)=>{
		res.send(result)
	})

})

//team area wise all vop
app.get("/monthvop",(req,res)=>{
	const monthvop="SELECT month , SUM(vop)  AS 'vop' FROM etoreport GROUP BY month";
	connection.query(monthvop,(err,result)=>{
		res.send(result)
	})

})


//team area wise all vop
app.get("/areavop",(req,res)=>{
	const areavop="SELECT area, SUM(vop) AS 'vop' FROM etoreport GROUP BY area";
	connection.query(areavop,(err,result)=>{
		res.send(result)
	})

})

//vsl wise all vop
app.get("/vslareavop",(req,res)=>{
	const vslareavop="SELECT vsl, SUM(vop) AS 'vop' FROM etoreport GROUP BY vsl";
	connection.query(vslareavop,(err,result)=>{
		res.send(result)
	})

})

//shift wise all vop
app.get("/shiftareavopone",(req,res)=>{
	const shiftareavop="SELECT shift, SUM(vop) AS 'vop' FROM etoreport GROUP BY shift";
	connection.query(shiftareavop,(err,result)=>{
		res.send(result)
	})

})


//er wise all vop
app.get("/erareavopone",(req,res)=>{
	const erareavopone="SELECT er, SUM(vop) AS 'vop' FROM etoreport GROUP BY er";
	connection.query(erareavopone,(err,result)=>{
		res.send(result)
	})

})

//gl wise all vop
app.get("/glareavopone",(req,res)=>{
	const glareavopone="SELECT gl, SUM(vop) AS 'vop' FROM etoreport GROUP BY gl";
	connection.query(glareavopone,(err,result)=>{
		res.send(result)
	})

})

//godfather wise all vop
app.get("/godfatherareavopone",(req,res)=>{
	const godfather="SELECT godfather, SUM(vop) AS 'vop' FROM etoreport GROUP BY godfather";
	connection.query(godfather,(err,result)=>{
		res.send(result)
	})

})



app.listen(PORT,(req,res)=>{
	console.log(`Server is started on ${PORT}`)
})