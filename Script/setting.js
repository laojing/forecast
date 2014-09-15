function createSetting ( ) {
	var height = $(window).height();		
	var width = $(window).width();		
	var cont = '<div class="panel-heading">风场风机设置</div>';
	cont += '<div id="farm" class="farmmenu"></div>';
	updateFarmList ( 'ClickFarm','ClickTurbine' );

	cont += '<h1 class="commandtitle"></h1>';
	cont += '<div id="commandresult"></div>';
	$('#content').html(cont);
	$('#farm').height(height-140);
}

function gosetting ( a ) {
	nagmenu ( a );
	hideall ();
	page = "setting";
	createSetting();
	resizeAll();
}


function resizeSetting ( height, width ) {
	$('#farm').height(height-30);
	$('#commandresult').height(height-160);
}

function ClickFarm ( a, link ) {
	$('.commandtitle').html( farmname[farmnum]+'设置' );

	var cont = '<table id="resulttable"><tr>';
	cont += '<td><label class="laojing">风场编号：</label></td>';
	cont += '<td><input style="width:300px;" type="text" class="laojing" id="startdate" value="13455"/></td>';
	cont += '</tr><tr><td><label class="laojing">风场名称：</label></td>';
	cont += '<td><input style="width:300px;" type="text" class="laojing" id="startdate" value="'+farmname[link]+'"/></td>';
	cont += '</tr><tr><td><label class="laojing">风场别名：</label></td>';
	cont += '<td><input style="width:300px;" type="text" class="laojing" id="startdate" value="'+farmname[link]+'"/></td>';
	cont += '</tr><tr><td><label class="laojing">投资方名称：</label></td>';
	cont += '<td><input style="width:300px;" type="text" class="laojing" id="startdate" value="中电投新能源"/></td>';
	cont += '</tr><tr><td><label class="laojing">风场地址：</label></td>';
	cont += '<td><input style="width:300px;" type="text" class="laojing" id="startdate" value="锦州市黑山"/></td>';
	cont += '</tr><tr><td><label class="laojing">装机台数：</label></td>';
	cont += '<td><input style="width:300px;" type="text" class="laojing" id="startdate" value="22"/></td>';
	cont += '</tr><tr><td><label class="laojing">装机容量：</label></td>';
	cont += '<td><input style="width:300px;" type="text" class="laojing" id="startdate" value="49500kW"/></td>';
	cont += '</tr><tr><td><label class="laojing">风场负责人：</label></td>';
	cont += '<td><input style="width:300px;" type="text" class="laojing" id="startdate" value="胡一刀"/></td>';
	cont += '</tr><tr><td><label class="laojing">风场负责人电话：</label></td>';
	cont += '<td><input style="width:300px;" type="text" class="laojing" id="startdate" value="13592345552"/></td>';
	cont += '</tr><tr><td><label class="laojing">风场联系电话：</label></td>';
	cont += '<td><input style="width:300px;" type="text" class="laojing" id="startdate" value="13592345552"/></td>';
	cont += '</tr></table>';
	cont += '<hr/>';
	cont += '<input type="button" class="laojing" onclick="CheckLog()" value="保存"></input>';

	$('#commandresult').html( cont );
	select ( a, link );
}

function ClickTurbine ( a, link ) {
	$('.commandtitle').html( farmname[farmnum]+'第'+(turbinenum+1)+'号机组设置' );

	select ( a, link );
}

