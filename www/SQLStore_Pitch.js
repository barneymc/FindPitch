
var systemDB;
var REBUILD_DB=1;   //the database is already built, no need to rebuild...!
var xMap;
var yMAP;
var shortName = 'clubs.db';
var version = '1.0';
var displayName = 'My Important Database';
var maxSize = 65536; // in bytes
var DEBUG_ON=0;

/*! Initialize the systemDB global variable. */

function ifalert(message){
	if (DEBUG_ON==1) alert(message);
}

function initDB()
{
	
	
	try {
		if (!window.openDatabase) {
			alert('not supported');
		} else {
			ifalert('Opening database file');
			
			var myDB = openDatabase(shortName, version, displayName, maxSize);
			systemDB = myDB;
			// You should have a database instance in myDB.
			
		}
	} catch(e) {
		// Error handling code goes here.
		if (e == INVALID_STATE_ERR) {
			// Version number mismatch.
			alert("Invalid database version.");
		} else {
			alert("Unknown error "+e+".");
		}
		return;
	}
	
	// alert("Database is: "+myDB);
	
	
	createTables(myDB);
	PopulateTables(myDB);
	
	
	
}

function getCountiesLoad(){
	try{
		ifalert('Loading counties...');
		
		LoadCounties();
	}
	catch(b){
		alert('Error in getCountiesLoad() ' + b);
	}
}

//iPhone-specific funcion to get GPS
function getLocation()
{
	try{
		var elementId=document.getElementById('gps');
		elementId.value="Getting GPS...";
		if(navigator.geolocation)
		{
			//debug.log("getLocation");
			navigator.notification.activityStart();
			var suc = function(p){
				debug.log(p.coords.latitude + " " + p.coords.longitude);
				navigator.notification.activityStop();
				elementId.value= ""+p.coords.latitude + " " + p.coords.longitude;
				navigator.geolocation.stop();
			};
			var fail = function(error){
				navigator.notification.activityStop();
				elementId.value="Failed to get GPS location";
				navigator.geolocation.stop();
			};
			navigator.geolocation.getCurrentPosition(suc,fail);
		}
		else
		{
			elementId.value="No GPS service available.";
		}
	}
	catch(b){
		alert('Error in getLocation ' + b);
	}
} 



//Use this preferred method for getting query params
function queryParameters(urlt) {
	var query = window.location.href;
	var keyValuePairs = query.split(/[&?]/g);
	var params = {};
	for (var i = 0, n = keyValuePairs.length; i < n; ++i) {
		var m = keyValuePairs[i].match(/^([^=]+)(?:=([\s\S]*))?/);
		if (m) {
			var key = decodeURIComponent(m[1]);
			(params[key] || (params[key] = [])).push(decodeURIComponent(m[2]));
		}
	}
	return params;
}



