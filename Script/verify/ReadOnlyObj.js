/**
 * Title: Jsv1.0 对象集
 * Description: 1. ReadOnly 校验组件，Base Object 和 Parent Object都是Base
 *              2. 任何输入都无效,相当于其他输入区maxLength为0
 * 属性有:
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */
 
function ReadOnlyObj(editerObj) {
  //定义输入对象
  this.edtObj = editerObj;
  //公共方法
  this.getParentObj = ROO_getParentObj;
  this.getBaseObj = ROO_getBaseObj;

  this.onvalidate = ROO_onvalidate;

  this.onlyRead = ROO_onlyRead;
  this.onReady = ROO_onContentReady;
  this.eventBand = ROO_eventBand;

  //私有方法

  //私有对象
  var ParObj = null;
  var BasObj = null;
}

/**
 *名称：
 */

function ROO_getParentObj() {
  if (this.ParObj == null) {
    this.ParObj = new BaseObj(this.edtObj);
  }
  return this.ParObj;
}

/**
 *名称：
 */

function ROO_getBaseObj() {
  if (this.BasObj == null) {
    this.BasObj = new BaseObj(this.edtObj);
  }
  return this.BasObj;

}

//这个方法一定要有
function ROO_onvalidate() {
  return true;
}

/**
 *名称：
 */

function ROO_onlyRead() {
  window.event.keyCode = 0;
}

/**
 *名称：
 */

function ROO_onContentReady() {
  //调用ParentObj 的初始化方法
  this.getParentObj().onReady();
}

/**
 *名称：
 */
function ROO_eventBand() {
  this.edtObj.attachEvent("onkeydown", this.getBaseObj().enterToTab);
  this.getBaseObj().eventBand("onkeypress", this.onlyRead);
}
