function hideall () {
	page = "none";
	$('#content').html ( '' );
	$('#content').addClass ( 'panel' );
}

function toggle( name ) {
	var tog = $('#'+name).children().eq(0).find('a');
	if ( tog.attr('class') == 'circleup' ) {
		tog.attr('class', 'circledown' );
		$('#'+name).children().each(function() {
			if ( $(this).attr('class') != 'panel-heading' ) {
				$(this).hide();
			}
		});
		tog.attr('data', $('#'+name).height() );
		$('#'+name).height(30);
	} else {
		tog.attr('class', 'circleup' );
		$('#'+name).children().each(function() {
			if ( $(this).attr('class') != 'panel-heading' ) {
				$(this).show();
			}
		});
		$('#'+name).height(tog.attr('data'));
	}
}


function draw () {
	var width = 250;
	var height = 170;
	var xspan = 18;
	var yspan = 15;
	var ylabel = 25;
	var xlabels = ["00:00","08:00","16:00","00:00"];
	var can = document.getElementById ( 'powercanvas' );
	var d = new Date();
	var today = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
	var next = d.getFullYear() + '-' + d.getMonth() + '-' + (d.getDate() + 1);

	var powerdata = [85.950000,85.410000,84.870000,84.350000,84.970000,85.590000,86.230000,86.850000,87.470000,87.850000,88.210000,88.570000,88.930000,89.290000,89.590000,89.890000,90.170000,90.470000,90.750000,90.650000,90.530000,90.410000,90.290000,90.170000,90.390000,90.610000,90.830000,91.050000,91.270000,91.890000,92.510000,93.110000,93.730000,94.350000,94.570000,94.790000,95.010000,95.230000,95.450000,95.490000,95.530000,95.590000,95.630000,95.670000,93.250000,90.810000,88.390000,85.970000,83.530000,83.050000,82.550000,82.070000,81.570000,81.070000,80.910000,80.750000,80.590000,80.430000,80.270000,79.430000,78.590000,77.750000,76.910000,76.050000,76.750000,77.430000,78.130000,78.810000,79.510000,79.310000,79.110000,78.930000,78.730000,78.530000,80.490000,82.470000,84.450000,86.410000,88.390000,89.690000,91.010000];

	var context = can.getContext ( '2d' );
	context.translate ( 0.5, 0.5 );
	context.clearRect ( 0, 0, width, height );

	context.beginPath();
	context.font = '12px LiHei Pro';
	context.moveTo ( ylabel, xspan );
	context.lineTo ( ylabel, height-xspan );
	context.lineTo ( width - yspan, height-xspan );
	context.lineTo ( width - yspan, xspan );
	context.lineTo ( ylabel, xspan );
	var xlen = (width - yspan - ylabel)/(xlabels.length-1);
	for ( var i=1; i<xlabels.length-1; i++ ) {
		context.moveTo ( ylabel + i*xlen, xspan );
		context.lineTo ( ylabel + i*xlen, height - xspan );
		var length = context.measureText ( xlabels[i] );
		context.fillText ( xlabels[i], ylabel + i*xlen - length.width/2, height-5 );
	}
	context.fillText ( xlabels[0], ylabel - length.width/2, height-5 );
	context.fillText ( xlabels[xlabels.length-1], ylabel + (xlabels.length-1)*xlen - length.width/2, height-5 );
	context.fillText ( today, ylabel, xspan-4 );
	var length = context.measureText ( next );
	context.fillText ( next, width-yspan-length.width, xspan-4 );
	var min = Math.min.apply(Math,powerdata);
	var max = Math.max.apply(Math,powerdata);
	var mean = Math.round ( ( min + max )/2 );
	var maxlimit = Math.round ( (max - mean)*3/2 + mean );
	var minlimit = Math.round ( mean - (mean - min)*3/2 );
	length = context.measureText ( minlimit );
	context.fillText ( minlimit, ylabel-length.width-3, height-xspan-2 );
	length = context.measureText ( maxlimit );
	context.fillText ( maxlimit, ylabel-length.width-3, xspan+8 );
	context.moveTo ( ylabel, xspan+(height-2*xspan)/2 );
	context.lineTo ( width-yspan, xspan+(height-2*xspan)/2 );
	length = context.measureText ( mean );
	context.fillText ( mean, ylabel-length.width-3, xspan+(height-2*xspan)/2+3 );
	context.closePath();
	context.strokeStyle = "#ddd";
	context.fillStyle = "#ddd";
	context.stroke();

	var xdisp = width - ylabel - yspan;
	var ydisp = height - 2*xspan;
	var ytotal = maxlimit - minlimit;
	var yvalue = ydisp - (powerdata[0]-minlimit)/ytotal * ydisp;
	context.beginPath();
	context.moveTo ( ylabel, yvalue );
	for ( var i=1; i<powerdata.length; i++ ) {
		yvalue = ydisp - (powerdata[i]-minlimit)/ytotal * ydisp;
		context.lineTo ( ylabel+i/144*xdisp, yvalue );
	}
	context.lineWidth = 2;
	context.strokeStyle = "#88d";
	context.stroke();

	var dataURL = can.toDataURL();
	var canWind = document.getElementById ( 'windcanvas' );
	var ctx = canWind.getContext ( '2d' );
	var img = new Image;
	img.src = dataURL;
	ctx.drawImage ( img, 0, 0 );
	ctx.stroke ();
	//alert ( dataURL );
}



var states = [
			"上电初始化",
			"上电变桨距",
			"上电变流器",
			"上电延时中",
			"检查状态码",
			"启动变桨距",
			"启动变流器",
			"选工作模式",
			"手动速度升",
			"手动功率升",
			"速度上升中",
			"手动速度中",
			"手动功率中",
			"正常发电中",
			"手动初始化",
			"手动运行中",
			"手动退出中",
			"正常停机中",
			"失网停机中",
			"快速停机中",
			"电池停机中",
			"紧急停机中",
			"触发紧急停机",
			"触发电池停机",
			"触发快速停机",
			"触发失网停机",
			"触发正常停机" ];

