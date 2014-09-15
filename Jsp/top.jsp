<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>分散式风电厂功率预测</title>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <link rel="icon" type="image/png" href="images/icon.png" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/styles/style.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/styles/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/styles/login.css" />
	<script src="scripts/jquery.js" type="text/javascript"></script>
	<script src="scripts/jquery-ui.js" type="text/javascript"></script>
	<script src="scripts/jquery.form.min.js" type="text/javascript"></script>

	<script src="scripts/select.js" type="text/javascript"></script>
	<script src="scripts/common.js" type="text/javascript"></script>
	<script src="scripts/home.js" type="text/javascript"></script>
	<script src="scripts/login.js" type="text/javascript"></script>
	<script src="scripts/passwd.js" type="text/javascript"></script>
	<script src="scripts/users.js" type="text/javascript"></script>
	<script src="scripts/monitorctrl.js" type="text/javascript"></script>
	<script src="scripts/monitor.js" type="text/javascript"></script>
	<script src="scripts/statis.js" type="text/javascript"></script>
	<script src="scripts/graph.js" type="text/javascript"></script>
	<script src="scripts/powercurvel.js" type="text/javascript"></script>
	<script src="scripts/report.js" type="text/javascript"></script>
	<script src="scripts/standard.js" type="text/javascript"></script>
	<script src="scripts/setting.js" type="text/javascript"></script>
	<script src="scripts/farmdetail.js" type="text/javascript"></script>

	<script language="javascript" src="scripts/verify/Globals.js"> </script>
	<script language="javascript" src="scripts/verify/Common.js"> </script>
	<script language="javascript" src="scripts/verify/BaseObj.js"> </script>
	<script language="javascript" src="scripts/verify/JsvObjsMgr.js"> </script>
	<script language="javascript" src="scripts/verify/NumberObj.js"> </script>
	<script language="javascript" src="scripts/verify/DoubleObj.js"> </script>
	<script language="javascript" src="scripts/verify/IntegerObj.js"/>
	<script language="javascript" src="scripts/verify/IDCardObj.js"> </script>
	<script language="javascript" src="scripts/verify/PasswordConfirmObj.js"> </script>
	<script language="javascript" src="scripts/verify/PasswordObj.js"> </script>
	<script language="javascript" src="scripts/verify/ReadOnlyObj.js"> </script>
	<script language="javascript" src="scripts/verify/TextObj.js"> </script>
	<script language="javascript" src="scripts/verify/TextAreaObj.js"> </script>
	<script language="javascript" src="scripts/verify/SelectObj.js"> </script>
	<script language="javascript" src="scripts/verify/StateBarObj.js"> </script>
	<script language="javascript" src="scripts/verify/HotKey.js"> </script>
	
    <meta http-equiv="Cache-Control" content="max-age=0" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="Pragma" content="no-cache" />
</head>
<body>

<header>
	<img src="images/logo.png"/>
	<h1>分散式风电厂功率预测</h1>
	<a onclick="gouser(this)" id="managermenu">用户</a>
	<a onclick="gopasswd(this)" id="passwdmenu">修改密码</a>
	<a onclick="login(this)" id="loginmenu">登录</a>
	<a onclick="gostandard(this)">标准</a>
	<a onclick="gosetting(this)">设置</a>
	<a onclick="goreport(this)">报表</a>
	<a onclick="gograph(this)">管理</a>
	<a onclick="gostatis(this)">误差分析</a>
	<a onclick="gomonitor(this)">预测评估</a>
	<a class="selected" id="homemenu" onclick="gohome(this)">综合信息</a>
</header>

<script language="JavaScript"> 

function goHome (a) {
	alert ( "Comming soon..." );
}
function nagmenu (a) {
	var li = a.parentNode;
	var lis = a.parentNode.childNodes;
	for ( var i = 0; i < lis.length; i++ ) {
		lis[i].className = "";
	}
	a.className = "selected";
}

</script>
