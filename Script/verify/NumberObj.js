/**
 * Title: Jsv1.0 对象集
 * Description: 1. Number 校验组件，Base Object 和Parent Object都是 BaseObj
                2. Number 校验组件的输入约束比较简单而且严格，只能输入数字和Tab键，不能输入"-"和"."。
                3. Number 输入的不一定是数字，可以是"00001"等字符，Number没有数字合法校验
                4. 如果希望精确控制，可以考虑使用Integer，Double和Money
 * 属性有:minValue:最小值。
 *       maxValue:最大值。
 *       minValueName:最小值所在关联的输入区。
 *       maxValueName:最大值所在关联的输入区。
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */
function NumberObj(editerObj) {

  //定义输入对象
  this.edtObj = editerObj;

  //公共方法
  this.getParentObj = NUM_getParentObj;
  this.getBaseObj = NUM_getBaseObj;
  this.onvalidate = NUM_onvalidate;
  this.checkInput = NUM_checkInput;
  this.onlyNumber = NUM_onlyNumber;
  this.onReady = NUM_onDocumentReady;
  this.eventBand = NUM_eventBand;

  //私有方法
  this.rangeCheck = NUM_rangeCheck;

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
function NUM_getParentObj() {
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
function NUM_getBaseObj() {
  if (this.BasObj == null) {
    this.BasObj = new BaseObj(this.edtObj);
  }
  return this.BasObj;
}

/**
 *名称：NUM_onvalidate
 *功能：校验
 *形参：
 *返回：
 */
function NUM_onvalidate() {
  //调用BaseObj.js中的公用函数检查数据合法性
  if (this.getBaseObj().commonCheck() &&
      this.checkInput() && this.rangeCheck()) {
    return true;
  }
  return false;
}

/**
 *名称：checkInput()
 *功能：检查输入的合法性
 */
function NUM_checkInput() {
  if(this.getBaseObj().isEmpty()){
    return true;
  }
  var inputStr = this.getBaseObj().getObjValue();
  for (var i = 0; i < inputStr.length; i++) {
    var oneChar = inputStr.charAt(i);
    if (oneChar < "0" || oneChar > "9") {
      this.getBaseObj().showAlert("第" + ( i + 1 ) + "位输入不合法！", this.edtObj); 
      return false;
    }
  }
  return true;
}

/**
 *名称：NUM_rangeCheck
 *功能：输入校验
 *形参：
 *返回：
 */
function NUM_rangeCheck() {
  if(this.getBaseObj().isEmpty()){
    return true;
  }
  var inputValue = parseFloat(this.getBaseObj().getObjValue());
  if(isNaN(inputValue)){
    return true;
  }
  var minValue = parseFloat(this.edtObj.getAttribute("minValue"));
  var maxValue = parseFloat(this.edtObj.getAttribute("maxValue"));
  if (!isNaN(minValue)) {
    if (inputValue < minValue) {
      this.getBaseObj().showAlert("输入值必须不小于" + minValue, this.edtObj);
      return false;
    }
  }
  if (!isNaN(maxValue)) {
    if (inputValue > maxValue) {
      this.getBaseObj().showAlert("输入值必须不大于" + maxValue, this.edtObj);
      return false;
    }
  }
  var minValueObj = findObj(this.edtObj.getAttribute("minValueName"));
  if(minValueObj != null){
    var minValue = parseFloat(minValueObj.value);
    if (!isNaN(minValue)) {
      if (inputValue < minValue) {
        this.getBaseObj().showAlert("输入值必须不小于" + minValue, this.edtObj);
        return false;
      }
    }
  }
  var maxValueObj = findObj(this.edtObj.getAttribute("maxValueName"));
  if(maxValueObj != null){
    var maxValue = parseFloat(maxValueObj.value);
    if (!isNaN(maxValue)) {
      if (inputValue > maxValue) {
        this.getBaseObj().showAlert("输入值必须不大于" + maxValue, this.edtObj);
        return false;
      }
    }
  }
  return true;
}

/**
 *
 */
function NUM_onlyNumber() {
  //只允许输入数字
  if (!(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 13))) {
    window.event.keyCode = 0;
  }
}

/**
 * 初始化方法
 */
function NUM_onDocumentReady() {
  //调用ParentObj 的初始化方法
  this.getParentObj().onReady();
}


function NUM_eventBand(){
  this.edtObj.attachEvent("onkeydown", this.getBaseObj().enterToTab);
  this.edtObj.attachEvent("onkeypress", this.onlyNumber);
}
