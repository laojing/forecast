var statistypes = ['历史日志',
				'故障日志',
				'故障统计'];
var turbstatus = ['启动','加速','停止','发电','待机'];

function createStatis ( ) {
	var height = $(window).height();		
	var width = $(window).width();		
	var cont = '<div class="panel-heading">风机历史统计查询</div>';
	cont += '<div id="farm" class="farmmenu"></div>';
	updateFarmList ( 'select','select' );

	cont += '<div id="commandbar"><table width="100%"><tr><td><table><tr>\
			<td><input type="radio" checked="checked" name="statisType" value="0"/></td>\
			<td><label for="statisType">'+statistypes[0]+'</label></td>\
			<td><input type="radio" name="statisType"  value="1"/></td>\
			<td><label for="statisType">'+statistypes[1]+'</label></td>\
			<td><input type="radio" name="statisType" value="2"/></td>\
			<td><label for="statisType">'+statistypes[2]+'</label></td>\
			</tr></table></td>\
			<td aling="right"><table><tr>\
			<td><input type="text" class="laojing" id="startdate" value="2014-01-01"/></td>\
			<td><label>到</label></td>\
			<td><input type="text" class="laojing" id="enddate" value="2014-05-01"/></td>\
			<td><input type="button" class="laojing" onclick="CheckLog()" value="查询"></input></td>\
			<td><input type="button" class="laojing" value="导出"></input></td>\
			</tr></table></td></tr></table></div>';
	cont += '<h1 class="commandtitle"></h1>';
	cont += '<div id="commandresult"></div>';

	$('#content').html(cont);
	$('#startdate').datepicker({dateFormat:'yy-mm-dd'});
	$('#enddate').datepicker({dateFormat:'yy-mm-dd'});
}

function gostatis ( a ) {
	nagmenu ( a );
	hideall ();
	page = "statis";
	createStatis();
	resizeAll();
}


function resizeStatis ( height, width ) {
	$('#farm').height(height-30);
	$('#commandresult').height(height-160);
}

function CheckLog () {
	var stype = statistypes[$("input[name='statisType']:checked").val()];
	$('.commandtitle').html( farmname[farmnum]+'第'+(turbinenum+1)+'号机组'
			+$('#startdate').val()+'到'+$('#enddate').val()+stype+'查询');

	var cont = '<table id="hor-zebra"><tbody>';
	var d = new Date();
	for ( var i=0; i<200; i++ ) {
		if ( i % 2 == 0 ) { cont += '<tr class="odd">';
		} else { cont += '<tr>'; }
		d.setMinutes ( d.getMinutes() - 1 );
		cont += '<td>'+d.toLocaleDateString('zh')+' '+d.toLocaleTimeString('zh')+'</td>';
		cont += '<td>'+turbstatus[i%5]+'</td>';
		cont += '</tr>';
	}
	cont += '</tbody></table>';
	$('#commandresult').html( cont );
}

