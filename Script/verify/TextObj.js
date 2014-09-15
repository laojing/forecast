/**
 * Title: Jsv1.0 对象集
 * Description: 1. Text 校验组件，Base Object和Parent Object是 BaseObj
 *              2. 没什么特殊的校验
 * 属性有:
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */

function TextObj(editerObj) {

  //定义输入对象
  this.edtObj = editerObj;

  //公共方法
  this.getParentObj = TEX_getParentObj;
  this.getBaseObj = TEX_getBaseObj;
  this.onvalidate = TEX_onvalidate;
  this.onlyNumber = TEX_onlyNumber;
  this.onReady = TEX_onContentReady;
  this.eventBand = TEX_eventBand;
  var ParObj = null;
  var BasObj = null;
}

/**
 *名称：
 */
function TEX_getParentObj() {
  if (this.ParObj == null) {
    this.ParObj = new BaseObj(this.edtObj);
  }
  return this.ParObj;
}

/**
 *名称：
 */
function TEX_getBaseObj() {
  if (this.BasObj == null) {
    this.BasObj = new BaseObj(this.edtObj);
  }
  return this.BasObj;
}

/**
 *名称：
 */
function TEX_onvalidate() {
  //调用BaseObj.js中的公用函数检查合法性
  return this.getBaseObj().commonCheck();
}

/**
 *
 */
function TEX_onContentReady() {
  //调用ParentObj 的初始化方法
  this.getParentObj().onReady();
}

function TEX_onlyNumber() {
}

function TEX_eventBand() {
  this.edtObj.attachEvent("onkeydown", this.getBaseObj().enterToTab);
}

