function gouser ( a ) {
	nagmenu ( a );
	hideall ();

	$('#content').append ('<div class="panel-heading">用户管理</div>');

	nagmenu ( a );
	hideall ();

	$('#content').removeClass ( 'panel' );
	$('#content').append (
'<form id="manager">\
	<h1>增加用户</h1>\
	<fieldset id="inputssut">\
	<input name="username"\
		type="text"\
		isNullable="false"\
		verifyName="Text"\
		title="用户名"\
		placeholder="用户名", autofocus/>\
	<input name="password"\
		type="password"\
		class="inputright"\
		isNullable="false"\
		verifyName="Text"\
		title="密码"\
		placeholder="密码"/>\
	<input name="phone"\
		type="text"\
		isNullable="false"\
		verifyName="Text"\
		title="电话"\
		placeholder="电话", autofocus/>\
	<input name="unit"\
		type="text"\
		class="inputright"\
		isNullable="false"\
		verifyName="Text"\
		title="用户单位"\
		placeholder="用户单位", autofocus/>\
	 <select title=用户权限\
		isNullable="false"\
		verifyName="Select"\
		name="levels">\
		<option selected value="">--请选择--</option>\
		<option value="farmer">风场管理</option>\
		<option value="admin">管理员</option>\
		</select>\
	</fieldset>\
	<fieldset id="actions">\
		<center><a id="submit" href="javascript:void(\'\')" onclick="adduser(\'\')" >添加</a>\
	</fieldset>\
	<h1>用户列表</h1>\
	<div id="listuser"></div>\
</form>');
	listuser();
}

function listuser() {
	$.getJSON("users", {userlevel:userlevel}, function(data) {
		var cont = '<table width="100%" id="hor-zebra" class="listuser"><thead><tr>\
						<th width="15%">用户名</th>\
						<th width="10%" noWrap>用户权限</th>\
						<th width="15%" noWrap>电话</th>\
						<th width="30%" noWrap>单位</th>\
						<th width="30%" noWrap>操作</th>\
					</tr></thead><tbody>';
		$.each(data, function(name,items){
				for ( var i=0; i<items.length; i++ ) {
					if ( i % 2 == 0 ) cont = cont + '<tr class="odd">';
					else cont = cont + '<tr>';
					cont = cont + '<td>'+items[i][1]+'</td>';
					cont = cont + '<td>'+items[i][3]+'</td>';
					cont = cont + '<td>'+items[i][4]+'</td>';
					cont = cont + '<td>'+items[i][5]+'</td>';
					cont = cont + '<td><a href="#" onclick="deleteUser('+items[i][0]+')">删除</a></td>';
					cont = cont + '</tr>';
				}
			});
		cont = cont + '</tbody></table>';
		$('#listuser').html(cont);
	});
}

function adduser () {
	if ( checkValue ( document.getElementById('manager') ) ) {
		$.getJSON("adduser", { username: $('[name="username"]').val(), 
				passwd: $('[name="password"]').val(),
				phone: $('[name="phone"]').val(),
				unit: $('[name="unit"]').val(),
				levels: $('[name="levels"]').val() }, function(data) {
			if ( data.result == 'ok' ) {
				alert ( '增加用户成功！' );
				listuser();
			} else {
				alert ( '增加用户失败，可能是帐号重复定义！' );
			}
		});
	}

}

function deleteUser(userid)
{	
	$.getJSON("deleteusers", {userid:userid}, function(data) {
		if ( data.result == 'ok' ) {
			alert ( '删除用户完成！' );
			listuser();
		} else {
			alert ( '删除错误！' );
		}
	});
}

