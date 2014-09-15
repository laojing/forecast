var reportclasses = ['单机','风场'];
var reporttypes = ['日报表',
				'月报表',
				'年报表'];
var reportcolumns = ['时间',
					'平均风速(m/s)',
					'输出功率(kW)',
					'发电机转速(rpm)',
					'总发电量(kWh)'];
function createReport ( ) {
	var height = $(window).height();		
	var width = $(window).width();		
	var cont = '<div class="panel-heading">风机报表</div>';
	cont += '<div id="farm" class="farmmenu"></div>';
	updateFarmList ( 'select','select' );

	cont += '<div id="commandbar"><table width="100%"><tr><td><table><tr>\
			<td><input type="radio" checked="checked" name="reportClass" value="0"/></td>\
			<td><label for="reportClass">'+reportclasses[0]+'</label></td>\
			<td><input type="radio" name="reportClass"  value="1"/></td>\
			<td><label for="reportClass">'+reportclasses[1]+'</label></td>\
			<td><input type="radio" checked="checked" name="reportType" value="0"/></td>\
			<td><label for="reportType">'+reporttypes[0]+'</label></td>\
			<td><input type="radio" name="reportType"  value="1"/></td>\
			<td><label for="reportType">'+reporttypes[1]+'</label></td>\
			<td><input type="radio" name="reportType"  value="2"/></td>\
			<td><label for="reportType">'+reporttypes[2]+'</label></td>\
			</tr></table></td>\
			<td aling="right"><table><tr>\
			<td><input type="text" class="laojing" id="startdate" value="2014-01-01"/></td>\
			<td><label>到</label></td>\
			<td><input type="text" class="laojing" id="enddate" value="2014-05-01"/></td>\
			<td><input type="button" class="laojing" onclick="CheckReport()" value="查询"></input></td>\
			<td><input type="button" class="laojing" value="导出"></input></td>\
			</tr></table></td></tr></table></div>';
	cont += '<h1 class="commandtitle"></h1>';
	cont += '<div id="commandresult"></div>';

	$('#content').html(cont);
	$('#startdate').datepicker({dateFormat:'yy-mm-dd'});
	$('#enddate').datepicker({dateFormat:'yy-mm-dd'});
}

function goreport ( a ) {
	nagmenu ( a );
	hideall ();
	page = "report";
	createReport();
	resizeAll();
}


function resizeReport ( height, width ) {
	$('#farm').height(height-30);
	$('#commandresult').height(height-160);
}

function CheckReport () {
	var stype = reporttypes[$("input[name='reportType']:checked").val()];
	var sclass = $("input[name='reportClass']:checked").val();

	if ( sclass == 0 ) {
		$('.commandtitle').html( farmname[farmnum]+'第'+(turbinenum+1)+'号机组'
			+$('#startdate').val()+'到'+$('#enddate').val()+stype);
	} else {
		$('.commandtitle').html( farmname[farmnum]
			+$('#startdate').val()+'到'+$('#enddate').val()+stype);
	}

	var cont = '<table id="hor-zebra"><thead>';
	for ( var i=0; i<reportcolumns.length; i++ ) {
		cont += '<th>'+reportcolumns[i]+'</th>';
	}
	cont += '</thead><tbody>';
	var d = new Date();
	var energy = 103;
	for ( var i=0; i<200; i++ ) {
		if ( i % 2 == 0 ) { cont += '<tr class="odd">';
		} else { cont += '<tr>'; }
		d.setDate ( d.getDate() - 1 );
		cont += '<td>'+d.toLocaleDateString('zh')+' '+d.toLocaleTimeString('zh')+'</td>';
		cont += '<td>'+Math.round((11.3+3*Math.sin(i))*10)/10+'</td>';
		cont += '<td>'+Math.round(1453+30*Math.sin(i))+'</td>';
		cont += '<td>'+Math.round(1003+50*Math.sin(i))+'</td>';
		energy = energy + 30*Math.sin(i);
		cont += '<td>'+Math.round(energy)+'</td>';
		cont += '</tr>';
	}
	cont += '</tbody></table>';
	$('#commandresult').html( cont );
}

