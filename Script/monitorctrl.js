var ctrlbtnDisp = ['启动', '停止', '正在启动', '正在停止'];
var turbrunning = 0;

function ControlTurb() {
	if ( turbrunning > 1 ) return;
	if ( !ismonitorupdate ) return;
	$.getJSON("controlturb", {farmnum:farmnum,turbinenum:turbinenum,turbcmd:turbrunning}, function(data) {});
	if ( turbrunning == 0 ) { 
		turbrunning = 2;
	} else if ( turbrunning == 1 ) {
		turbrunning = 3;
	}
}

function MonitorDetail (a, link) {
	initMonitor ();
	ismonitorupdate = true;
	clearMonitorData();
	updateMonitorUI();
	select ( a, link );
}


var turbStatus = "正在更新......";
var turbpowerlimit = 3000;
var turbpower = 0;
var windspeedlimit = 25;
var windspeed = 0;
var rotorspeed = 0;
var genspeed = 0;
var brakestate = '---';
var yawstate = '---';
var vibration1x = 0;
var vibration1y = 0;
var vibration2x = 0;
var vibration2y = 0;
var pitchangle = 0;
var gentemp = 0;
var nactemp = 0;
var outtemp = 0;
var winddirectory = 0;
var powerfactor = 0;
var voltage = 0;
var current = 0;
var varpower = 0;
var frequence = 50;

function clearMonitorData() {
    turbStatus = "正在更新......";
    turbpower = 0;
    windspeed = 0;
    rotorspeed = 0;
    genspeed = 0;
    brakestate = '---';
    yawstate = '---';
    vibration1x = 0;
    vibration1y = 0;
    vibration2x = 0;
    vibration2y = 0;
    pitchangle = 0;
    gentemp = 0;
    nactemp = 0;
    outtemp = 0;
    winddirectory = 0;
	powerfactor = 0;
    voltage = 0;
    current = 0;
    varpower = 0;
    frequence = 50;
}

function updateMonitor () {
	if ( ismonitorupdate ) {
	$('#controlturb').css('display', 'block');
	$('#controlturb').html( ctrlbtnDisp[turbrunning] );

	$.getJSON("updateturb", {farmnum:farmnum,turbinenum:turbinenum}, function(data) {
		turbStatus = states[data.result[0][4]];
		turbpower = data.result[0][5];
		windspeed = data.result[0][6]/10;
		rotorspeed = data.result[0][7]/10;
		genspeed = data.result[0][8]/10;
		brakestate = data.result[0][9];
		yawstate = data.result[0][10];
		vibration1x = data.result[0][11]/100;
		vibration1y = data.result[0][12]/100;
		vibration2x = data.result[0][13]/100;
		vibration2y = data.result[0][14]/100;
		pitchangle = data.result[0][15]/10;
		gentemp = data.result[0][16]/10;
		nactemp = data.result[0][17]/10;
		outtemp = data.result[0][18]/10;
		winddirectory = data.result[0][19]/10;
		powerfactor = data.result[0][20]/100;
		voltage = data.result[0][21]/10;
		current = data.result[0][22]/10;
		varpower = data.result[0][23]/10;
		frequence = data.result[0][24]/10;
		turbrunning = 0;
		if ( genspeed > 10 ) turbrunning = 1;
		updateMonitorUI();
	});
}}

