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
					let query = 'INSERT INTO etoreasons (date,epf,firstname,lastname,team,resign,reason,service, age,grading,tl,area,shift,vsl,er,gl,godfather,lokuakka,day, month ) VALUES ?';
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

// current day area eto
app.get("/currentdayareaeto",(req,res)=>{
	const currentdayareaeto=`SELECT area, sum(etopercentage) AS 'eto' FROM etoreport WHERE day=${day-3} GROUP by (area)`;
	connection.query(currentdayareaeto,(err,result)=>{
		res.send(result)
	})

})

// current day shift eto
app.get("/currentdayshifteto",(req,res)=>{
	const currentdayshifteto=`SELECT shift, sum(etopercentage) AS 'eto' FROM etoreport WHERE day=${day-3} GROUP by (shift)`;
	connection.query(currentdayshifteto,(err,result)=>{
		res.send(result)
	})

})

//current day vsl eto
app.get("/currentdayvslteto",(req,res)=>{
	const currentdayvslteto=`SELECT vsl, sum(etopercentage) AS 'eto' FROM etoreport WHERE day=${day-3} GROUP by (vsl)`;
	connection.query(currentdayvslteto,(err,result)=>{
		res.send(result)
	})

})

//current day ER eto
app.get("/currentdayereto",(req,res)=>{
	const currentdayereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE day=${day-3} GROUP by (er)`;
	connection.query(currentdayereto,(err,result)=>{
		res.send(result)
	})

})

//current day gl eto
app.get("/currentdaygleto",(req,res)=>{
	const currentdaygleto=`SELECT gl, sum(etopercentage) AS 'eto' FROM etoreport WHERE day=${day-3} GROUP by (gl)`;
	connection.query(currentdaygleto,(err,result)=>{
		res.send(result)
	})

})

//current day god father eto
app.get("/currentdaygodfathereto",(req,res)=>{
	const currentdaygodfathereto=`SELECT godfather, sum(etopercentage) AS 'eto' FROM etoreport WHERE day=${day-3} GROUP by (godfather)`;
	connection.query(currentdaygodfathereto,(err,result)=>{
		res.send(result)
	})

})

//current day Loku Akka eto
app.get("/currentdaylokuakkaeto",(req,res)=>{
	const currentdaylokuakkaeto=`SELECT lokuakka, sum(etopercentage) AS 'eto' FROM etoreport WHERE day=${day-3} GROUP by (lokuakka)`;
	connection.query(currentdaylokuakkaeto,(err,result)=>{
		res.send(result)
	})

})


// current Day area vop
app.get("/currentdayareavop",(req,res)=>{
	const currentdayareavop=`SELECT area, sum(vop) AS 'vop' FROM etoreport WHERE day=${day-3} GROUP by (area)`;
	connection.query(currentdayareavop,(err,result)=>{
		res.send(result)
	})

})

// current Day shift vop
app.get("/currentdayshiftvop",(req,res)=>{
	const currentdayshiftvop=`SELECT shift, sum(vop) AS 'vop' FROM etoreport WHERE day=${day-3} GROUP by (shift)`;
	connection.query(currentdayshiftvop,(err,result)=>{
		res.send(result)
	})

})

// current Day vsl vop
app.get("/currentdayvslvop",(req,res)=>{
	const currentdayvslvop=`SELECT vsl, sum(vop) AS 'vop' FROM etoreport WHERE day=${day-3} GROUP by (vsl)`;
	connection.query(currentdayvslvop,(err,result)=>{
		res.send(result)
	})

})

// current Day ER vop
app.get("/currentdayervop",(req,res)=>{
	const currentdayervop=`SELECT er, sum(vop) AS 'vop' FROM etoreport WHERE day=${day-3} GROUP by (er)`;
	connection.query(currentdayervop,(err,result)=>{
		res.send(result)
	})

})

// current Day GL vop
app.get("/currentdayglvop",(req,res)=>{
	const currentdayglvop=`SELECT gl, sum(vop) AS 'vop' FROM etoreport WHERE day=${day-3} GROUP by (gl)`;
	connection.query(currentdayglvop,(err,result)=>{
		res.send(result)
	})

})

// current Day God Father vop
app.get("/currentdaygodfathervop",(req,res)=>{
	const currentdaygodfathervop=`SELECT godfather, sum(vop) AS 'vop' FROM etoreport WHERE day=${day-3} GROUP by (godfather)`;
	connection.query(currentdaygodfathervop,(err,result)=>{
		res.send(result)
	})

})

// current Day Loku Akka vop
app.get("/currentdaylokuakkavop",(req,res)=>{
	const currentdaylokuakkavop=`SELECT lokuakka, sum(vop) AS 'vop' FROM etoreport WHERE day=${day-3} GROUP by (lokuakka)`;
	connection.query(currentdaylokuakkavop,(err,result)=>{
		res.send(result)
	})

})

// current Day area resign
app.get("/currentdayarearesign",(req,res)=>{
	const currentdayarearesign=`SELECT area, sum(resign) AS 'resign' FROM etoreport WHERE day=${day-3} GROUP by (area)`;
	connection.query(currentdayarearesign,(err,result)=>{
		res.send(result)
	})

})

// current Day Shift resign
app.get("/currentdayshiftesign",(req,res)=>{
	const currentdayshiftesign=`SELECT shift, sum(resign) AS 'resign' FROM etoreport WHERE day=${day-3} GROUP by (shift)`;
	connection.query(currentdayshiftesign,(err,result)=>{
		res.send(result)
	})

})

// current Day vsl resign
app.get("/currentdayvslesign",(req,res)=>{
	const currentdayvslesign=`SELECT vsl, sum(resign) AS 'resign' FROM etoreport WHERE day=${day-3} GROUP by (vsl)`;
	connection.query(currentdayvslesign,(err,result)=>{
		res.send(result)
	})

})

// current Day ER resign
app.get("/currentdayeresign",(req,res)=>{
	const currentdayeresign=`SELECT er, sum(resign) AS 'resign' FROM etoreport WHERE day=${day-3} GROUP by (er)`;
	connection.query(currentdayeresign,(err,result)=>{
		res.send(result)
	})

})

// current Day GL resign
app.get("/currentdayglresign",(req,res)=>{
	const currentdayglresign=`SELECT gl, sum(resign) AS 'resign' FROM etoreport WHERE day=${day-3} GROUP by (gl)`;
	connection.query(currentdayglresign,(err,result)=>{
		res.send(result)
	})

})

// current Day godfather resign
app.get("/currentdaygodfatherresign",(req,res)=>{
	const currentdaygodfatherresign=`SELECT godfather, sum(resign) AS 'resign' FROM etoreport WHERE day=${day-3} GROUP by (godfather)`;
	connection.query(currentdaygodfatherresign,(err,result)=>{
		res.send(result)
	})

})

// current Day godfather resign
app.get("/currentdaylokuakkaresign",(req,res)=>{
	const currentdaylokuakkaresign=`SELECT lokuakka, sum(resign) AS 'resign' FROM etoreport WHERE day=${day-3} GROUP by (lokuakka)`;
	connection.query(currentdaylokuakkaresign,(err,result)=>{
		res.send(result)
	})

})

// Current Month Reason Report 
app.get("/thismonthreasonreport",(req,res)=>{
	const thismonthreasonreport=`SELECT reason, COUNT(reason) AS 'reasoncount' FROM etoreasons  WHERE month=${month-3} GROUP BY reason;`
	connection.query(thismonthreasonreport,(err,result)=>{
		res.send(result)
	})

})

// January Month Reason Report 
app.get("/januaryreason",(req,res)=>{
	const januaryreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='1' GROUP BY reason;`
	connection.query(januaryreason,(err,result)=>{
		res.send(result)
	})
})

