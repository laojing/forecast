/**
 * Title: Jsv1.0 对象集
 * Description: 1. Double 校验组件，Base Object 是 BaseObj,Parent Object是Number
 *              2. 小数，只能输入数字，小数点,"-"和"Tab"
 *              3. 输入的必须是一个小数
 * 属性有:precision:精度，也就是小数点后的位数，是最大长度与小数点位数的差。
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */
function DoubleObj(editerObj) {
  //定义输入对象
  this.edtObj = editerObj;
  //公共方法
  this.onvalidate = DOU_onvalidate;
  this.checkInput = DOU_checkInput;
  this.getParentObj = DOU_getParentObj;
  this.getBaseObj = DOU_getBaseObj;
  this.onReady = DOU_onReady;
  this.eventBand = DOU_eventBand;
  this.onlyNumber = DOU_onlyNumber;
  this.checkPrecision = DOU_checkPrecision;

  //私有方法

  //私有对象
  var ParObj = null;
  var BasObj = null;
}

/**
 *名称：getParentObj()
 *功能：获取父对象
 *形参：无
 *返回：父对象
 */
function DOU_getParentObj() {
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
function DOU_getBaseObj() {
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
function DOU_onvalidate() {
  //调用BaseObj.js中的公用函数检查数据合法性
  if (this.getBaseObj().commonCheck() && 
      this.getParentObj().rangeCheck() &&
      this.checkInput() && 
      this.checkPrecision()) {
    return true;
  }
  return false;
}

/**
 *名称：checkInput()
 *功能：检查符号"."和"-"输入的合法性
 */
function DOU_checkInput() {
  if(this.getBaseObj().isEmpty()){
    return true;
  }
  var checkStr = this.getBaseObj().getObjValue();
  //第一位是0,第二位必须是小数点
  if(checkStr.charAt(0) == "0" && checkStr.charAt(1) != "."){
    this.getBaseObj().showAlert("第一位是0,第二位必须是小数点", this.edtObj); 
    return false;
  }
  //第一位是负号,第二位必须是1-9
  if(checkStr.charAt(0) == "-" && (checkStr.charAt(1) < "0" || checkStr.charAt(1) > "9")){
    this.getBaseObj().showAlert("第一位是负号,第二位必须是数字", this.edtObj); 
    return false;
  }
  //第一位不能是小数点
  if(checkStr.charAt(0) == "."){
    this.getBaseObj().showAlert("第一位不可以是小数点", this.edtObj); 
    return false;
  }
  var flag = false;
  //从第二位开始,只能是0-9或小数点且小数点只能出现一次
  for (var i = 1; i < checkStr.length; i++) {
    var oneChar = checkStr.charAt(i);
    if (oneChar < "0" || oneChar > "9") {
      if(oneChar == "." && !flag){
        flag = true;
        continue;
      }else{
        this.getBaseObj().showAlert("数字不合法", this.edtObj); 
      }
    }
  }
  return true;
}

/**
 *名称：checkPrecision()
 *功能：校验精度
 */
function DOU_checkPrecision() {
  if(this.getBaseObj().isEmpty()){
    return true;
  }
  var inputStr = this.getBaseObj().getObjValue();
  var pcs = this.edtObj.getAttribute("precision");
  var precision = parseInt(pcs);
  if(pcs == null || pcs == "" || isNaN(precision)){
    return true;
  }
  var inputPcs = (inputStr.length - 1) - inputStr.indexOf(".");
  if (!isNaN(precision)) {
    if (inputPcs < precision) {
      this.getBaseObj().showAlert("精度不符，要求精度至少" + precision +
                                "位。", this.edtObj); 
      return false;
    }
    return true;
  }
}
/**
 *
 */
function DOU_onlyNumber() {
  var checkStr = event.srcElement.value;
  
  //第一位不允许输入小数点"."
  if (checkStr == null || checkStr == ""){
    if (window.event.keyCode == 46){
      window.event.keyCode = 0;
    }
  }
  //如果第一位是负号，第二位禁止输入"."
  if (checkStr == "-"){
    if (window.event.keyCode == 46){
      window.event.keyCode = 0;
    }
  }
  //如果第一位是0或前两位是"-0"，第二位只能输入"."
  if (checkStr == "0" || checkStr == "-0"){
    if (window.event.keyCode != 46){
      window.event.keyCode = 0;
    }
  }
  //只要有输入，其他位不允许输入负号"-"(第一位输入负号)
  if (checkStr.length > 0){
    if (window.event.keyCode == 45){
      window.event.keyCode = 0;
    }
  }

  //如果已经输入一个小数点，则禁止再次输入小数点。并且小数点不能输入在第一位
  var n = checkStr.indexOf(".");
  if (n > -1){
    if (window.event.keyCode == 46){
      window.event.keyCode = 0;
    }
  } 
  if (!(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) ||
     (window.event.keyCode == 13) || (window.event.keyCode == 46) || 
     (window.event.keyCode == 45))) {
    window.event.keyCode = 0;
  }
}

/**
 *
 */
function DOU_onReady() {
  //调用ParentObj 的初始化方法
  this.getParentObj().onReady();
}

/**
 *
 */
function DOU_eventBand() {
  this.edtObj.attachEvent("onkeydown", this.getBaseObj().enterToTab);
  this.edtObj.attachEvent("onkeypress", this.onlyNumber);
}

