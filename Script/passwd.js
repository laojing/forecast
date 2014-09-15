function gopasswd ( a ) {
	nagmenu ( a );
	hideall ();

	$('#content').removeClass ( 'panel' );
	$('#content').append (
'<form id="login">\
	<h1>修改密码</h1>\
	<fieldset id="inputs">\
	<input id="oldpassword"\
		name="oldpassword"\
		class="password"\
		type="password"\
		isNullable="false"\
		verifyName="Text"\
		title="现在密码"\
		placeholder="现在密码", autofocus/>\
	<input id="password"\
		name="password"\
		class="password"\
		type="password"\
		isNullable="false"\
		verifyName="Text"\
		title="新密码"\
		placeholder="新密码"/>\
	<input id="newpassword"\
		name="newpassword"\
		type="password"\
		class="password"\
		isNullable="false"\
		verifyName="Text"\
		title="重复新密码"\
		placeholder="重复新密码"/>\
	</fieldset>\
	<fieldset id="actions">\
		<center><a id="submit" href="javascript:void(\'\')" onclick="passwdbtn(\'\')" >修改密码</a>\
	</fieldset>\
</form>');

	$('#login').height(300);
}

function passwdbtn () {
	if ( checkValue ( document.getElementById('login') ) ) {
		if ( $('[name="password"]').val() == $('[name="newpassword"]').val() ) {
			jQuery.post("changepass", { username:username, oldpasswd: $('[name="oldpassword"]').val(), 
					newpasswd: $('[name="newpassword"]').val() }, function(data) {
				if ( data.result == 'ok' ) {
					alert ( '修改密码成功！' );
				} else {
					alert ( '原密码输入错误！' );
				}
			}, 'json');
		} else {
			alert ( '两次密码不一致！' );
		}
	}
}
