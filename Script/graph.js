var graphtypes = ['功率曲线',
				'风向玫瑰图'];
var curgraph = 1;
function createGraph ( ) {

	var height = $(window).height();		
	var width = $(window).width();		
	var cont = '<div class="panel-heading">风机图表查询</div>';
	cont += '<div id="farm" class="farmmenu"></div>';
	updateFarmList ( 'select','select' );

	var cur1 = '';
	var cur2 = '';
	if ( curgraph == 0 ) cur1 = 'checked="checked"';
	if ( curgraph == 1 ) cur2 = 'checked="checked"';

	cont += '<div id="commandbar"><table width="100%"><tr><td><table><tr>\
			<td><input type="radio" '+cur1+' name="graphType" value="0"/></td>\
			<td><label for="graphType">'+graphtypes[0]+'</label></td>\
			<td><input type="radio" '+cur2+' name="graphType"  value="1"/></td>\
			<td><label for="graphType">'+graphtypes[1]+'</label></td>\
			</tr></table></td>\
			<td aling="right"><table><tr>\
			<td><input type="text" class="laojing" id="startdate" value="2014-01-01"/></td>\
			<td><label>到</label></td>\
			<td><input type="text" class="laojing" id="enddate" value="2014-05-01"/></td>\
			<td><input type="button" class="laojing" onclick="DrawGraph()" value="绘图"></input></td>\
			<td><input type="button" class="laojing" onclick="ClearGraph()" value="清除"></input></td>\
			</tr></table></td></tr></table></div>';
	cont += '<h1 class="commandtitle"></h1>';
	cont += '<div id="commandresult"></div>';

	cont += '<canvas id="graphcanvas" width="'+(width-510)+'px" height="'+(height-260)+'px"></canvas>';

	$('#content').html(cont);
	$('#farm').height(height-140);
	$('#startdate').datepicker({dateFormat:'yy-mm-dd'});
	$('#enddate').datepicker({dateFormat:'yy-mm-dd'});
}

function gograph ( a ) {
	nagmenu ( a );
	hideall ();
	page = "graph";
	resizeAll();
}

function resizeGraph ( height, width ) {
	createGraph ();
	DrawGraph ();
}

function DrawGraph ( ) {
	var stype = graphtypes[$("input[name='graphType']:checked").val()];
	$('.commandtitle').html( farmname[farmnum]+'第'+(turbinenum+1)+'号机组'
			+$('#startdate').val()+'到'+$('#enddate').val()+stype);

	if ( $("input[name='graphType']:checked").val() == 0 ) {
		curgraph = 0;
		drawPowerCurvel ();
	} else {
		curgraph = 1;
		drawRose ();
	}
}

function ClearGraph () {
	var mHeight = $('#graphcanvas').height();
	var mWidth = $('#graphcanvas').width();
	var width = mWidth;
	var height = mHeight;
	var can = document.getElementById ( 'graphcanvas' );
	var context = can.getContext ( '2d' );
	context.clearRect ( 0, 0, width, height );
}
