
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


//Main interface into Obj-C loading map
function loadMap(item, latx,laty,title,subtitle){
	try{
		ifalert('loading map...');
		PhoneGap.exec("ChildBrowserCommand.showMap",item,latx,laty,title,subtitle);
		
	}
	
	catch(b){
		alert('Error in loadMap ' +b);
	}
	
}


//Loads the details for that Location proving a link to the 
// (a) Google maps (in HTML webpage) location
// (b) Change to MKMapKit flip - subtitle not working yet

function getLocationDetailLoad(){
	try{
		ifalert('Here');
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
												//$('#pitchmaplink').attr('href','pitchmap.html?xc=' +xc+'&yc='+yc+'&locid=' + locID + '&locname='+locname+'&countyid='+countyID+'&countyname='+countyName);
												//$('#pitchmaplink').attr('onclick',function(){alert('Hi');return false;});
												$('#pitchmaplink').click(function(){ifalert('Hi'); 
																		 loadMap('',xc,yc,locname,'                       ');
																					return false;});
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
						  
							  
	/*! This sets up an onbeforeunload handler to avoid accidentally navigating away from the
	 page without saving changes. */
						  function setupEventListeners()
						  {
						  window.onbeforeunload = function () {
						  return saveChangesDialog();
						  };
						  }