// February Month Reason Report 
app.get("/februaryreason",(req,res)=>{
	const februaryreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='2' GROUP BY reason;`
	connection.query(februaryreason,(err,result)=>{
		res.send(result)
	})
})

// March Month Reason Report 
app.get("/marchreason",(req,res)=>{
	const marchreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='3' GROUP BY reason;`
	connection.query(marchreason,(err,result)=>{
		res.send(result)
	})
})

//  April Reason Report 
app.get("/aprilreason",(req,res)=>{
	const aprilreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='4' GROUP BY reason;`
	connection.query(aprilreason,(err,result)=>{
		res.send(result)
	})
})

//  May Reason Report 
app.get("/mayreason",(req,res)=>{
	const mayreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='5' GROUP BY reason;`
	connection.query(mayreason,(err,result)=>{
		res.send(result)
	})
})
//  June Reason Report 
app.get("/junereason",(req,res)=>{
	const junereason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='6' GROUP BY reason;`
	connection.query(junereason,(err,result)=>{
		res.send(result)
	})
})
//  July Reason Report 
app.get("/julyreason",(req,res)=>{
	const julyreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='7' GROUP BY reason;`
	connection.query(julyreason,(err,result)=>{
		res.send(result)
	})
})
//  August Reason Report 
app.get("/augustreason",(req,res)=>{
	const augustreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='8' GROUP BY reason;`
	connection.query(augustreason,(err,result)=>{
		res.send(result)
	})
})
//  September Reason Report 
app.get("/septemberreason",(req,res)=>{
	const septemberreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='9' GROUP BY reason;`
	connection.query(septemberreason,(err,result)=>{
		res.send(result)
	})
})
//  October Reason Report 
app.get("/octoberreason",(req,res)=>{
	const octoberreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='10' GROUP BY reason;`
	connection.query(octoberreason,(err,result)=>{
		res.send(result)
	})
})
//  November Reason Report 
app.get("/novemberreason",(req,res)=>{
	const novemberreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='11' GROUP BY reason;`
	connection.query(novemberreason,(err,result)=>{
		res.send(result)
	})
})
//  December Reason Report 
app.get("/decemberreason",(req,res)=>{
	const decemberreason=`SELECT reason, COUNT(*) AS 'total' FROM etoreasons WHERE month='12' GROUP BY reason;`
	connection.query(decemberreason,(err,result)=>{
		res.send(result)
	})
})

