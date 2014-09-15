function createMonitor ( ) {
	var height = $(window).height();		
	var width = $(window).width();		
	var cont = '<div class="panel-heading">风机实时监控</div>';
	cont += '<div id="farm" class="farmmenu"></div>';
	updateFarmList ( 'select','MonitorDetail' );
	cont += '<button id="controlturb" class="laojing" onclick="ControlTurb()">'+ctrlbtnDisp[turbrunning]+'</button>';
	cont += '<canvas id="monitorcanvas" width="'+(width-510)+'px" height="'+(height-140)+'px"></canvas>';

	$('#content').html(cont);
	$('#farm').height(height-140);
}

var ismonitorupdate = false;
function gomonitor ( a ) {
	nagmenu ( a );
	hideall ();
	page = "monitor";
	ismonitorupdate = false;
	resizeAll();
}

function roundRect ( context, x, y, w, h, radius ) {
	var r = x + w;
	var b = y + h;
	context.moveTo(x+radius, y);
	context.lineTo(r-radius, y);
	context.quadraticCurveTo(r, y, r, y+radius);
	context.lineTo(r, y+h-radius);
	context.quadraticCurveTo(r, b, r-radius, b);
	context.lineTo(x+radius, b);
	context.quadraticCurveTo(x, b, x, b-radius);
	context.lineTo(x, y+radius);
	context.quadraticCurveTo(x, y, x+radius, y);
}


function resizeMonitor ( height, width ) {
	createMonitor();
	initMonitor ();
	updateMonitorUI();
}

