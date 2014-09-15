/*
var farmname = ['白石风电场',
				'北镇风电场', 
				'大兴隆山风电场',
				'黑山风电场'];
				*/
var farmname = {};

function createHome () {
	hideall ();
	page = "home";

	$.getJSON("getfarmnames", function(data) {
		$('#content').append ('<div class="panel-heading">\
				风场：\
				<select>\
					<option value="">锦州白石全一风电场</option>\
					<option value="">锦州北镇风电场</option>\
					<option value="">锦州大兴隆山风电场</option>\
					<option value="">国电黑山芳山风电场</option>\
				</select>\
			</div>');
		resizeAll();
	});
}

function gohome ( a ) {
	nagmenu ( a );
	createHome ();
}

function resizeHome ( height, width, margintop, marginleft ) {
	var mapwidth = 800;
	var mapheight = 540;
	var ratiow = width/mapwidth;
	var ratioy = height/mapheight;
	var ratio = ratioy;
	var margtop = 0;
	var margleft = 0;


	if ( ratiow < ratioy )  {
		ratio = ratiow;
		$('#content').find('.map').width ( width );
		$('#content').find('.map').height ( mapheight*ratio );
		margtop = (height-mapheight*ratio)/2;
		$('#content').find('.map').css ( "margin-top", margtop );
	} else {
		ratio = ratioy;
		$('#content').find('.map').width ( mapwidth*ratio );
		$('#content').find('.map').height ( height );
		margleft = (width-mapwidth*ratio)/2;
		$('#content').find('.map').css ( "margin-left", margleft );
	}

	$('#farminfo1').css ( 'top', margtop+margintop+20*ratio );
	$('#farminfo1').css ( 'left', margleft+marginleft+100*ratio );
	$('#farminfo1').find('table').height($('#farminfo1').height()-32) ;

	$('#farminfo2').css ( 'top', margtop+margintop+350*ratio );
	$('#farminfo2').css ( 'left', margleft+marginleft+130*ratio );
	$('#farminfo2').find('table').height($('#farminfo1').height()-32) ;

	$('#farminfo3').css ( 'top', margtop+margintop+10*ratio );
	$('#farminfo3').css ( 'left', margleft+marginleft+600*ratio );
	$('#farminfo3').find('table').height($('#farminfo1').height()-32) ;

	$('#farminfo4').css ( 'top', margtop+margintop+350*ratio );
	$('#farminfo4').css ( 'left', margleft+marginleft+550*ratio );
	$('#farminfo4').find('table').height($('#farminfo1').height()-32) ;
}

function updateHome () {
	$.getJSON("updatehome", function(data) {
		$.each(data.home, function(name,item){
			$('#farmpower'+item[0]).html(Math.round(item[1]/10)/100);
			$('#farmwind'+item[0]).html(Math.round(item[2])/10);
			$('#farmnums'+item[0]).html(item[3]);
		});
	});
}
