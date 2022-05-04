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

	const etoDetailsMonthDay=`SELECT * FROM etoreport WHERE month=${dataMonth} and day=${dataDay} and etopercentage!='#n/a' ORDER BY etopercentage DESC`;
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
	const teamareaallvop="SELECT teamarea, SUM(vop) AS 'vop' FROM etoreport GROUP BY teamarea";
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

//godfather wise all vop
app.get("/lokuakkaareavopone",(req,res)=>{
	const lokuakkaareavopone="SELECT lokuakka, SUM(vop) AS 'vop' FROM etoreport GROUP BY lokuakka";
	connection.query(lokuakkaareavopone,(err,result)=>{
		res.send(result)
	})

})

// //godfather wise all vop
// app.get("/lokuakkaareavopone",(req,res)=>{
// 	const lokuakkaareavopone="SELECT lokuakka, SUM(vop) AS 'vop' FROM etoreport GROUP BY lokuakka";
// 	connection.query(lokuakkaareavopone,(err,result)=>{
// 		res.send(result)
// 	})

// })



// every each month resign total
app.get("/monthlyresigntotal",(req,res)=>{
	const monthlyresigntotal="SELECT month, SUM(resign) AS 'resign' FROM etoreport GROUP BY month";
	connection.query(monthlyresigntotal,(err,result)=>{
		res.send(result)
	})

})




// every each month eto percentage
app.get("/monthlyetopercentage",(req,res)=>{
	const monthlyetopercentage="SELECT month, SUM(etopercentage) AS 'eto' FROM etoreport GROUP BY month;";
	connection.query(monthlyetopercentage,(err,result)=>{
		res.send(result)
	})

})

const today = new Date();
const day = today.getDate();        // 24
const month = today.getMonth();     // 10 (Month is 0-based, so 10 means 11th Month)
const year = today.getFullYear();

var date = new Date(), y = date.getFullYear(), m = date.getMonth();

const utcMonth = today.getUTCMonth();

// current month area eto
app.get("/currentmonthareaeto",(req,res)=>{
	const currentmonthareaeto=`SELECT area, sum(etopercentage) AS 'eto' FROM etoreport WHERE month=${month} GROUP by (area)`;
	connection.query(currentmonthareaeto,(err,result)=>{
		res.send(result)
	})

})

// current month shift eto
app.get("/currentmonthshifteto",(req,res)=>{
	const currentmonthshifteto=`SELECT shift, sum(etopercentage) AS 'eto' FROM etoreport WHERE month=${month} GROUP by (shift)`;
	connection.query(currentmonthshifteto,(err,result)=>{
		res.send(result)
	})

})

// current month vsl eto
app.get("/currentmonthvsleto",(req,res)=>{
	const currentmonthvsleto=`SELECT vsl, sum(etopercentage) AS 'eto' FROM etoreport WHERE month=${month} GROUP by (vsl)`;
	connection.query(currentmonthvsleto,(err,result)=>{
		res.send(result)
	})

})

