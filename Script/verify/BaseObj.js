/**
 * Title: Jsv1.0 对象集
 * Description: 所有校验对象的基本对象
 * 属性有: minLength:最小长度
 *        maxLength:最大长度
 *        fixLength:固定长度
 *        enumValues:枚举值，用户输入的值必须等于枚举值中的一个，
 *                    各个值之间用","分开，如enumeration="songie,liuhui,nietiezhen"
 *        regularExp:正则表达式校验，参见JavaScript正则表达式相关的语法
 *        isNullable:是否为空
 *        isReadOnly:是否为只读，即灰色不可输入
 *        promote
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */

function BaseObj(editerObj) {

  //定义输入对象
  this.edtObj = editerObj;

  //公共方法
  this.enterToTab = BSO_enterToTab;
  this.commonCheck = BSO_commonCheck;
  this.checkEmpty = BSO_checkEmpty;
  this.checkMinLength = BSO_checkMinLength;
  this.checkFixLength = BSO_checkFixLength;
  this.checkMaxLength = BSO_checkMaxLength;
  this.checkEnumeration = BSO_checkEnumeration;
  this.checkRegularExp = BSO_checkRegularExp;
  this.getObjValue = BSO_getObjValue;
  this.showAlert = BSO_showAlert;
  this.isEmpty = BSO_isEmpty;
  this.onReady = BSO_onContentReady;
  this.eventBand = BSO_eventBand;
}

/**
 *名称：enterToTab
 *功能：将回车键转换成TAB
 *形参：无
 *返回：void
 */
function BSO_enterToTab() {
  if (event.srcElement.type != "button" && event.srcElement.type != "textarea" && event.keyCode == 13) {
    event.keyCode = 9;
  }
}

/**
 *名称：commonCheck()
 *功能：公共的数据校验方法
 *形参：无
 *返回：Boolean型
 */
function BSO_commonCheck() {
  if (this.checkEmpty() && this.checkMinLength() &&
      this.checkFixLength() && this.checkMaxLength() &&
      this.checkEnumeration() && this.checkRegularExp()) {
    return true;
  }
  return false;
}

/**
 *名称：checkMinLength()
 *功能：检查是否满足最小长度
 *形参：无
 *返回：Boolean型
 */
function BSO_checkMinLength() {
  var minLength = this.edtObj.getAttribute("minLength");
  if (minLength == null || this.isEmpty()) {
    return true;
  }
  if (!isNaN(parseInt(minLength, 10))) {
    var value = this.getObjValue();
    var valueLength = bitLength(value);
    minLength = parseInt(minLength, 10);
    if (minLength > valueLength) {
      this.showAlert("长度最小为" + minLength +
                "位,请重新输入！注意：一个汉字占" + jsv.bitsOfOneChinese +
                "位", this.edtObj);
      return false;
    }
  }
  return true;
}

/**
 *名称：checkFixLength()
 *功能：检查是否满足固定长度
 *形参：无
 *返回：Boolean型
 */
function BSO_checkFixLength() {
  var fixLength = this.edtObj.getAttribute("fixLength");
  if (fixLength == null || this.isEmpty()) {
    return true;
  }
  if (!isNaN(parseInt(fixLength, 10))) {
    var value = this.getObjValue();
    var valueLength = bitLength(value);
    fixLength = parseInt(fixLength, 10);
    if (fixLength != valueLength) {
      this.showAlert("长度必须为" + fixLength +
                "位,请重新输入！n注意：一个汉字占" + jsv.bitsOfOneChinese +
                "位", this.edtObj);
      return false;
    }
  }
  return true;
}

/**
 *名称：checkMaxLength()
 *功能：检查是否满足最大长度
 *形参：无
 *返回：Boolean型
 */
