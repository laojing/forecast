function createStandard ( ) {
	var height = $(window).height();		
	var width = $(window).width();		
	var cont = '<div class="panel-heading">风电功率预测功能规范</div>';
	cont += '<div class="standardcontent"></div>';
	$('#content').html(cont);

	$.getJSON("html", { geturl: 'Standard' }, function(data) {
	    var cont1 = '<h1>风电功率预测功能规范</h1>';
		cont1 += data.html;
		$('.standardcontent').html(cont1);
	});
	$('.standardcontent').height(height-60);
}

function gostandard ( a ) {
	nagmenu ( a );
	hideall ();
	page = "standard";
	createStandard();
	resizeAll();
}


function resizeStandard ( height, width ) {
	$('.standardcontent').height(height-60);
}