//-----Each month er eto--------

//january er eto 
app.get("/januaryereto",(req,res)=>{
	const januaryereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='1' GROUP by (er);`
	connection.query(januaryereto,(err,result)=>{
		res.send(result)
	})
})

// february er eto
app.get("/februaryereto",(req,res)=>{
	const februaryereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='2' GROUP by (er);`
	connection.query(februaryereto,(err,result)=>{
		res.send(result)
	})
})
// march er eto
app.get("/marchereto",(req,res)=>{
	const marchereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='3' GROUP by (er);`
	connection.query(marchereto,(err,result)=>{
		res.send(result)
	})
})
// april er eto
app.get("/aprilereto",(req,res)=>{
	const aprilereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='4' GROUP by (er);`
	connection.query(aprilereto,(err,result)=>{
		res.send(result)
	})
})
// may er eto
app.get("/mayereto",(req,res)=>{
	const mayereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='5' GROUP by (er);`
	connection.query(mayereto,(err,result)=>{
		res.send(result)
	})
})
// june er eto
app.get("/juneereto",(req,res)=>{
	const juneereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='6' GROUP by (er);`
	connection.query(juneereto,(err,result)=>{
		res.send(result)
	})
})
// july er eto
app.get("/julyereto",(req,res)=>{
	const julyereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='7' GROUP by (er);`
	connection.query(julyereto,(err,result)=>{
		res.send(result)
	})
})
// august er eto
app.get("/augustereto",(req,res)=>{
	const augustereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='8' GROUP by (er);`
	connection.query(augustereto,(err,result)=>{
		res.send(result)
	})
})
// september er eto
app.get("/septemberereto",(req,res)=>{
	const septemberereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='9' GROUP by (er);`
	connection.query(septemberereto,(err,result)=>{
		res.send(result)
	})
})
// february er eto
app.get("/octoberereto",(req,res)=>{
	const octoberereto=`SELECT er, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='10' GROUP by (er);`
	connection.query(octoberereto,(err,result)=>{
		res.send(result)
	})
})

//------each month report------

// january report
app.get("/januaryreport",(req,res)=>{
	const januaryreport=`SELECT teamarea, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='1' AND  etopercentage!='#n/a' GROUP by (teamarea) ORDER BY etopercentage DESC;`
	connection.query(januaryreport,(err,result)=>{
		res.send(result)
	})
})

// february report
app.get("/frebruaryreport",(req,res)=>{
	const frebruaryreport=`SELECT teamarea, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='2' AND  etopercentage!='#n/a' GROUP by (teamarea) ORDER BY etopercentage DESC;`
	connection.query(frebruaryreport,(err,result)=>{
		res.send(result)
	})
})

// march report
app.get("/marchreport",(req,res)=>{
	const marchreport=`SELECT teamarea, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='3' AND  etopercentage!='#n/a' GROUP by (teamarea) ORDER BY etopercentage DESC;`
	connection.query(marchreport,(err,result)=>{
		res.send(result)
	})
})

// April report
app.get("/aprilreport",(req,res)=>{
	const aprilreport=`SELECT teamarea, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='4' AND  etopercentage!='#n/a' GROUP by (teamarea) ORDER BY etopercentage DESC;`
	connection.query(aprilreport,(err,result)=>{
		res.send(result)
	})
})

// May report
app.get("/mayreport",(req,res)=>{
	const mayreport=`SELECT teamarea, sum(etopercentage) AS 'eto' FROM etoreport WHERE month='5' AND  etopercentage!='#n/a' GROUP by (teamarea) ORDER BY etopercentage DESC;`
	connection.query(mayreport,(err,result)=>{
		res.send(result)
	})
})


app.listen(PORT,(req,res)=>{
	console.log(`Server is started on ${PORT}`)
})