function BSO_checkMaxLength() {
  var maxLength = this.edtObj.getAttribute("maxLength");
  if (maxLength == null || this.isEmpty()) {
    return true;
  }
  if (!isNaN(parseInt(maxLength, 10))) {
    var value = this.getObjValue();
    var valueLength = bitLength(value);
    maxLength = parseInt(maxLength, 10);
    if (maxLength < valueLength) {
      this.showAlert("长度必须小于" + maxLength +
                "位,请重新输入！n注意：一个汉字占" + jsv.bitsOfOneChinese +
                "位", this.edtObj);
      return false;
    }
  }
  return true;
}

/**
 *名称：checkEnumeration()
 *功能：检查是否满足枚举值,枚举值之间用，分开
 *形参：无
 *返回：Boolean型
 */
function BSO_checkEnumeration() {
  var enmuStr = this.edtObj.getAttribute("enumValues");
  if (enmuStr == null || enmuStr == "" || this.isEmpty()) {
    return true;
  }
  var values = enmuStr.split(",");
  for (var i = 0; i < values.length; i++) {
    if (this.getObjValue() == values[i]) {
      return true;
    }
  }
  this.showAlert("只能选择" + values + "中的一个值", this.edtObj);
  return false;
}

/**
 *名称：checkRegularExp()
 *功能：检查是否满足正则表达式
 *形参：无
 *返回：Boolean型
 */
function BSO_checkRegularExp() {
  var regularExp = this.edtObj.getAttribute("regularExp");
  if (regularExp == null || regularExp == "" || this.isEmpty()) {
    return true;
  }
  var pattern = new RegExp(regularExp);
  if (pattern.test(this.getObjValue())) {
    return true;
  }
  this.showAlert("输入的值不合法!", this.edtObj);
  return false;
}

/**
 *名称：checkEmpty()
 *功能：根据属性isNullable,检查是否不为空
 *形参：无
 *返回：Boolean型
 */
function BSO_checkEmpty() {
  if (this.edtObj.getAttribute("isNullable") == "false") {
    if (this.isEmpty()) {
      var msg = "不能为空，请重新输入！";
      if (this.edtObj.tagName.toLowerCase() == "select") {
        msg = "不能为空，请选择！";
      }
      this.showAlert(msg, this.edtObj);
      return false;
    }
  }
  return true;
}

/**
 *名称：isEmpty()
 *功能：对象值是否为空
 *形参：无
 *返回：Boolean型
 */
function BSO_isEmpty() {
  if (this.getObjValue() == null) {
    return true;
  }
  return false;
}

/**
 *名称：getObjValue()
 *功能：获取对象的值
 *形参：无
 *返回：对象的值
 */
function BSO_getObjValue() {
  var value = this.edtObj.value;
  return value == null || value == "" ? null : value;
}

/**
 *名称：onContentReady()
 *功能：设置输入区的一些属性
 *形参：无
 *返回：void
 */
function BSO_onContentReady() {
  if (this.edtObj.getAttribute("prompt") == null) {
    this.edtObj.setAttribute("prompt",this.edtObj.name);
  }
  var isReadOnly = this.edtObj.getAttribute("isReadonly");
  if (isReadOnly != null && isReadOnly.toUpperCase() == "TRUE") {
    this.edtObj.disabled = true;
  }
}

/**
 *名称：
 *功能：
 *形参：
 *返回：
 */
function BSO_eventBand(eventID, eventHandler) {
  this.edtObj.attachEvent("onkeydown", this.enterToTab);
  this.edtObj.attachEvent(eventID, eventHandler);
}

/**
 *名称：showAlert()
 *功能：显示提示信息
 *形参：message 显示的信息
 *     obj     相关对象
 *返回：void
 */
function BSO_showAlert(message, obj) {
  alert("[" + obj.getAttribute("title") + "]" + message);
  obj.focus();
}

/**
 *名称：bitLength()
 *功能：判断一个字符串的长度，可定义一个汉字占几位
 *形参：需要转换的字符串
 *返回：长度
 */
function bitLength(str) {
  if (str == null || str == "") {
    return 0;
  }
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    //非汉字
    if (str.substring(i, i + 1).charCodeAt(0) < 19968) {
      len++;
      continue;
    }
    //汉字
    len += jsv.bitsOfOneChinese;
  }
  return len;
}