var monitorURL;
function initMonitor () {
	var mHeight = $('#monitorcanvas').height();
	var mWidth = $('#monitorcanvas').width();

	var can = document.getElementById ( 'monitorcanvas' );
	var context = can.getContext ( '2d' );
	context.fillStyle = "#fff";
	context.fillRect ( 0, 0, mWidth, mHeight );

	var title = 40;
	mHeight = mHeight - 4*title;

	context.lineWidth = 0.5;
	context.font = '12px "LiHei Pro"';
	context.strokeStyle = "#ddd";
	context.fillStyle = "#888";
	context.beginPath ();
	context.fillText ( "风机主状态", 10, 10 );
	roundRect ( context, 10, 20, mWidth/2-20, mHeight/7, 5 );

	var top = mHeight/7 + title;
	context.fillText ( "通用参数", 10, top+10 );
	roundRect ( context, 10, top+20, mWidth/2-20, mHeight*3/14, 5 );

	top = mHeight*5/14 + 2*title;
	context.fillText ( "风轮和发电机转速", 10, top+10 );
	roundRect ( context, 10, top+20, mWidth/2-20, mHeight*4/14, 5 );

	top = mHeight*9/14 + 3*title;
	context.fillText ( "机械参数", 10, top+10 );
	roundRect ( context, 10, top+20, (mWidth/2-20)*2/3, mHeight*5/14, 5 );
	context.fillText ( "桨距角", 20+(mWidth/2-20)*2/3, top+10 );
	roundRect ( context, 20+(mWidth/2-20)*2/3, top+20, (mWidth/2-20)/3-10, mHeight*5/14, 5 );

	mHeight = mHeight + title;
	context.fillText ( "温度风向", 10+mWidth/2, 10 );
	roundRect ( context, 10+mWidth/2, 20, mWidth/2-20, mHeight*2/5, 5 );

	top = mHeight*2/5 + title;
	context.fillText ( "功率因数", 10+mWidth/2, top+10 );
	roundRect ( context, 10+mWidth/2, top+20, mWidth/2-20, mHeight*1/10, 5 );

	top = mHeight/2 + 2*title;
	context.fillText ( "电气参数", 10+mWidth/2, top+10 );
	roundRect ( context, 10+mWidth/2, top+20, mWidth/2-20, mHeight/2, 5 );

	context.closePath();
	context.stroke();

	$('#controlturb').css('margin-left', 220);
	$('#controlturb').css('margin-top', 25+mHeight/14-$('#controlturb').height()/2);

	mHeight = mHeight - title;

	context.font = 'bold 18px "LiHei Pro"';
	var turbStatus = "正在更新...";
	var len = context.measureText ( turbStatus );
	context.fillText ( turbStatus, 10+(mWidth/2-20)/2-len.width/2, 25+mHeight/14 );
	context.stroke();

	//General
	context.font = 'bold 12px "LiHei Pro"';
	top = mHeight/7 + title;
	context.strokeStyle = "#888";
	roundRect ( context, 30, top+20+mHeight*3/14/4, 
				mWidth/2-120, 10, 4 );
	context.stroke();
	context.beginPath ();
	roundRect ( context, 30, top+20+mHeight*3/14/4, 
				mWidth/2-120, 10, 4 );
	context.closePath ();
	context.shadowColor = "rgba(0, 0, 0, 0.6)";
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 5;
	context.shadowBlur = 10;
	context.fillStyle = "white"
	context.fill();
	context.shadowOffsetY = 0;
	context.shadowBlur = 0;

	//Valuebar
	context.fillStyle = "#669"
	context.fillText ( "0.0 kW", 
				mWidth/2-80, top+20+mHeight*3/14/4+10);
	context.stroke();

	context.strokeStyle = "#ddd";
	roundRect ( context, 30, top+20+mHeight*3/14*3/4-10, 
				mWidth/2-120, 10, 4 );
	context.stroke();

	context.beginPath ();
	roundRect ( context, 30, top+20+mHeight*3/14*3/4-10, 
				mWidth/2-120, 10, 4 );
	context.closePath ();
	context.shadowColor = "rgba(0, 0, 0, 0.6)";
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 5;
	context.shadowBlur = 10;
	context.fillStyle = "white"
	context.fill();

	//Valuebar
	context.shadowOffsetY = 0;
	context.shadowBlur = 0;
	context.fillStyle = '#66d';
	context.fillText ( "0.0 m/s", 
				mWidth/2-80, top+20+mHeight*3/14*3/4);
	context.stroke ();


	top = mHeight*5/14 + 2*title;
	drawGauge ( context, 0, 20, 4, 14,
			"风轮", "rpm", "rightdown",
			10, top+20, (mWidth/2-20)/2, mHeight*4/14,
			Math.PI/2, Math.PI*2);
	drawGauge ( context, 0, 2000, 4, 1224,
			"发电机", "rpm", "rightdown",
			10+(mWidth/2-20)/2, top+20, (mWidth/2-20)/2, mHeight*4/14,
			Math.PI/2, Math.PI*2);

	//Mechanical
	top = mHeight*9/14 + 3*title;
	var mechHeight = mHeight*5/14/7;
	context.font = '12px "LiHei Pro"';
	context.fillStyle = "#666"; 
	context.fillText ( "刹车状态：", 20, top+20+mechHeight );
	context.fillText ( "偏航状态：", 20, top+20+2*mechHeight );
	context.fillText ( "振动1x方向：", 20, top+20+3*mechHeight );
	context.fillText ( "振动1y方向：", 20, top+20+4*mechHeight );
	context.fillText ( "振动2x方向：", 20, top+20+5*mechHeight );
	context.fillText ( "振动2y方向：", 20, top+20+6*mechHeight );

	context.font = 'bold 12px "LiHei Pro"';
	context.fillText ( "---", 10+(mWidth/2-20)*2/6, top+20+mechHeight );
	context.fillText ( "---", 10+(mWidth/2-20)*2/6, top+20+2*mechHeight );
	context.fillText ( "0.0 mm/s", 10+(mWidth/2-20)*2/6, top+20+3*mechHeight );
	context.fillText ( "0.0 mm/s", 10+(mWidth/2-20)*2/6, top+20+4*mechHeight );
	context.fillText ( "0.0 mm/s", 10+(mWidth/2-20)*2/6, top+20+5*mechHeight );
	context.fillText ( "0.0 mm/s", 10+(mWidth/2-20)*2/6, top+20+6*mechHeight );
	context.shadowOffsetY = 0;
	context.shadowBlur = 0;
	context.stroke();

	drawGauge ( context, 0, 90, 3, 78,
			"桨距角", "deg", "down",
			10+(mWidth/2-20)*2/3, top+20, (mWidth/2-20)/3, mHeight*5/14,
			Math.PI*5/4, Math.PI*7/4);


	mHeight = mHeight + title;
	top = title-10;

	context.fillText ( "发电机温度", 20+mWidth/2, top+10 );
	drawBarGround ( context, 20+mWidth/2, top+20, mWidth/5, 8, 4 );
	context.stroke();
	
	var tempHeight = mHeight*2/5/3;
	context.fillText ( "机舱温度", 20+mWidth/2, top+10+tempHeight );
	drawBarGround ( context, 20+mWidth/2, top+20+tempHeight, mWidth/5, 8, 4 );
	context.stroke();

	context.fillText ( "环境温度", 20+mWidth/2, top+10+2*tempHeight );
	drawBarGround ( context, 20+mWidth/2, top+20+2*tempHeight, mWidth/5, 8, 4 );
	context.stroke();

	drawWindDirectory ( context, 
				20+mWidth/2+mWidth/5+50, 20, 
				mWidth/2-mWidth/5-80,mHeight*2/5 );


	top += 10;
	top += title + mHeight*2/5;

	drawPowerFactorGround ( context, 20+mWidth/2, top, mWidth/3, 8, 4 );
	context.stroke();
	
	//Electrical
	top = mHeight/2 + 2*title;
	drawGauge ( context, 0, 1000, 4, 994,
			"电压", "V", "down",
			10+mWidth/2, top+20, (mWidth/2-20)/2, mHeight/4,
			Math.PI, Math.PI*7/4);
	drawGauge ( context, 0, 3000, 3, 2994,
			"电流", "A", "down",
			10+mWidth*3/4, top+20, (mWidth/2-20)/2, mHeight/4,
			Math.PI, Math.PI*7/4);


	drawGauge ( context, -1500, 1500, 2, 1494,
			"无功功率", "kVAr", "down",
			10+mWidth/2, top+20+mHeight/4, (mWidth/2-20)/2, mHeight/4,
			Math.PI*5/4, Math.PI*7/4);

	drawGauge ( context, 49, 51, 4, 50,
			"电网频率", "Hz", "down",
			10+mWidth*3/4, top+20+mHeight/4, (mWidth/2-20)/2, mHeight/4,
			Math.PI*5/4, Math.PI*7/4);
}

