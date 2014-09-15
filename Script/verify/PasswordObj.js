/**
 * Title: Jsv1.0 对象集
 * Description: 1. Password 校验组件，Base Object 和 Parent Object都是Base
 * 属性有:
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */

function PasswordObj(editerObj) {

  //定义输入对象
  this.edtObj = editerObj;

  //公共方法
  this.getParentObj = PAS_getParentObj;
  this.getBaseObj = PAS_getBaseObj;

  this.onvalidate = PAS_onvalidate;

  this.onReady = PAS_onDocumentReady;
  this.onlyNumber = PAS_onlyNumber;
  this.eventBand = PAS_eventBand;

  //私有方法

  //私有对象
  var ParObj = null;
  var BasObj = null;
}

/**
 *名称：
 */
function PAS_getParentObj() {
  if (this.ParObj == null) {
    this.ParObj = new BaseObj(this.edtObj);
  }
  return this.ParObj;
}

/**
 *名称：
 */
function PAS_getBaseObj() {
  if (this.BasObj == null) {
    this.BasObj = new BaseObj(this.edtObj);
  }
  return this.BasObj;
}

/**
 *名称：
 */


function PAS_onvalidate() {
  //调用BaseObj.js中的公用函数检查数据合法性
  if (this.getBaseObj().commonCheck()) {
    return true;
  }
  return false;
}

/**
 *名称：
 */

function PAS_onDocumentReady() {
  //调用ParentObj 的初始化方法
  this.getParentObj().onReady();
  this.edtObj.setAttribute(type,"password");
}

function PAS_onlyNumber() {}

function PAS_eventBand(){
  this.edtObj.attachEvent("onkeydown", this.getBaseObj().enterToTab);
}
;
