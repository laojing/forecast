var farmnum = 0;
var turbinenum = 0;

function select(a, link)
{
    var li = a.parentNode;
    var lis = a.parentNode.parentNode.childNodes;
    if ( li.className == "level1_selected" ) {
        for ( var i = 0; i < lis.length; i++ ) {
            if ( lis[i].className == "level1_selected" ) {
                lis[i].className = "level1";
                continue;
            }
            if ( lis[i].className == "level2" ||  lis[i].className == "level2_selected" ) {
                lis[i].className = "level2_nodisplay";
            }
        }
	} else if ( li.className == "level2_selected" 
			|| li.className == "level2_nodisplay" ) {
        return;
    } else if ( li.className == "level2" ) {
		turbinenum = link;
        for ( var i = 0; i < lis.length; i++ ) {
            if ( lis[i].className == "level2_selected" ) {
                lis[i].className = "level2";
                break;
            }
        }
        li.className = "level2_selected";
    } else {
		farmnum = link;
        for ( var i = 0; i < lis.length; i++ ) {
            if ( lis[i].className == "level1_selected" ) {
                lis[i].className = "level1";
                continue;
            }
            if ( lis[i].className == "level2" ||  lis[i].className == "level2_selected" ) {
                lis[i].className = "level2_nodisplay";
            }
        }
        li.className = "level1_selected";
        var isStart = false;
        var isEnd = false;
        for ( var i = 0; i < lis.length; i++ ) {
            if ( isStart == false && lis[i].className == "level1_selected" ) {
                isStart = true;
                continue;
            }
            if ( isStart == true && isEnd == false ) {
				if ( lis[i].className == 'level1' ) {
                    isEnd = true;
                } else {
                	lis[i].className = "level2";
				}
            }
        }
    }
}

function updateFarmList ( func1, func2 ) {
	$.getJSON("listfarms", function(data) {
		var cont = '<ul>';
		$.each(data.farms, function(name,items){
			var level1 = 'level1';
			var level2 = 'level2_nodisplay';
			if ( items[0] == farmnum ) {
				level1 = 'level1_selected';
				level2 = 'level2';
			}
			cont += '<li class="'+level1+'"><a href="javascript:void(\'\')" onclick="'+func1+'(this, \''+items[0]+'\')" >'+items[1]+'</a></li>';
			$.each(data.turbines, function(name,item){
				if ( item[2] == items[0] ) {
					if ( items[0] == farmnum && item[0] == turbinenum ) 
					cont += '<li class="level2_selected"><a href="javascript:void(\'\')" onclick="'+func2+'(this, \''+item[0]+'\')" >'+item[1]+'</a></li>';
					else
					cont += '<li class="'+level2+'"><a href="javascript:void(\'\')" onclick="'+func2+'(this, \''+item[0]+'\')" >'+item[1]+'</a></li>';
				}
			});
		});
		cont += '</ul>';
		$('#farm').html(cont);
	});
}