function updateMonitorUI() {
	var mHeight = $('#monitorcanvas').height();
	var mWidth = $('#monitorcanvas').width();
	var can = document.getElementById ( 'monitorcanvas' );
	var context = can.getContext ( '2d' );

	var title = 40;
	mHeight = mHeight - 4*title;

	//Wind Main State
	context.font = 'bold 18px "LiHei Pro"';
	context.fillStyle = "#fff";
	context.strokStyle = "#fff";
	context.fillRect ( 20, 21, mWidth/2-40, mHeight/7-2 );

	var len = context.measureText ( turbStatus );
	context.fillStyle = "#888";
	context.fillText ( turbStatus, 10+(mWidth/2-20)/2-len.width/2, 25+mHeight/14 );
	context.closePath ();
	context.stroke ();

	//General Power Valuebar
	var top = mHeight/7 + title;
	context.font = 'bold 12px "LiHei Pro"';
	context.fillStyle = "#fff";
	context.strokStyle = "#fff";
	context.fillRect ( mWidth/2-80, top+20+mHeight*3/14/4, 69, 15 );

	context.beginPath ();
	roundRect ( context, 30+3, top+20+mHeight*3/14/4+2, 
				(mWidth/2-126), 6, 3 );
	context.closePath ();
	context.fill();


	if ( turbpower > turbpowerlimit ) {
		context.beginPath ();
		roundRect ( context, 30+3, top+20+mHeight*3/14/4+2, 
					(mWidth/2-126), 6, 3 );
		context.closePath ();
		context.fillStyle = "#966"
		context.fill();
	} else {
		context.beginPath ();
		roundRect ( context, 30+3, top+20+mHeight*3/14/4+2, 
					(mWidth/2-126)*turbpower/turbpowerlimit, 6, 3 );
		context.closePath ();
		context.fillStyle = "#669"
		context.fill();
	}

	context.shadowOffsetY = 0;
	context.shadowBlur = 0;
	context.fillText ( Math.round(turbpower)+" kW", 
				mWidth/2-80, top+20+mHeight*3/14/4+10);
	context.stroke();

	//General Power Valuebar
	context.fillStyle = "#fff";
	context.strokStyle = "#fff";
	context.fillRect ( mWidth/2-80, top+20+mHeight*3/14*3/4-10, 69, 15 );

	context.beginPath ();
	roundRect ( context, 30+3, top+20+mHeight*3/14*3/4-10+2, 
				(mWidth/2-126), 6, 3 );
	context.closePath ();
	context.fill();

	context.beginPath ();
	roundRect ( context, 30+3, top+20+mHeight*3/14*3/4-10+2, 
				(mWidth/2-126)*windspeed/windspeedlimit, 6, 3 );
	context.closePath ();
	context.fillStyle = "#66b"
	context.fill();

	context.shadowOffsetY = 0;
	context.shadowBlur = 0;
	context.fillText ( Math.round(windspeed*10)/10+" m/s", 
				mWidth/2-80, top+20+mHeight*3/14*3/4);
	context.stroke ();


	top = mHeight*5/14 + 2*title;
	drawGaugeValue ( context, 0, 20, 4, Math.round(rotorspeed*10)/10,
			"风轮", "rpm", "rightdown",
			10, top+20, (mWidth/2-20)/2, mHeight*4/14,
			Math.PI/2, Math.PI*2);
	drawGaugeValue ( context, 0, 2000, 4, Math.round(genspeed*10)/10,
			"发电机", "rpm", "rightdown",
			10+(mWidth/2-20)/2, top+20, (mWidth/2-20)/2, mHeight*4/14,
			Math.PI/2, Math.PI*2);

	top = mHeight*9/14 + 3*title;
	var mechHeight = mHeight*5/14/7;
	context.fillStyle = "#fff";
	context.strokStyle = "#fff";
	context.fillRect ( 10+(mWidth/2-20)*2/6, top+25, 
			(mWidth/2-20)*2/6-5, mechHeight*6+10 );
	context.font = 'bold 12px "LiHei Pro"';
	context.fillStyle = "#666"; 
	context.fillText ( brakestate, 10+(mWidth/2-20)*2/6, top+20+mechHeight );
	context.fillText ( yawstate, 10+(mWidth/2-20)*2/6, top+20+2*mechHeight );
	context.fillText ( vibration1x +" mm/s", 10+(mWidth/2-20)*2/6, top+20+3*mechHeight );
	context.fillText ( vibration1y +" mm/s", 10+(mWidth/2-20)*2/6, top+20+4*mechHeight );
	context.fillText ( vibration2x +" mm/s", 10+(mWidth/2-20)*2/6, top+20+5*mechHeight );
	context.fillText ( vibration2y +" mm/s", 10+(mWidth/2-20)*2/6, top+20+6*mechHeight );
	context.shadowOffsetY = 0;
	context.shadowBlur = 0;
	context.stroke();

	drawGaugeValue ( context, 0, 90, 3, pitchangle,
			"桨距角", "deg", "down",
			10+(mWidth/2-20)*2/3, top+20, (mWidth/2-20)/3, mHeight*5/14,
			Math.PI*5/4, Math.PI*7/4);

	mHeight = mHeight + title;
	top = title-10;
	var tempHeight = mHeight*2/5/3;

	drawBarValueClear ( context, 22+mWidth/2, top+22, mWidth/5-4, 6, 2 );
	drawBarValue ( context, 22+mWidth/2, top+22, gentemp/150*(mWidth/5-4), 6, 2 );
	context.fillStyle = "#fff";
	context.fillRect ( 30+mWidth/2+mWidth/5, top+18, 30, 15 );
	context.fillRect ( 30+mWidth/2+mWidth/5, top+18+tempHeight, 30, 15 );
	context.fillRect ( 30+mWidth/2+mWidth/5, top+18+2*tempHeight, 30, 15 );

	drawBarValueClear ( context, 22+mWidth/2, top+22+tempHeight, mWidth/5-4, 6, 2 );
	drawBarValue ( context, 22+mWidth/2, top+22+tempHeight, nactemp/150*(mWidth/5-4), 6, 2 );


	drawBarValueClear ( context, 22+mWidth/2, top+22+2*tempHeight, mWidth/5-4, 6, 2 );
	drawBarValue ( context, 22+mWidth/2, top+22+2*tempHeight, outtemp/150*(mWidth/5-4), 6, 2 );

	context.fillStyle = "#666"; 
	context.fillText ( gentemp+"deg", 30+mWidth/2+mWidth/5, top+28 );
	context.fillText ( nactemp+"deg", 30+mWidth/2+mWidth/5, top+28+tempHeight );
	context.fillText ( outtemp+"deg", 30+mWidth/2+mWidth/5, top+28+2*tempHeight );

	drawWindDirectoryValue ( context, winddirectory,
				20+mWidth/2+mWidth/5+50, 20, 
				mWidth/2-mWidth/5-80,mHeight*2/5 );


	top += 10;
	top += title + mHeight*2/5;

	context.fillStyle = "#fff";
	context.fillRect ( 40+mWidth/2+mWidth/3, top-5, 30, 20 );

	context.fillStyle = "#666"; 
	drawBarValue ( context, 22+mWidth/2, top+2, powerfactor*mWidth/3, 6, 2 );
	context.fillText ( powerfactor, 40+mWidth/2+mWidth/3, top+8 );



	top = mHeight/2 + 2*title;

	drawGaugeValue ( context, 0, 1000, 4, voltage,
			"电压", "V", "down",
			10+mWidth/2, top+20, (mWidth/2-20)/2, mHeight/4,
			Math.PI, Math.PI*7/4);
	drawGaugeValue ( context, 0, 3000, 3, current,
			"电流", "A", "down",
			10+mWidth*3/4, top+20, (mWidth/2-20)/2, mHeight/4,
			Math.PI, Math.PI*7/4);


	drawGaugeValue ( context, -1500, 1500, 2, varpower,
			"无功功率", "kVAr", "down",
			10+mWidth/2, top+20+mHeight/4, (mWidth/2-20)/2, mHeight/4,
			Math.PI*5/4, Math.PI*7/4);

	drawGaugeValue ( context, 49, 51, 4, frequence,
			"电网频率", "Hz", "down",
			10+mWidth*3/4, top+20+mHeight/4, (mWidth/2-20)/2, mHeight/4,
			Math.PI*5/4, Math.PI*7/4);
}