//Loads the details for that Location
function getLocationDetailLoad(){
	try{
		var urlt=null;
		var locID=GetQuerystringParam('locationid');
		var countyID=GetQuerystringParam('countyid');
		var countyName=queryParameters(urlt)['cname'];
		//ifalert('Countyname is ' + countyName);
		
		//var countyName=GetQuerystringParam('cname');
		//ifalert('Countyname is ' + countyName);
		//ifalert('LocID is is' + locID);
		var myDB = openDatabase(shortName, version, displayName, maxSize);
		var SQL_STRING=" select id, Name, Crest, LatX, LatY from Location where id=" + locID + ";";
		var buildstring='';		//init the HTML builderstring
		var controldiv=document.getElementById('bb');
		var row=null;
		var xc=null;var yc=null;var locname=null;
		
		
		myDB.transaction(
						 function(transaction){
						 transaction.executeSql(SQL_STRING,[],
												function(transaction,results){
												for (var i=0;i<results.rows.length;i++){
												row=results.rows.item(i);
												xc=row['LatX'];yc=row['LatY'];locname=row['Name'];
												buildstring=buildstring+ docLinkLocs(row);
												//ifalert('xc is ' + xc);
												$('#pitchmaplink').attr('href','pitchmap.html?xc=' +xc+'&yc='+yc+'&locid=' + locID + '&locname='+locname+'&countyid='+countyID+'&countyname='+countyName);
												}
												//controldiv.innerHTML=buildstring;
												}
												, errorHandler);
						 }
						 
						 );
		
		//Set up the Link to the back page - County
		//ifalert('CountyID is ' +countyID);
		$('#backlink').attr('href','locations.html?countyid=' + countyID);
		$('#backlink').html("County " + countyName);
		//ifalert('CountyName is ' +countyName);
		
	}
	catch(b){
		alert('getLocationDetailLoad-Error :' + b);
	}
	
}
//Load the data into the county, location tables on initialisation
function PopulateTables(myDB){
	try{
		ifalert('Populate Tables');
		//INSERT the County Names
		myDB.transaction(
						 function(transaction){
						 transaction.executeSql("INSERT into County (CountyName, SoftDelete) values ('Clare',0);",[],[], errorHandler);
						 transaction.executeSql("INSERT into County (CountyName, SoftDelete) values ('Galway',0);",[],[], errorHandler);
						 transaction.executeSql("INSERT into County (CountyName, SoftDelete) values ('Limerick',0);",[],[], errorHandler);
						 transaction.executeSql("INSERT into County (CountyName, SoftDelete) values ('Mayo',0);",[],[], errorHandler);
						 transaction.executeSql("INSERT into County (CountyName, SoftDelete) values ('Kerry',0);",[],[], errorHandler);
						 transaction.executeSql("INSERT into County (CountyName, SoftDelete) values ('Kilkenny',0);",[],[], errorHandler);
						 transaction.executeSql("INSERT into County (CountyName, SoftDelete) values ('Cork',0);",[],[], errorHandler);
						 }
						 );
		
		//INSERT the County Clubs
		myDB.transaction(
						 function(transaction){
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Ballyea',52.82802,-9.10955,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/ak.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Banner',52.89684,-8.993,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/by.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Broadford',52.80681,-8.63972,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/gl.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Clonboney',52.89192,-9.37348,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/gl.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Clonlara',52.72397,-8.55449,1,'http://www.gaainfo.com/graphics/midicrest/05/midicrest_05_009.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Coolmeen',52.65913,-9.21392,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/ak.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Corofin',52.94564,-9.07183,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/rw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Crusheen',52.93904,-8.8979,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/rw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Eire Og, Inis',52.84633,-8.98617,1,'http://www.gaainfo.com/graphics/midicrest/05/midicrest_05_017.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Ennistymon',52.93938,-9.29327,1,'http://www.gaainfo.com/graphics/midicrest/05/midicrest_05_019.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Kildysart',52.66982,-9.10689,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/bk.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Kilkee Bealatha',52.67909,-9.64896,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/bw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Killimer',52.6152,-9.4091,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/gl.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Kilmihil',52.72044,-9.32593,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/gl.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Kilnamona',52.87291,-9.0778,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/gw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Kilrush Shamrocks',52.64051,-9.48468,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/gw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Lissycasey',52.74284,-9.16286,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/mw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Newmarket On Fergus',52.76087,-8.8982,1,'http://www.gaainfo.com/graphics/midicrest/05/midicrest_05_037.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('OCallaghans Mills',52.84283,-8.68401,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/bl.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Ruan',52.92872,-8.99171,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/by.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Shannon Gaels',52.70604,-9.09256,1,'http://www.gaainfo.com/graphics/midicrest/05/midicrest_05_045.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Sixmilebridge',52.74164,-8.77709,1,'http://www.gaainfo.com/graphics/midicrest/05/midicrest_05_047.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('St. Josephs, Doora-Barefield',52.88695,-8.95008,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/mw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('St. Senans',52.67845,-9.64707,1,'http://www.gaainfo.com/graphics/gaa_versions/midi/bw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Tulla',53.07304,-8.9442,1,'http://www.gaainfo.com/graphics/midicrest/05/midicrest_05_053.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Wolfe Tones, Na Sionna',52.7126,-8.8828,1,'http://www.gaainfo.com/graphics/midicrest/05/midicrest_05_055.jpg')",[],[],errorHandler);			
						 
						 //*********************************************Galway Clubs
						 
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Abbeyknockmoy',53.44051,-8.72733,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_001.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Annaghdown',53.38978,-9.07977,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_003.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Ballindereen',53.18979,-8.91214,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/gw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Barna [G]',53.26767,-9.16278,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_007.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Caherlistrane',53.49777,-9.02415,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/bw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Cappataggle',53.2745,-8.40913,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_011.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Carnmore',53.30852,-8.94081,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_013.jpg');",[],[],errorHandler);
						 
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Carraroe',53.26621,-9.59724,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/kr.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Claregalway',53.34276,-8.95231,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/gl.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Clifden',53.48945,-10.0232,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/rw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Cortoon Shamrocks',53.53429,-8.71988,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/sw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Craughwell',53.22454,-8.7331,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_023.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Liam Mellows',53.27979,-9.0687,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_038.jpg');",[],[],errorHandler);
						 
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Gort',53.06587,-8.81884,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_028.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Kilconly',53.57335,-8.97729,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/grw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Killanin',53.3885,-9.24723,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/bw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Killimor [G]',53.15084,-8.18636,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/ak.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Kilnadeema-Leitrim',53.16622,-8.43561,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_036.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Meelick-Eyrecourt',53.20151,-8.14053,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/bw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Menlo Emmets',53.30603,-9.06883,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_041.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Milltown',53.60893,-8.9,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/bw.jpg');",[],[],errorHandler);
						 
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Mountbellew-Moylough',53.46961,-8.49913,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/ak.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Kilbeacanty',53.06649,-8.78614,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/by.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Naomh Anna',53.28975,-9.67037,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_049.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('St. Thomas',53.17595,-8.65319,2,'http://www.gaainfo.com/graphics/generic/midi_generic.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Oranmore-Maree',53.26701,-8.93695,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_053.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Portumna',53.09,-8.21176,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_055.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Salthill-Knocknacarra',53.26353,-9.08419,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_057.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Skehana',53.41183,-8.63268,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/bw.jpg');",[],[],errorHandler);
						 
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('St. Brendans, Loughrea',53.20012,-8.56942,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/bl.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('St. James',53.28405,-9.02115,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_063.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('St. Patricks, Clonbur',53.53806,-9.36104,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_065.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Tuam Stars',53.5167,-8.8537,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_067.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Tynagh Abbey Duniry',53.09907,-8.38171,2,'http://www.gaainfo.com/graphics/gaa_versions/midi/bgw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Tommy Larkins',53.05257,-8.40282,2,'http://www.gaainfo.com/graphics/midicrest/12/midicrest_12_072.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Oughterard',53.43112,-9.3231,2,'http://www.gaainfo.com/graphics/generic/midi_generic.jpg');",[],[],errorHandler);
						 
						 
						 //Limerick Clubs
						 
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Abbey Sarsfields',52.67686,-8.64612,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/gr.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Ahane',52.69157,-8.51579,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/gy.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Athea',52.45951,-9.28808,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/mw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Ballybricken',52.56988,-8.52127,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_007.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Ballylanders',52.36997,-8.34802,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/gy.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Banogue',52.46421,-8.69645,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/g.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Bruff',52.47483,-8.54805,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/rw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Caherconlish',52.5956,-8.4706,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/bkw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Camogue Rovers',52.50781,-8.60886,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_017.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Cappamore',52.61397,-8.33952,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_019.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Castletown-Ballyagran',52.42305,-8.81867,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/ak.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Crecora Manister',52.57139,-8.6689,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_023.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Croom',52.51808,-8.71735,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/bw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Dromcollogher Broadford',52.33492,-8.91197,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/ak.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Effin',52.36009,-8.61719,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_029.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Feenagh/Kilmeedy',52.38493,-8.88451,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/bw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Fr. Caseys, Abbeyfeale',52.38561,-9.29993,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_033.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Galtee Gaels',52.33634,-8.28567,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_035.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Gerald Griffins',52.55969,-9.19066,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/gw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Glin',52.57001,-9.28289,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/kw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Hospital-Herbertstown',52.51779,-8.46904,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/km.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Kildimo',52.61113,-8.7982,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_043.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Kilteely-Dromkeen',52.52165,-8.40729,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/gr.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Knockainey',52.47162,-8.47462,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_049.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Milford',52.65984,-8.59432,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_051.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Mountcollins',52.31947,-9.23676,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/rw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Murroe Boher',52.64835,-8.40085,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/bgw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Newcastlewest',52.44722,-9.05883,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/kw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Oola',52.53135,-8.26208,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/rw.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Pallaskenry',52.64401,-8.86734,3,'http://www.gaainfo.com/graphics/midicrest/18/midicrest_18_062.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('South Liberties',52.59938,-8.60542,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/gy.jpg');",[],[],errorHandler);
						 transaction.executeSql("insert into location ([Name],[LatX],[LatY],[CountyID],[Crest]) values ('Sean Finns',52.52144,-8.93858,3,'http://www.gaainfo.com/graphics/gaa_versions/midi/bw.jpg');",[],[],errorHandler);
						 
						 }
						 );
		
	}
	
	catch(b){
		alert('PopulateTables()- Error ' + b);
	}
	
}

