var username = 'guest';
var userlevel = 'guest';

function login ( a ) {

	if ( username != 'guest' ) {
		$('#loginmenu').html('登录');
		username = 'guest';
		userlevel = 'guest';
		$('#managermenu').css( 'display', 'none' );
		$('#passwdmenu').css( 'display', 'none' );
		$('#username').html( username );
		createHome();
		nagmenu ( document.getElementById('homemenu') );
		return;
	}

	nagmenu ( a );
	hideall ();

	$('#content').removeClass ( 'panel' );
	$('#content').append (
'<form id="login">\
	<h1>登录</h1>\
	<fieldset id="inputs">\
	<input id="username"\
		name="username"\
		type="text"\
		class="username"\
		isNullable="false"\
		verifyName="Text"\
		title="用户名"\
		placeholder="用户名", autofocus/>\
	<input id="password"\
		name="password"\
		type="password"\
		class="password"\
		isNullable="false"\
		verifyName="Text"\
		title="密码"\
		placeholder="密码"/>\
	</fieldset>\
	<fieldset id="actions">\
		<center><a id="submit" href="javascript:void(\'\')" onclick="loginbtn(\'\')" >登录</a>\
	</fieldset>\
</form>');
}

function loginbtn () {
	if ( checkValue ( document.getElementById('login') ) ) {
		jQuery.post("login", { username: $('[name="username"]').val(), 
				passwd: $('[name="password"]').val() }, function(data) {
			if ( data.result == 'ok' ) {
				username = data.username;
				userlevel = data.levels;
				$('#username').html( username );
				$('#managermenu').css( 'display', 'block' );
				$('#passwdmenu').css( 'display', 'block' );
				createHome();
				nagmenu ( document.getElementById('homemenu') );
				$('#loginmenu').html('注销');
			} else {
				alert ( "用户名或密码错误！" );
			}
		}, 'json');
	}
}