// current month er eto
app.get("/currentmonthereto",(req,res)=>{
	const currentmonthereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month=${month} GROUP by (er)`;
	connection.query(currentmonthereto,(err,result)=>{
		res.send(result)
	})

})

// current month gl eto
app.get("/currentmonthgleto",(req,res)=>{
	const currentmonthgleto=`SELECT gl, sum(etopercentage) AS 'eto' FROM etoreport WHERE month=${month} GROUP by (gl)`;
	connection.query(currentmonthgleto,(err,result)=>{
		res.send(result)
	})

})

// current month godfather eto
app.get("/currentmonthgodfathereto",(req,res)=>{
	const currentmonthgodfathereto=`SELECT godfather, sum(etopercentage) AS 'eto' FROM etoreport WHERE month=${month} GROUP by (godfather)`;
	connection.query(currentmonthgodfathereto,(err,result)=>{
		res.send(result)
	})

})

// current month lokuakka eto
app.get("/currentmonthlokuakkaeto",(req,res)=>{
	const currentmonthlokuakkaeto=`SELECT lokuakka, sum(etopercentage) AS 'eto' FROM etoreport WHERE month=${month} GROUP by (lokuakka)`;
	connection.query(currentmonthlokuakkaeto,(err,result)=>{
		res.send(result)
	})

})

// current month area vop
app.get("/currentmonthareavop",(req,res)=>{
	const currentmonthareavop=`SELECT area, sum(vop) AS 'vop' FROM etoreport WHERE month=${month} GROUP by (area)`;
	connection.query(currentmonthareavop,(err,result)=>{
		res.send(result)
	})

})


// current month shift vop
app.get("/currentmonthshiftvop",(req,res)=>{
	const currentmonthshiftvop=`SELECT shift, sum(vop) AS 'vop' FROM etoreport WHERE month=${month} GROUP by (shift)`;
	connection.query(currentmonthshiftvop,(err,result)=>{
		res.send(result)
	})

})

// current month vsl vop
app.get("/currentmonthvslvop",(req,res)=>{
	const currentmonthvslvop=`SELECT vsl, sum(vop) AS 'vop' FROM etoreport WHERE month=${month} GROUP by (vsl)`;
	connection.query(currentmonthvslvop,(err,result)=>{
		res.send(result)
	})

})

// current month er vop
app.get("/currentmonthervop",(req,res)=>{
	const currentmonthervop=`SELECT er, sum(vop) AS 'vop' FROM etoreport WHERE month=${month} GROUP by (er)`;
	connection.query(currentmonthervop,(err,result)=>{
		res.send(result)
	})

})

// current month gl vop
app.get("/currentmonthglvop",(req,res)=>{
	const currentmonthglvop=`SELECT gl, sum(vop) AS 'vop' FROM etoreport WHERE month=${month} GROUP by (gl)`;
	connection.query(currentmonthglvop,(err,result)=>{
		res.send(result)
	})

})

// current month godfather vop
app.get("/currentmonthgodfathervop",(req,res)=>{
	const currentmonthgodfathervop=`SELECT godfather, sum(vop) AS 'vop' FROM etoreport WHERE month=${month} GROUP by (godfather)`;
	connection.query(currentmonthgodfathervop,(err,result)=>{
		res.send(result)
	})

})

// current month lokuakka vop
app.get("/currentmonthlokuakkavop",(req,res)=>{
	const currentmonthlokuakkavop=`SELECT lokuakka, sum(vop) AS 'vop' FROM etoreport WHERE month=${month} GROUP by (lokuakka)`;
	connection.query(currentmonthlokuakkavop,(err,result)=>{
		res.send(result)
	})

})

// current month area resign
app.get("/currentmontharearesign",(req,res)=>{
	const currentmontharearesign=`SELECT area, sum(resign) AS 'resign' FROM etoreport WHERE month=${month} GROUP by (area)`;
	connection.query(currentmontharearesign,(err,result)=>{
		res.send(result)
	})

})

// current month area shift
app.get("/currentmonthshiftresign",(req,res)=>{
	const currentmonthshiftresign=`SELECT shift, sum(resign) AS 'resign' FROM etoreport WHERE month=${month} GROUP by (shift)`;
	connection.query(currentmonthshiftresign,(err,result)=>{
		res.send(result)
	})

})

// current month vsl shift
app.get("/currentmonthvslresign",(req,res)=>{
	const currentmonthvslresign=`SELECT vsl, sum(resign) AS 'resign' FROM etoreport WHERE month=${month} GROUP by (vsl)`;
	connection.query(currentmonthvslresign,(err,result)=>{
		res.send(result)
	})

})

// current month er shift
app.get("/currentmontherresign",(req,res)=>{
	const currentmontherresign=`SELECT er, sum(resign) AS 'resign' FROM etoreport WHERE month=${month} GROUP by (er)`;
	connection.query(currentmontherresign,(err,result)=>{
		res.send(result)
	})

})

// current month gl shift
app.get("/currentmonthglresign",(req,res)=>{
	const currentmonthglresign=`SELECT gl, sum(resign) AS 'resign' FROM etoreport WHERE month=${month} GROUP by (gl)`;
	connection.query(currentmonthglresign,(err,result)=>{
		res.send(result)
	})

})

// current month godfather shift
app.get("/currentmonthgodfatherresign",(req,res)=>{
	const currentmonthgodfatherresign=`SELECT godfather, sum(resign) AS 'resign' FROM etoreport WHERE month=${month} GROUP by (godfather)`;
	connection.query(currentmonthgodfatherresign,(err,result)=>{
		res.send(result)
	})

})

app.get("/currentmonthlokuakkaresign",(req,res)=>{
	const currentmonthlokuakkaresign=`SELECT lokuakka, sum(resign) AS 'resign' FROM etoreport WHERE month=${month} GROUP by (lokuakka)`;
	connection.query(currentmonthlokuakkaresign,(err,result)=>{
		res.send(result)
	})

})

//    Heat ////
app.get("/allheat",(req,res)=>{
	const allheat=`SELECT date, SUM(etopercentage) AS 'count' FROM etoreport GROUP BY date`;
	connection.query(allheat,(err,result)=>{
		res.send(result)
	})

})




app.listen(PORT,(req,res)=>{
	console.log(`Server is started on ${PORT}`)
})