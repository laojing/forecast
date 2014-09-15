function drawPowerCurvel () {
	var mHeight = $('#graphcanvas').height();
	var mWidth = $('#graphcanvas').width();

	var width = mWidth;
	var height = mHeight;
	var xspan = 28;
	var yspan = 25;
	var ylabel = 35;
	var can = document.getElementById ( 'graphcanvas' );
	var d = new Date();

	var powerdata = [0.0,0.0,0.0,20,100,200,300,400,600,800,1080,1300, 1450, 1500, 1500,1500,1500,1500,1500,1500,1500];

	var context = can.getContext ( '2d' );
	context.clearRect ( 0, 0, width, height );
//	context.translate ( 0.5, 0.5 );

	context.beginPath();
	context.strokeStyle = "#ddd";
	context.fillStyle = "#666";
	context.font = '12px LiHei Pro';
	var xlen = (width - yspan - ylabel)/10;
	for ( var i=0; i<=10; i++ ) {
		context.moveTo ( ylabel + i*xlen, xspan );
		context.lineTo ( ylabel + i*xlen, height - xspan );
		var length = context.measureText ( (i*2).toString() );
		context.fillText ( (i*2).toString(), ylabel + i*xlen - length.width/2, height-10 );
	}

	var ylen = (height - 2*xspan)/10;
	for ( var i=0; i<=10; i++ ) {
		context.moveTo ( ylabel, xspan+i*ylen );
		context.lineTo ( width-yspan, xspan+i*ylen );
		var length = context.measureText ( ((20-2*i)*100).toString() );
		context.fillText ( ((20-2*i)*100).toString(), 
				ylabel-length.width-8, xspan+i*ylen+3 );
	}
	context.closePath();
	context.stroke();

	var min = 0;
	var max = 2000;
	var mean = 1000;
	var maxlimit = max;
	var minlimit = min;

	var xdisp = width - ylabel - yspan;
	var ydisp = height - xspan;
	var ytotal = maxlimit - minlimit;
	var yvalue = ydisp - (powerdata[0]-minlimit)/ytotal * (ydisp-xspan);
	context.beginPath();
	context.moveTo ( ylabel, yvalue );
	for ( var i=1; i<powerdata.length; i++ ) {
		yvalue = ydisp - (powerdata[i]-minlimit)/ytotal * (ydisp-xspan);
		context.lineTo ( ylabel+i/20*xdisp, yvalue );
	}
	context.lineWidth = 2;
	context.strokeStyle = "#88d";
	context.stroke();
}
		
var dirrose = ['东','东东南','东南','东南南','南','南南西','西南','西西南',
				'西','西西北','西北','西北北','北','北北东','东北','东东北'];

var rosecolor = ['#7cb5ec',
				'#434348',
				'#90ed7d',
				'#f7a35c',
				'#8085e9',
				'#f15c80',
				'#e4d354'];
var rosestep = ['<0.5 m/s',
				'0.5-2 m/s',
				'2-4 m/s',
				'4-6 m/s',
				'6-8 m/s',
				'8-10 m/s',
				'>10 m/s'];
var rosedata = [[0.62,2.2,0,0,0,0,0],
				[1.22,2.01,1.55,0,0,0,0],
				[1.61,3.06,2.37,2.14,1.74,0,0],
				[2.04,3.42,1.97,0.86,0.53,0,0],
				[2.66,4.74,0,0,0,0,0],
				[2.96,4.14,0,0,0,0,0],
				[2.53,4.01,1.22,0,0,0,0],
				[1.97,2.66,1.97,0,0,0,0],
				[1.64,1.71,0.92,1.45,0,0,0],
				[1.32,2.4,0.99,1.61,0,0,0],
				[1.58,4.28,1.28,0.76,0.69,0,0],
				[1.51,5,1.32,0,0,0,0],
				[1.81,1.78,0,0,0,0,0],
				[0.62,1.09,0,0,0,0,0],
				[0.82,0.82,0,0,0,0,0],
				[0.59,1.22,0,0,0,0,0]];

function drawRose () {
	var mHeight = $('#graphcanvas').height();
	var mWidth = $('#graphcanvas').width();

	var can = document.getElementById ( 'graphcanvas' );

	var context = can.getContext ( '2d' );
	context.clearRect ( 0, 0, mWidth, mHeight );

	mWidth = mWidth - 80;
	var radius = mHeight/2;
	if ( mWidth < mHeight ) radius = mWidth/2;
	radius -= 30;
	context.beginPath(); 
	context.strokeStyle = "#ddd";
	context.fillStyle = "#666"; 
	context.arc(mWidth/2, mHeight/2, radius, 0, Math.PI*2, true); 
	context.arc(mWidth/2, mHeight/2, radius*2/5, 0, Math.PI*2, true); 
	context.arc(mWidth/2, mHeight/2, radius*4/5, 0, Math.PI*2, true); 
	context.closePath(); 
	context.stroke();

	for ( var i=0; i<7; i++ ) {
		context.beginPath();
		context.strokeStyle = "#ddd";
		context.fillStyle = rosecolor[i]; 
		context.fillRect ( mWidth-25, 20+i*30, 30, 10 );
		context.fillText ( rosestep[i], mWidth+10, 30+i*30 );
		context.closePath();
		context.stroke();
	}

	context.font = "10px 'LiHei Pro'";
	var deg = 90;
	for ( var i=0; i<16; i++ ) {
		context.beginPath(); 
		context.strokeStyle = "#ddd";
		context.fillStyle = "#666"; 
		var r = i*(Math.PI*2)/16;
		drawLine ( context, r, radius, 10, mWidth/2, mHeight/2 );
		drawText ( context, dirrose[i], r, radius, mWidth/2, mHeight/2, 16 );
		drawText ( context, deg%360, r, radius, mWidth/2, mHeight/2, 5 );
		context.closePath(); 
		context.stroke();
		drawDirRose ( context, r, rosedata[i], radius, mWidth/2, mHeight/2 );
		deg += 22.5;
	}
}
function drawRoseArc ( context, rad, c, start, span, x, y ) {
	var newx = x + 10*Math.cos(rad);
	var newy = y + 10*Math.sin(rad);

	if ( start == 10 ) {
		context.beginPath(); 
		context.moveTo ( newx, newy );
		context.arc(newx, newy, start+span, rad-Math.PI/18, rad+Math.PI/18, false); 
		context.closePath(); 
		context.fillStyle = c; 
		context.fill();
		context.stroke();
	} else {
		context.beginPath(); 
		context.arc(newx, newy, start, rad-Math.PI/18, rad+Math.PI/18, false); 
		context.arc(newx, newy, start+span, rad+Math.PI/18, rad-Math.PI/18, true); 
		context.closePath(); 
		context.fillStyle = c; 
		context.fill();	
		context.stroke();
	}
}

function drawDirRose ( context, rad, dirdata, radius, x, y ) {
	var start = 10;
	for ( var i=0; i<dirdata.length; i++ ) {
		if ( dirdata[dirdata.length-i-1] > 0 ) {
			var span = dirdata[dirdata.length-i-1]/10*(radius*4/5);
			drawRoseArc ( context, rad, rosecolor[dirdata.length-i-1], start, span, x, y );
			start = start + span;
		}
	}
}

