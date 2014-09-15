/**
 * Title: Jsv1.0 对象集
 * Description: 1. IDCard 校验组件，Base Object 和 Parent Object都是Base
 *              2. 只允许输入数字和X
 *              3. 身份证可以输入15位，也可以输入18位，如果是18位身份证，允许最后一位是X
 * 属性有:
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */

function IDCardObj(editerObj) {

  //定义输入对象
  this.edtObj = editerObj;

  //公共方法
  this.onvalidate = IDC_onvalidate;
  this.checkID = IDC_checkID;
  this.checkX = IDC_checkX;
  this.getParentObj = IDC_getParentObj;
  this.getBaseObj = IDC_getBaseObj;
  this.onlyNumber = IDC_onlyNumber;
  this.onReady = IDC_onReady;
  this.eventBand = IDC_eventBand;


  //私有方法

  //私有对象
  var ParObj = null;
  var BasObj = null;
}

/**
 *名称：getParentObj
 *功能：得到父对象
 *形参：
 *返回：
 */
function IDC_getParentObj() {
  if (this.ParObj == null) {
    this.ParObj = new BaseObj(this.edtObj);
  }
  return this.ParObj;
}

/**
 *名称：getBaseObj
 *功能：得到基对象
 *形参：
 *返回：
 */
function IDC_getBaseObj() {
  if (this.BasObj == null) {
    this.BasObj = new BaseObj(this.edtObj);
  }
  return this.BasObj;
}

/**
 *名称：onvalidate
 *功能：校验
 *形参：
 *返回：
 */
function IDC_onvalidate() {
  //调用BaseObj.js中的公用函数检查数据合法性
  if (this.getBaseObj().commonCheck() &&
      this.checkX() && this.checkID()) {
    return true;
  }
  return false;
}

/**
 *名称：checkID()
 *功能：检查时间型数据是否合乎要求
 *形参：txtObj- 文本域对象
 *     objName-文本域对象对应的标签名称
 *     format- 身份证格式，共有以下几种格式：
 *              15位，18位（最后一位可能为X）
 *返回：Boolean型
 */
function IDC_checkID() {
  if (this.getBaseObj().isEmpty()) {
    return true;
  }
  var inputStr = this.getBaseObj().getObjValue();
  var format = inputStr.length;
  if (!(format == 15 || format == 18)) {
    this.getBaseObj().showAlert("格式不对,应为\"" + format + "\"位。",this.edtObj);
    return false;
  }

  //检查年的格式
  if (format == 18) {
    var year = parseInt(inputStr.substring(6, 10));
    if (isNaN(year) || year < 1900 || year > 2200) {
      this.getBaseObj().showAlert("年份应介于1900与2200之间，请重新输入！",this.edtObj);
      return false;
    }
  } 
  else if (format == 15) {
    var year = parseInt(inputStr.substring(6, 8));
    if (isNaN(year) || year < 0 || year > 99) {
      this.getBaseObj().showAlert("年份应介于00与99之间，请重新输入！", this.edtObj);
      return false;
    }
  }

  //检查月的格式
  var month;
  if (format == 18) {
    month = parseInt(inputStr.substring(10, 12));
  }
  else if (format == 15) {
    month = parseInt(inputStr.substring(8, 10));
  }
  if (isNaN(month) || month < 1 || month > 12) {
    this.getBaseObj().showAlert("月份必须介于1与12之间！", this.edtObj);
    return false;
  }

  //检查日的格式
  var day;
  if (format == 18) {
    day = parseInt(inputStr.substring(12, 14));
  } else if (format == 15) {
    day = parseInt(inputStr.substring(10, 12));
  }
  if(!isNaN(day)){
    if (day < 1 || day > 31) {
      this.getBaseObj().showAlert("日必须介于0与31之间！", this.edtObj);
      return false;
    }
    else if (day == 31) {
      if (month == 2 || month == 4 || month == 6 || month == 9 || month == 11) {
        this.getBaseObj().showAlert( month + "月无" + day + "日", this.edtObj);
        return false;
      }
    }
    else if (month == 2 && day > 28){
      if ((year % 4) != 0 && day == 29) {
        this.getBaseObj().showAlert( year + "年" + month + "月无" + day + "日。", this.edtObj);
        return false;
      }
      else if ((year % 100 == 0) && (year % 400 != 0) && day == 29) {
        this.getBaseObj().showAlert(year + "年" + month + "月无" + day + "日。", this.edtObj);
        return false;
      }
      else{
        this.getBaseObj().showAlert( month + "月无" + day + "日", this.edtObj);
      }
    }
  }
  return true;
}

/**
 *名称：
 */
function IDC_checkX(inputVal) {
  if (this.getBaseObj().isEmpty()) {
    return true;
  }
  var inputVal = this.getBaseObj().getObjValue();
  //如果是18位身份证，最后一位允许是X
  var format = inputVal.length;
  if (format == 18) {
    var lastChar = inputVal.charAt(inputVal.length - 1);
    if (lastChar == "X") {
      inputVal = inputVal.substring(0, inputVal.length - 1);
    }
  }
  for (var i = 0; i < inputVal.length; i++) {
    var oneChar = inputVal.charAt(i);
    if (oneChar < "0" || oneChar > "9") {
      this.getBaseObj().showAlert("身份证只能是数字，如果是18位最后一位允许是X！", this.edtObj);
      return false;
    }
  }
  return true;
}

/**
 *名称：
 */
function IDC_onlyNumber() {
alert();
  var inputVal =  event.srcElement.value;
  
  //因为校验位X只能出现在最后一位，如果出现X,认为输入结束，则禁止输入。
  var n = inputVal.indexOf("X");
  if (n > -1) {
    window.event.keyCode = 0;
  }
  if (!(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 13) || (window.event.keyCode == 88))) {
    window.event.keyCode = 0;
  }
}
/**
 *名称：
 */
function IDC_onReady() {
  //调用ParentObj 的初始化方法
  this.getParentObj().onReady();
  //15 或 18 位
  this.edtObj.setAttribute("maxLength", 18);
}
/**
 *名称：
 */
function IDC_eventBand() {
  this.edtObj.attachEvent("onkeydown", this.getBaseObj().enterToTab);
  this.edtObj.attachEvent("onkeypress", this.onlyNumber);
}