function drawText ( context, value, rad, radius, x, y, span ) {
	context.save();
	var len = context.measureText(value.toString());
	var x1 = (radius) * Math.cos(rad);
	var y1 = (radius) * Math.sin(rad);
	context.translate ( x, y );
	context.rotate ( rad + Math.PI/2 );
	context.fillText ( value.toString(), -len.width/2, -span-radius );
	context.restore();
}

function drawLine ( context, rad, radius1, radius2, x, y ) {
	var x1 = x + radius1 * Math.cos(rad);
	var y1 = y + radius1 * Math.sin(rad);
	var x2 = x + radius2 * Math.cos(rad);
	var y2 = y + radius2 * Math.sin(rad);
	context.moveTo ( x1, y1 );
	context.lineTo ( x2, y2 );
}

function drawGauge ( context, limitx, limit, span, value, 
			title, unit, align,
			x, y, w, h,
			start, end ) {
	var radius = w/2;
	if ( h < w ) radius = h/2;
	radius -= 15;
	context.lineWidth = 1;

	context.beginPath(); 
	context.arc(x+w/2, y+h/2, radius-5, end, start, true); 
	context.arc(x+w/2, y+h/2, radius, start, end, false); 
	context.closePath(); 
	context.shadowColor = "rgba(0, 0, 0, 0.6)"; 
	context.shadowOffsetX = 0; 
	context.shadowOffsetY = 2; 
	context.shadowBlur = 4; 
	context.strokeStyle = "white";
	context.fillStyle = "white"; 
	context.fill();	
	context.stroke();

	context.font = "10px 'LiHei Pro'";
	context.fillStyle = "#888"; 
	context.beginPath(); 
	for ( var i=0; i<=span; i++ ) {
		var r = start + i*(end-start)/span;
		drawLine ( context, r, radius-6, radius-12, x+w/2, y+h/2 );
		drawText ( context, limitx+i*((limit-limitx)/span), r, radius, x+w/2, y+h/2, 6 );
	}
	context.closePath(); 
	context.strokeStyle = "#aaa";
	context.shadowOffsetY = 0; 
	context.shadowBlur = 0; 
	context.stroke();
}

