/**
 * Title: Jsv1.0 对象集
 * Description: 1. PasswordConfirm 校验组件，Base Object 和 Parent Object都是Base
 * 属性有:prePassword: 指定前一个password输入区的name,当前必须和现在一样
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */

function PasswordConfirmObj(editerObj){

  //定义输入对象
  this.edtObj = editerObj;


  //公共方法
  this.getParentObj = PCF_getParentObj;
  this.getBaseObj = PCF_getBaseObj;

  this.onvalidate = PCF_onvalidate;
  this.checkPassword = PCF_checkPassword;

  this.onlyNumber = PCF_onlyNumber;
  this.onReady = PCF_onDocumentReady;
  this.eventBand = PCF_eventBand;


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
function PCF_getParentObj(){
  if (this.ParObj == null){
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
function PCF_getBaseObj(){
  if (this.BasObj == null){
    this.BasObj = new BaseObj(this.edtObj);
  }
  return this.BasObj;
}

/**
 *名称：
 */
function PCF_onvalidate(){
  if (this.getBaseObj().commonCheck() &&
      this.checkPassword()){
    return true;
  }
  return false;
}

//校验输入password是否一致
function PCF_checkPassword(){
  var pass1ID = this.edtObj.getAttribute("prePassword");
  var pass1 = findObj(pass1ID).value;
  var pass2 = this.getBaseObj().getObjValue();
  if (pass1 != pass2){
    this.getBaseObj().showAlert("密码输入不一致，请重新输入！", this.edtObj);
    return false;
  }
  return true;
}

/**
 *名称：
 */
function PCF_onlyNumber(){
}

function PCF_onDocumentReady(){
  //调用ParentObj 的初始化方法
  this.getParentObj().onReady();
  this.edtObj.setAttribute(type,"password");
}

function PCF_eventBand(){
  this.edtObj.attachEvent("onkeydown", this.getBaseObj().enterToTab);
}
;
