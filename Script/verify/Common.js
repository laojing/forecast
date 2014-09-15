
/**
 * @description: 寻找一个对象
 * @param n：要寻找的对象的id
 * @param d：包容该对象的父对象，缺省为document
 * @return: 该对象
 */
function findObj(n, d) {
  if( n==null || n == ""){
    return;
  }
  var p, i, x;
  if (!d) {
    d = document;
  }
  if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
    d = parent.frames[n.substring(p + 1)].document;
    n = n.substring(0, p);
  }
  if (!(x = d[n]) && d.all) {
    x = d.all[n];
  }
  for (i = 0; !x && i < d.forms.length; i++) {
    x = d.forms[i][n];
  }
  for (i = 0; !x && d.layers && i < d.layers.length; i++) {
    x = findObj(n, d.layers[i].document);
  }
  if (!x && document.getElementById) {
    x = document.getElementById(n);
  }
  return x;
}

/**
 * @description: 得到Form中所有元素的ID和值
 *              并组成GET请求中要求的[name]=[value]&...[name]=[value]串
 * @param obj: Form对象
 * @return: [name]=[value]&...[name]=[value]串
 */
function getAlldata(obj) {
  var data = "";
  for (i = 0; i < obj.length; i++) {
    if (obj(i).type != "submit" && obj(i).type != "reset" && obj(i).type != "button") {
      if (obj(i).type == "select-multiple") {
        for (j = 0; j < obj(i).length; j++) {
          if (obj(i).options[j].selected) {
            data = data + obj(i).id + "=" + replaceStr(obj(i).options[j].value) + "&";
          }
        }
      } else {
        if (obj(i).type == "radio" || obj(i).type == "checkbox") {
          if (obj(i).checked) {
            data = data + obj(i).id + "=" + replaceStr(obj(i).value) + "&";
          }
        } else {
          var objValue = replaceStr(obj(i).value);
          if (objValue != null && objValue != "" && objValue != "undefined") {
            data = data + obj(i).name + "=" + replaceStr(obj(i).value) + "&";
          }
        }
      }
    }
  }
  return data;
}
/**
 * @description: 检查数据合法性
 * @param formObj:要检查的Form
 * @return: true or false
 */
function checkValue(form) {
  if (jsv.DEBUG) {
    return true;
  } 

  for (i = 0; i < form.elements.length; i++) {
    var obj = form[i];
    
    if (obj.getAttribute("verifyName") != null && obj.type != "submit" && obj.type != "reset" && obj.type != "button" && obj.type != "hidden" && obj.type != "checkbox") {
      if (!(jsvObjsMgr.onvalidate(obj))) {
        obj.focus();
        return false;
      }
    }
  }
  return true;
}
/**
 * 禁止使用页面快捷键
 */
function forbidShortcutKey() {
  if (jsv.DEBUG) {
    return;
  }
  if ((window.event.altKey) && ((window.event.keyCode == 37) || (window.event.keyCode == 39))) {
    //不准使用ALT+方向键前进或后退网页
    event.returnValue = false;
  }
  if (event.keyCode == 116) {
    event.keyCode = 0;
    //不准使用F5刷新网页
    event.returnValue = false;
  }
  if ((event.ctrlKey) && (event.keyCode == 78)) {
    //不准使用Ctrl+N打开新的网页
    event.returnValue = false;
  }
  if ((event.ctrlKey) && (event.keyCode == 66)) {
    //不准使用Ctrl+B快速打开收藏夹
    event.returnValue = false;
  }
  if ((event.ctrlKey) && (event.keyCode == 73)) {
    //不准使用Ctrl+I快速整理收藏夹
    event.returnValue = false;
  }
  if ((event.ctrlKey) && (event.keyCode == 76)) {
    //不准使用Ctrl+L键入网址
    event.returnValue = false;
  }
  if ((event.ctrlKey) && (event.keyCode == 82)) {
    //不准使用Ctrl+R刷新当前页
    event.returnValue = false;
  }
  if ((event.shiftKey) && (event.keyCode == 121)) {
    //不准你使用Shift+F10打开菜单
    event.returnValue = false;
  }
  if (event.keyCode == 122) {
    //不准你使用F11全屏显示
    event.keyCode = 0;
    event.returnValue = false;
  }
}