function drawGaugeValue ( context, limitx, limit, span, value, 
			title, unit, align,
			x, y, w, h,
			start, end ) {
	var radius = w/2;
	if ( h < w ) radius = h/2;
	radius -= 15;
	context.lineWidth = 1;

	context.beginPath(); 
		context.arc(x+w/2, y+h/2, radius-12, 0, Math.PI*2, true); 
	context.closePath(); 
	context.fillStyle = "#fff"; 
	context.strokeStyle = "#fff"; 
	context.fill();	

	var len = context.measureText(title);
	context.font = "12px 'LiHei Pro'";
	context.fillStyle = "#888"; 
	context.fillText ( title, x+w/2-len.width/2, y+h/2+20 );
	context.stroke();

	var cur = (end - start)/(limit-limitx)*(value-limitx)+start;
	context.lineWidth = 2;
	context.beginPath(); 
	drawLine ( context, cur, 0, radius-12, x+w/2, y+h/2 );
	drawLine ( context, cur-Math.PI, 0, 8, x+w/2, y+h/2 );
	context.closePath(); 
	context.strokeStyle = "#666";
	context.stroke();

	context.beginPath(); 
		context.arc(x+w/2, y+h/2, 5, 0, Math.PI*2, true); 
	context.closePath(); 
	context.shadowColor = "rgba(0, 0, 0, 0.6)"; 
	context.shadowOffsetX = 0; 
	context.shadowOffsetY = 1; 
	context.shadowBlur = 2; 
	context.strokeStyle = "#ddd";
	context.fillStyle = "#666"; 
	context.fill();	
	context.shadowOffsetX = 0; 
	context.shadowOffsetY = 0; 
	context.shadowBlur = 0; 

	context.font = "12px 'LiHei Pro'";
	var len = context.measureText (value+' '+unit);
	if ( align == 'rightdown' ) {
		context.fillStyle = "#fff";
		context.strokStyle = "#fff";
		context.fillRect ( x+w/2+10, y+h*4/5-10, len.width, 20 );
		context.stroke();
		context.fillStyle = "#666"; 
		context.fillText ( value+' '+unit, x+w/2+10, y+h*4/5 );
	} else  if ( align == 'down' ) {
		context.fillStyle = "#fff";
		context.strokStyle = "#fff";
		context.fillRect ( x+w/2-len.width/2, y+h/2+radius*3/4-10, len.width, 20 );
		context.fillStyle = "#666"; 
		context.fillText ( value+' '+unit, x+w/2-len.width/2, y+h/2+radius*3/4 );	
	}
	context.stroke();
	context.shadowBlur = 0; 
}

function drawWindDirectory ( context, x, y, w, h ) {
	var radius = w/2;
	if ( h < w ) radius = h/2;
	radius -= 15;
	context.lineWidth = 1;
	var start = 0;
	var end = Math.PI*2;

	context.beginPath(); 
	context.arc(x+w/2, y+h/2, radius-5, end, start, true); 
	context.arc(x+w/2, y+h/2, radius, start, end, false); 
	context.closePath(); 
	context.shadowColor = "rgba(0, 0, 0, 0.6)"; 
	context.shadowOffsetX = 0; 
	context.shadowOffsetY = 2; 
	context.shadowBlur = 4; 
	context.strokeStyle = "white";
	context.fillStyle = "white"; 
	context.fill();	
	context.stroke();

	var span = 8;
	context.font = "10px 'LiHei Pro'";
	context.fillStyle = "#888"; 
	context.beginPath(); 
	context.shadowOffsetY = 0; 
	context.shadowBlur = 0; 
	var dirname = ['东','东南','南','西南','西','西北','北','东北'];
	for ( var i=0; i<span; i++ ) {
		var r = start + i*(end-start)/span;
		drawLine ( context, r, radius-6, radius-12, x+w/2, y+h/2 );
		drawText ( context, dirname[i], r, radius, x+w/2, y+h/2, 6 );
	}
	context.closePath(); 
	context.strokeStyle = "#aaa";
	context.stroke();
	
	context.shadowOffsetX = 0; 
	context.shadowOffsetY = 0; 
	context.shadowBlur = 0; 
}

	
function drawWindDirectoryValue ( context, value, x, y, w, h ) {
	var radius = w/2;
	if ( h < w ) radius = h/2;
	radius -= 15;
	context.lineWidth = 1;
	var start = 0;
	var end = Math.PI*2;

	context.beginPath(); 
		context.arc(x+w/2, y+h/2, radius-12, 0, Math.PI*2, true); 
	context.closePath(); 
	context.fillStyle = "#fff"; 
	context.fill();	

	context.lineWidth = 2;
	context.beginPath(); 
	var cur = (value/180*Math.PI - Math.PI/2);
	drawLine ( context, cur, 0, radius-12, x+w/2, y+h/2 );
	drawLine ( context, cur-Math.PI, 0, 8, x+w/2, y+h/2 );
	context.closePath(); 
	context.strokeStyle = "#666";
	context.shadowOffsetY = 0; 
	context.shadowBlur = 0; 
	context.stroke();

	context.beginPath(); 
		context.arc(x+w/2, y+h/2, 5, 0, Math.PI*2, true); 
	context.closePath(); 
	context.shadowColor = "rgba(0, 0, 0, 0.6)"; 
	context.shadowOffsetX = 0; 
	context.shadowOffsetY = 1; 
	context.shadowBlur = 2; 
	context.strokeStyle = "#ddd";
	context.fillStyle = "#666"; 
	context.fill();	
	context.shadowOffsetX = 0; 
	context.shadowOffsetY = 0; 
	context.shadowBlur = 0; 
	context.stroke();

	context.font = 'bold 12px "LiHei Pro"';
	var len = context.measureText ( value+" deg" );
	context.fillStyle = "#666"; 
	context.fillText ( value+" deg", x+w/2-len.width/2, y+h/2+30 );
}