/*! If a deletion resulted in a change in the list of county, redraw the "Choose a file" pane. */
function deleteUpdateResults(transaction, results)
{
	if (results.rowsAffected) {
		chooseDialog();
	}
}



function GetQuerystringParam(name, url) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
						  var regexS = "[\\?&amp;]" + name + "=([^&amp;#]*)";
						  var regex = new RegExp(regexS);
						  if (typeof (url) == 'undefined') url = window.location.href;
						  var results = regex.exec(url);
						  if (results == null)
						  return "";
						  
						  else
						  return results[1];
						  
						  }
						  
						  
						  
						  /*! Mark a file as "deleted". */
						  function reallyDelete(id)
						  {
						  // alert('delete ID: '+id);
						  var myDB = systemDB;
						  
						  myDB.transaction(
										   new Function("transaction", "transaction.executeSql('UPDATE county set deleted=1 where id=?;', [ "+id+" ], /* array of values for the ? placeholders */"+
														"deleteUpdateResults, errorHandler);")
										   );
						  
						  }
						  
	/*! Ask for user confirmation before deleting a file. */
						  function deleteFile(id)
						  {
						  var myDB = systemDB;
						  
						  myDB.transaction(
										   new Function("transaction", "transaction.executeSql('SELECT id,name from county where id=?;', [ "+id+" ], /* array of values for the ? placeholders */"+
														"function (transaction, results) {"+
														"if (confirm('Really delete '+results.rows.item(0)['name']+'?')) {"+
														"reallyDelete(results.rows.item(0)['id']);"+
														"}"+
														"}, errorHandler);")
										   );
						  }
						  
						  //Loads the locations based on the CountyID
						  //Builds up the innerHTL string 
						  //Could load a small 50x50 crest jpg (maybe have this file cached locally in filesystem)
						  //Similar to iCCPC having a different jpg for each customer...
						  function getLocationsLoad(){
						  try{
						  ifalert('loading counties');					  
						  var countyid=GetQuerystringParam('countyid');
						  ifalert('CountyID is' + countyid);
						  var myDB = openDatabase(shortName, version, displayName, maxSize);
						  var SQL_STRING=" select L.id, L.Name, L.Crest, L.CountyID, C.CountyName from Location L inner JOIN County C on L.CountyID=C.ID where L.CountyID=" + countyid + " order by Name ;";
						  var buildstring='';		//init the HTML builderstring
						  var controldiv=document.getElementById('bb');
						  var row=null;
						
						  myDB.transaction(
										   function(transaction){
										   transaction.executeSql(SQL_STRING,[],
																  function(transaction,results){
																  for (var i=0;i<results.rows.length;i++){
																  
																  row = results.rows.item(i);
																  //alert(i + '  '+ row['Name']);
																  var newEntryRow=$('#entryTemplate').clone();
																  
																  newEntryRow.removeAttr('style');
																  newEntryRow.attr('Id',row['id']);
																  
																  newEntryRow.appendTo('#bb');
																  newEntryRow.find('.LocationName').text(row['Name']);
																  //newEntryRow.find('.CountyCount').text(row['CountyCoutn']);
																  
																  newEntryRow.find('#q').attr('href','locationdetail.html?locationid=' + row['id'] + '&countyid=' + row['CountyID']+'&cname='+row['CountyName']);
																  //alert('here' +i);
																  }$('#bb li:nth-child(odd)').addClass('alternate');											
																  }
																  , errorHandler);
										   }
										   );
						  
						  
						  }
						  catch(b){
						  alert('getLocationsLoad() - Error ' + b);
						  }
						  
						  }
						  
						  //Builds up the string for innerHTML for locations.html
						  function docLinkLocs(row)
						  {
						  var name = row['Name'];
						  var location_id = row['id'];
						  var countyid=row['CountyID'];
						  var countyname=row['CountyName'];
						  //var loccount=row['LocationsCount'];
						  //we can add the counter in later, hardcode for moment...
						  return "<li class='event' id='" + location_id + "'><a id='q' href='locationdetail.html?locationid=" + location_id +  '&cname=' + countyname + '&countyid=' + countyid +  "'>" + name + "<small class='counter'>88</small></a></li>\n";
						  
						  }
						  
						  //The different ways you can set the parameters for the Update
						  //Update structure is different : NB!!!
						  function createCounty(countyname)
						  {
						  try{
						  
						  if (countyname==null){
						  countyname = document.getElementById('createFilename').value
						  }
						  var myDB=systemDB;
						  var SQL_INSERT_COUNTY='INSERT INTO county (name,location_id,deleted) VALUES (?,?,?);';
						  myDB.transaction(
										   function(transaction){
										   transaction.executeSql(
																  SQL_INSERT_COUNTY,
																  [countyname,0,0],
																  ifalert('Inserted County'),
																  errorHandler);
										   }						 						 
										   );
						  
						  }
						  
						  catch(b)
						  {
						  alert('createLocation : An error has occurred ' + b);
						  return
						  }
						  
						  
						  }
						  
						  function createLocation(name,xcord,ycord,countyID)
						  {
						  try{
						  var myDB=systemDB;
						  var SQL_INSERT='INSERT INTO location (DATABLOB,LATX,LATY,COUNTYID) VALUES (?,?,?,?);';
						  myDB.transaction(
										   function(transaction){
										   transaction.executeSql(
																  SQL_INSERT,
																  [name,xcord,ycord,countyID],
																  ifalert('Inserted Location'),
																  errorHandler);
										   }						 						 
										   );
						  
						  }
						  
						  catch(b)
						  {
						  alert('createLocation : An error has occurred ' + b);
						  return
						  }
						  
						  
						  }
						  
						  function callsaveLocation()
						  {
						  var userinput=document.getElementById('txtinput').value;
						  var userxcord=document.getElementById('latx').value;
						  var userycord=document.getElementById('laty').value;
						  var usercountyID=document.getElementById('countyselect').value;
						  var userlocationid=document.getElementById('locationid').value;
						  
						  //alert('UserInput ' + userinput);
						  saveLocation(userinput,userxcord,userycord,usercountyID,userlocationid);
						  
						  }
						  function saveLocation(name,xcord,ycord,countyID,locationid)
						  {
						  try{
						  var myDB=systemDB;
						  var SQL_UPDATE='UPDATE location set datablob=?,LatX=?,LatY=?,countyID=? where id=?;';
						  var params;
						  myDB.transaction(
										   function(transaction){
										   transaction.executeSql(
																  SQL_UPDATE,
																  [name,xcord,ycord,countyID,locationid],
																  ifalert('Updated'),
																  errorHandler);
										   }						 						 
										   );
						  }
						  
						  catch(b){
						  alert('An error has occurred ' + b);
						  return
						  }
						  
						  }
						  
						  //Loads the Location data based on the LocationID
						  //and populates the textboxes...
						  function loadlocationByID(locationid)
						  {
						  try
						  {
						  //alert('LocationByID=' + locationid);
						  var myDB=systemDB;
						  myDB.transaction(
										   function(transaction){
										   transaction.executeSql("select datablob,LatX,LatY,id,countyID from location where id=?;",[locationid],
																  function(transaction,results)
																  {
																  var row1=results.rows.item(0);		//there only is one record
																  var fieldvalue=row1['datablob'];
																  var fieldvaluelatx=row1['LatX'];
																  var fieldvaluelaty=row1['LatY'];
																  var countyvalue=row1['countyID'];
																  var locnamevalue=row1['datablob'];
																  var mylatx=document.getElementById('latx');
																  var mylaty=document.getElementById('laty');
																  var mylocationid=document.getElementById('locationid');
																  var mylocationname=document.getElementById('locationname'); 
																  
																  mylatx.value=fieldvaluelatx;
																  mylaty.value=fieldvaluelaty;
																  mylocationid.value=locationid;
																  mylocationname.value=locnamevalue;
																  
																  //Should these be global vars?
																  xMAP=row1['LatX'];
																  yMAP=row1['LatY'];
																  }
																  ,errorHandler);
										   }
										   );
						  }
						  
						  catch(b){
						  
						  alert('loadlocation : An error has occurred ' + b);
						  return
						  }
						  
						  }
						  
						  //Just loads the data from the first file in the table....
						  function loadbyCountyID(countyid)
						  {
						  //1. Wrap in try/catch
						  //2. Note format for input parameters to WHERE clause --- ? and []
						  //3. SQL,params,success,fail
						  
						  try
						  {
						  //alert('loadbyCountyID -> County ID ' + countyid);
						  var myLocations=document.getElementById('locationsul');
						  myLocations.innerHTML='';
						  var myDB=systemDB;
						  myDB.transaction(
										   function(transaction){
										   transaction.executeSql("select datablob,LatX,LatY,id from location where countyid=?;",[countyid],
																  function(transaction,results)
																  {
																  
																  //Loop through the results and build the links
																  var currentrec=0;
																  var onclickstring=null;
																  var row1=results.rows.item(currentrec);
																  
																  //alert('Count ' + results.rows.length);
																  //Loop
																  for (var i=0; i<results.rows.length; i++) {
																  var row1 = results.rows.item(i);
																  var locID = row1['id'];
																  //alert('Current row ' + i);
																  onclickstring=" onclick='loadlocationByID("+ row1['id']+ ")'";
																  //alert(onclickstring);
																  //myLocations.innerHTML=myLocations.innerHTML + "<li onclick='callocdetail(" + locID + ")' class='arrow'><a href='#' " + onclickstring +  ">" + row1['datablob'] + '--' +  row1['id']+ "</a></li><BR>";
																  myLocations.innerHTML=myLocations.innerHTML + "<li onclick='callocdetail(" + locID + ")' class='arrow'><a href='shipmap.html' " + onclickstring +  ">" + row1['datablob'] + '--' +  row1['id']+ "</a></li><BR>";
																  
																  }																				
																  }
																  ,errorHandler);
										   }
										   );
						  
						  }
						  catch(b)
						  {
						  alert('An error has occurred ' + b);
						  return
						  }
						  }
						  
	/*! This prints a list of "county" to edit. */
						  function LoadCounties()
						  {
						  try
						  {
						  ifalert('in: LoadCounties - Loading counties');
						  //var myDB = systemDB;
						  var myDB = openDatabase(shortName, version, displayName, maxSize);
						  ifalert('Opened Database...');
						  var SQL_string="select count(*) as [LocationsCount],C.CountyName as [CountyName],C.ID as [CountyID] from County C INNER JOIN Location L on C.ID=L.CountyID group by C.CountyName, C.ID ";
						  var SQL_string_original="SELECT * from County where deleted=0";
						  myDB.transaction(
										   function (transaction) {
										   transaction.executeSql(SQL_string,
																  [ ], 
																  function (transaction, results) {
																  //var buildstring = '';
																  //var controldiv = document.getElementById('content');   //ul-Element
																  for (var i=0; i<results.rows.length; i++) {
																  var row = results.rows.item(i);
																  ifalert(i + '  '+ row['CountyName']);
																  var newEntryRow=$('#entryTemplate').clone();
																  
																  newEntryRow.removeAttr('style');
																  newEntryRow.attr('Id',row['CountyID']);
																  
																  newEntryRow.appendTo('#counties');
																  newEntryRow.find('.CountyName').text(row['CountyName']);
																  newEntryRow.find('.CountyCount').text(row['CountyCoutn']);
																  
																  newEntryRow.find('#q').attr('href','locations.html?countyid=' + row['CountyID']);
																  //alert('here' +i);
																  }$('#counties li:nth-child(odd)').addClass('alternate');
																  
																  }, errorHandler);
										   }
										   ); //myDB.transaction
						  
						  ifalert('loaded counties complete....');					 
						  }
						  catch(b)
						  {
						  alert('LoadCounties - An error has occurred: ' + b);
						  return
						  }
						  }
						  
						  
						  
						  function calloc(county_id){
						  //alert('Calloc called ' + county_id);
						  loadbyCountyID(county_id);
						  jQT.goTo('#locations','flip');
						  
						  }
						  
						  
	/*! Format a link to a document for display in the "Choose a file" pane. */
						  function docLink(row)
						  {
						  try{	
						  // alert('in docLink');
						  var name = row['CountyName'];
						  var county_id = row['CountyID'];
						  var loccount=row['LocationsCount'];
						  //we can add the counter in later, hardcode for moment...
						  return "<li class='event' id='" + county_id + "'><a id='q" + county_id + "' href='locations.html?countyid=" + county_id + "'>" + name + "<small class='counter'>" + loccount + "</small></a></li>\n";
						  }
						  catch(b){
						  alert('Error in docLink ' + b);
						  }
						  }
						  
	/*! This prints a link to the "Create file" pane. */
						  function linkToCreateNewFile()
						  {
						  return "<p><button onClick='createNewFile()'>Create New County</button>";
						  }
						  
						  
						  
	/*! This creates a new "file" in the database. */
						  function createNewFileAction()
						  {
						  var myDB = systemDB;
						  var name = document.getElementById('createFilename').value
						  
						  // alert('Name is "'+name+'"');
						  
						  myDB.transaction(
										   function (transaction) {
										   var myfunc = new Function("transaction", "results", "transaction.executeSql('INSERT INTO county (name, location_id) VALUES (?, ?);', [ '"+name+"', results.insertId], nullDataHandler, killTransaction);");
										   transaction.executeSql('INSERT INTO location (datablob,countyID) VALUES ("TOWN_NAME",1);', [], 
																  myfunc, errorHandler);
										   }
										   );
						  
						  chooseDialog();
						  }
						  
	/*! This saves the contents of the file. */
						  function saveFile()
						  {
						  var myDB = systemDB;
						  // alert("Save not implemented.\n");
						  
						  var contentdiv = document.getElementById('contentdiv');
						  var contents = contentdiv.contentDocument.body.innerHTML;
						  
						  alert('SaveFile : file text is '+contents);
						  
						  myDB.transaction(
										   function (transaction) {
										   var contentdiv = document.getElementById('contentdiv');
										   var datadiv = document.getElementById('tempdata');
										   
										   var location_id = datadiv.getAttribute('lfdataid');
										   var contents = contentdiv.contentDocument.body.innerHTML;
										   
										   transaction.executeSql("UPDATE location set datablob=? where id=?;",
																  [ contents, location_id ], // array of values for the ? placeholders
																  nullDataHandler, errorHandler); 
										   // alert('Saved contents to '+location_id+': '+contents);
										   var origcontentdiv = document.getElementById('origcontentdiv');
										   origcontentdiv.innerHTML = contents;
										   
										   alert('Saved.');
										   }
										   );
						  }
						  
	/*! This displays the "Create file" pane. */
						  function createNewFile()
						  {
						  var myDB = systemDB;
						  var controldiv = document.getElementById('controldiv');
						  var string = "";
						  
						  string += "<H1>Create New County</H1>\n";
						  string += "<form action='javascript:createCounty()'>\n";
						  string += "<input id='createFilename' name='name'>County Name</input>\n";
						  string += "<input type='submit' value='Save new County' />\n";
						  string += "</form>\n";
						  
						  controldiv.innerHTML=string;
						  
						  }
						  
	/*! This processes the data read from the database by loadFile and sets up the editing environment. */
						  function loadlocation(transaction, results)
						  {
						  try
						  {
						  var controldiv = document.getElementById('controldiv');
						  var contentdiv = document.getElementById('contentdiv');
						  var origcontentdiv = document.getElementById('origcontentdiv');
						  var datadiv = document.getElementById('tempdata');
						  
						  alert('loadlocation called :' + location);
						  
						  var data = results.rows.item(0);
						  
						  alert('data is ' + data);
						  
						  var filename = data['name'];
						  var location = data['datablob'];
						  datadiv.setAttribute('lfdataid', parseInt(data['location_id']));
						  
						  document.title="Editing "+filename;
						  controldiv.innerHTML="";
						  contentdiv.contentDocument.body.innerHTML='TEXT1'+location;
						  origcontentdiv.innerHTML='TEXT2' + location;
						  
						  contentdiv.style.border="1px solid #000000";
						  contentdiv.style['min-height']='20px';
						  contentdiv.style.display='block';
						  contentdiv.contentDocument.contentEditable=true;
						  alert('SQL.js-location:  ' + location);
						  }
						  
						  catch(b)
						  {
						  alert('An error has occurred' + b);
						  return
						  }
						  }
						  
	/*! This loads a "file" from the database and calls loadlocation with the results. */
						  function loadFile(id)
						  {
						  alert('loadFile : Loading file with id '+id);
						  var datadiv = document.getElementById('tempdata');
						  datadiv.setAttribute('lfid', parseInt(id));
						  
						  myDB = systemDB;
						  myDB.transaction(
										   function (transaction) {
										   var datadiv = document.getElementById('tempdata');
										   var id = datadiv.getAttribute('lfid');
										   alert('loading id' +id);
										   transaction.executeSql('SELECT * from county, location where county.id=? and county.location_id = location.id;', [id ], loadlocation, errorHandler);
										   }
										   );
						  
						  }
						  
	/*! This creates the database tables. */
						  function createTables(db)
						  {
						  
	/* To wipe out the table (if you are still experimenting with schemas,
	 for example), enable this block. */
						  if (REBUILD_DB) {
						  db.transaction(
										 function (transaction) {
										 transaction.executeSql('DROP TABLE County;');
										 transaction.executeSql('DROP TABLE Location;');
										 }
										 );
						  }
						  
						  db.transaction(
										 function (transaction) {
										 transaction.executeSql('CREATE TABLE IF NOT EXISTS County(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, CountyName TEXT NOT NULL, SoftDelete INTEGER);', [], nullDataHandler, killTransaction);
										 transaction.executeSql('CREATE TABLE IF NOT EXISTS Location(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Name TEXT,LatX INTEGER, LatY INTEGER, CountyID INTEGER,Crest TEXT);', [], nullDataHandler, errorHandler);
										 }
										 );
						  
						  }
						  
	/*! When passed as the error handler, this silently causes a transaction to fail. */
						  function killTransaction(transaction, error)
						  {
						  return true; // fatal transaction error
						  }
						  
	/*! When passed as the error handler, this causes a transaction to fail with a warning message. */
						  function errorHandler(transaction, error)
						  {
						  // Error is a human-readable string.
						  alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
						  
						  // Handle errors here
						  var we_think_this_error_is_fatal = true;
						  if (we_think_this_error_is_fatal) return true;
						  return false;
						  }
						  
	/*! This is used as a data handler for a request that should return no data. */
						  function nullDataHandler(transaction, results)
						  {
						  }
						  
	/*! This returns a string if you have not yet saved changes.  This is used by the onbeforeunload
	 handler to warn you if you are about to leave the page with unsaved changes. */
						  function saveChangesDialog(event)
						  {
						  var contentdiv = document.getElementById('contentdiv');
						  var contents = contentdiv.contentDocument.body.innerHTML;
						  var origcontentdiv = document.getElementById('origcontentdiv');
						  var origcontents = origcontentdiv.innerHTML;
						  
						  // alert('close dialog');
						  
						  if (contents == origcontents) {
						  return NULL;
						  }
						  
						  return "You have unsaved changes."; //   CMP "+contents+" TO "+origcontents;
						  }
						  
	/*! This sets up an onbeforeunload handler to avoid accidentally navigating away from the
	 page without saving changes. */
						  function setupEventListeners()
						  {
						  window.onbeforeunload = function () {
						  return saveChangesDialog();
						  };
						  }
