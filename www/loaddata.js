
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
/* This comment is in v0.82 */

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


//Load the data into the county, location tables on initialisation
function PopulateTables(myDB){
	try{
		ifalert('Populate Tables');
		//INSERT the County Names
		myDB.transaction(
						 function(transaction){
						 transaction.executeSql("INSERT into County (CountyName, SoftDelete) values ('Clare2',0);",[],[], errorHandler);
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