function drawBarValueClear ( context, x, y, w, h, r ) {
	context.beginPath ();
	context.fillStyle = "#fff"
	roundRect ( context, x, y, w, h, r );
	context.closePath ();
	context.fill();
}
function drawBarValue ( context, x, y, w, h, r ) {
	context.beginPath ();
	context.fillStyle = "#666"
	roundRect ( context, x, y, w, h, r );
	context.closePath ();
	context.fill();
}

function drawPowerFactorGround ( context, x, y, w, h, r ) {
	context.lineWidth = 1;
	context.strokeStyle = "#eee";
	roundRect ( context, x, y, w, h, r );
	context.stroke();
	context.beginPath ();
	roundRect ( context, x, y, w, h, r );
	context.closePath ();
	context.shadowColor = "rgba(0, 0, 0, 0.2)";
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 5;
	context.shadowBlur = 10;
	context.fillStyle = "white"
	context.fill();
	context.stroke();

	context.beginPath ();
	context.strokeStyle = "#888";
	context.fillStyle = "#888";
	var span = (w-6)/5;
	for ( var i=0; i<=5; i++ ) {
		context.moveTo ( x+3 + i*span, y + h + 3 );
		context.lineTo ( x+3 + i*span, y + h + 8 );
		var value = Math.round(i*2)/10;
		var len = context.measureText(value.toString());
		context.fillText ( value.toString(), x+i*span-len.width/2, y+h+18 );
	}
	context.closePath ();
	context.stroke();

	context.shadowOffsetY = 0;
	context.shadowBlur = 0;
}


function drawBarGround ( context, x, y, w, h, r ) {
	context.lineWidth = 1;
	context.strokeStyle = "#eee";
	roundRect ( context, x, y, w, h, r );
	context.stroke();
	context.beginPath ();
	roundRect ( context, x, y, w, h, r );
	context.closePath ();
	context.shadowColor = "rgba(0, 0, 0, 0.2)";
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 5;
	context.shadowBlur = 10;
	context.fillStyle = "white"
	context.fill();
	context.stroke();

	context.beginPath ();
	context.strokeStyle = "#888";
	context.fillStyle = "#888";
	var span = w/3;
	for ( var i=0; i<=3; i++ ) {
		context.moveTo ( x + i*span, y + h + 3 );
		context.lineTo ( x + i*span, y + h + 8 );
		var value = i*50;
		var len = context.measureText(value.toString());
		context.fillText ( value.toString(), x+i*span-len.width/2, y+h+18 );
	}
	context.closePath ();
	context.stroke();

	context.shadowOffsetY = 0;
	context.shadowBlur = 0;
}
