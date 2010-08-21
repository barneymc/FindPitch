var jQT = $.jQTouch({
    formSelector: false,
    icon: 'icon.png',
    startupScreen: 'Default.png',
    statusBar: 'black', 
    useFastTouch: false,
});
var db;
var clickEvent=null;


function testtapfunc(e){
	try{
		//debug.log('BMCA - kilo.js - Just tapped....moving to counties.html');
		//alert('testtapp');
		alert('Yay! You just ' + clickEvent + 'ed me!');
		e.preventDefault();
		window.location.href="counties.html";
		//alert('Hi');
		//jQT.goTo('#County','slide');
	}
	catch(b)
	{
		alert('testtapfunc Err ' + b);
	}
}

//Define the tap functions rather than the click functions...
//Loaded onbodyload in index.html
function tryme(){

	try{
	//Set the type if ClickEvent
	var userAgent = navigator.userAgent.toLowerCase();
	var isiPhone = (userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipod') != -1) ? true : false;
	clickEvent = isiPhone ? 'tap' : 'click';
	alert('Clickevent is ' + clickEvent);
	
	var mlink=document.getElementById('madlink');
	var taplink=document.getElementById('testtap');
	
	//alert(mlink.innerHTML);
	
	//$(mlink).bind('click',test1);
	$(taplink).bind(clickEvent,testtapfunc);
	
	//$(taplink).bind(clickEvent,testtapfunc);
	}
	catch(b){
		alert('Error in tryme() '+b);
	}
}	
	