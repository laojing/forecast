function createFarmDetail () {
	var height = $(window).height();		
	var width = $(window).width();		
	$.getJSON("getfarmturbines",{farmnum:farmnum}, function(data) {
		var cont = '<div class="panel-heading">'+farmname[farmnum]+'总览</div>';

		cont += '<div id="turbinedetail"><table><tr>';
		var cols = Math.floor((width-350) / 182);

		$.each(data.turbines, function(name,item){
			if ( name != 0 && name%cols == 0 ) {
				cont += '</tr><tr>';
			}
			cont += '<td><div class="turbine">';
			cont += '<h3 id="name'+(name+1)+'">'+item[1]+'</h3><hr/>';
			cont += '<div class="blade"></div>';
			cont += '<div class="tower"></div>';
			cont += '<table id="detailtable">\
					<tr><td>风速</td> 	<td id="windspeed'+(name+1)+'">---</td><td>m/s</td> </tr>\
					<tr><td>功率</td> 	<td id="power'+(name+1)+'">--</td><td>kW</td> </tr>\
					<tr><td>转速</td> 	<td id="genspeed'+(name+1)+'">---</td><td>rpm</td> </tr>\
				</table>';
			cont += '</div></td>';
		});
		cont += '</tr></table></div>';
		$('#content').html(cont);
		$('#turbinedetail').height(height-160);
	});
}

function FarmDetail ( farm ) {
	hideall ();
	farmnum = farm;
	page = "farmdetail";
	resizeAll();
}

function resizeFarmDetail () {
	createFarmDetail();
}

function updateFarmDetail () {
	$.getJSON("getturbineover",{farmnum:farmnum}, function(data) {
		$.each(data.turbines, function(name,item){
			$('#windspeed'+parseInt(item[0])).html(item[1]/10);
			$('#power'+parseInt(item[0])).html(item[2]);
			$('#genspeed'+parseInt(item[0])).html(item[3]/10);
		});
	});
}
