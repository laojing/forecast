/**
 * Title: Jsv1.0 对象集
 * Description: 1. Integer 校验组件，Base Object 是 BaseObj,Parent Object是Number
 *              2. 整数，只能输入数字，"-"和"Tab"
 *              3. 输入的必须是一个整数,像"005","-5-1","5-1"都是不合法的
 * 属性有:minValue:最小值。
 *       maxValue:最大值。
 *       minValueName:最小值所在关联的输入区。
 *       maxValueName:最大值所在关联的输入区。
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */
function IntegerObj(editerObj) {

  //定义输入对象
  this.edtObj = editerObj;

  //公共方法
  this.getParentObj = INT_getParentObj;
  this.getBaseObj = INT_getBaseObj;

  this.onvalidate = INT_onvalidate;
  this.checkInput = INT_checkInput;

  this.onlyNumber = INT_onlyNumber;
  this.onReady = INT_onDocumentReady;
  this.eventBand = INT_eventBand;

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
function INT_getParentObj() {
  if (this.ParObj == null) {
    this.ParObj = new NumberObj(this.edtObj);
  }
  return this.ParObj;
}

/**
 *名称：getBaseObj
 *功能：得到基对象
 *形参：
 *返回：
 */
function INT_getBaseObj() {
  if (this.BasObj == null) {
    this.BasObj = this.getParentObj().getBaseObj();
  }
  return this.BasObj;

}

/**
 *名称：onvalidate
 *功能：校验
 *形参：
 *返回：
 */
function INT_onvalidate() {
  if (this.getParentObj().onvalidate() && this.checkInput()) {
    return true;
  }
  return false;
}

/**
 *名称：checkInput()
 *功能：检查"-"输入的合法性
 */
function INT_checkInput() {
  if(this.getBaseObj().isEmpty()){
    return true;
  }
  var inputStr = this.getBaseObj().getObjValue();
  //如果第一位禁止输入0
  if (inputStr.charAt(0) == "-") {
     this.getBaseObj().showAlert("第一位禁止输入0", this.edtObj); 
     return false;
  }
  //如果第一位是负号，第二位禁止输入0
  if (inputStr.charAt(0) == "-" && inputStr.charAt(1)=="0") {
     this.getBaseObj().showAlert("第一位是负号，第二位禁止输入0", this.edtObj); 
     return false;
  }
  for (var i = 0; i < inputStr.length; i++) {
    var oneChar = inputStr.charAt(i);
    //第一位可以是“-”
    if (i == 0 && oneChar == "-") {
      continue;
    }
    if (oneChar < "0" || oneChar > "9") {
      this.getBaseObj().showAlert("数字不合法", this.edtObj); 
      return false;
    }
  }
  return true;
}

/**
 *名称：
 */
function INT_onlyNumber() {
  var inputStr = event.srcElement.value;
  
  //第一位不允许输入0
  if (inputStr == null || inputStr == ""){
    if (window.event.keyCode == 48){
      window.event.keyCode = 0;
    }
  }
  //如果第一位输入负号，第二位不允许输入0
  if (inputStr == "-") {
    if (window.event.keyCode == 48) {
      window.event.keyCode = 0;
    }
  }
  //如果第一位输入负号，其他位不允许输入负号“-”
  if (inputStr.indexOf("-") > -1 || inputStr.length > 1) {
    if (window.event.keyCode == 45) {
      window.event.keyCode = 0;
    }
  }
  //只能输入数字，"-"和"Tab"
  if (! ( ( (window.event.keyCode >= 48) && (window.event.keyCode <= 57)) ||
         (window.event.keyCode == 13) || (window.event.keyCode == 45))) {
    window.event.keyCode = 0;
  }
}

/**
 *名称：
 */

function INT_onDocumentReady() {
  //调用ParentObj 的初始化方法
  this.getParentObj().onReady();
}

/**
 *名称：
 */

function INT_eventBand(){
  this.edtObj.attachEvent("onkeydown", this.getBaseObj().enterToTab);
  this.edtObj.attachEvent("onkeypress", this.onlyNumber);
}
