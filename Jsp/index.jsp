<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<div id="content" class="panel">
</div>

<script language="JavaScript"> 

var page = "home";

setInterval ( function(){myTimer()},1000 );

function myTimer () {
	var d = new Date();
	$('#usertime').html( d.toLocaleTimeString('zh') );
	$('#userdate').html( d.toLocaleDateString('zh') );
	if ( page == "home" ) {
		updateHome ();
	} else if ( page == "monitor" ) {
		updateMonitor ();
	} else if ( page == "statis" ) {
	} else if ( page == "graph" ) {
	} else if ( page == "report" ) {
	} else if ( page == "farmdetail" ) {
		updateFarmDetail ();
	} else if ( page == "setting" ) {
	}
}

function resizeAll() {
	var height = $(window).height();		
	var width = $(window).width();		
	$('#content').width( width - 40 );
	$('#content').height( height - 90 );
	if ( page == "home" ) {
		resizeHome ( height-110, width-310, 90, 310 );
	} else if ( page == "monitor" ) {
		resizeMonitor ( height-110, width-310 );
	} else if ( page == "statis" ) {
		resizeStatis ( height-110, width-310 );
	} else if ( page == "graph" ) {
		resizeGraph ( height-110, width-310 );
	} else if ( page == "report" ) {
		resizeReport ( height-110, width-310 );
	} else if ( page == "farmdetail" ) {
		resizeFarmDetail ( height-110, width-310 );
	} else if ( page == "setting" ) {
		resizeSetting ( height-110, width-310 );
	} else if ( page == "standard" ) {
		resizeStandard ( height-110, width-310 );
	}
}

$(document).ready(function(){
	$('#menu').find('table').height($('#menu').height()-32) ;

	createHome ();
	$('#username').html( username );
	$('#managermenu').css( 'display', 'none' );
	$('#passwdmenu').css( 'display', 'none' );
	draw();
});

$(window).resize(function(){
	resizeAll();
});

</script>
