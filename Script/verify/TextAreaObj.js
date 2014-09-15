
/**
 * Title: Jsv1.0 对象集
 * Description: 1. TextArea 校验组件，Base Object和Parent Object是 BaseObj
 *              2. 没什么特殊的校验
 *              3. 回车不会转化成Tab 
 *              4. Copy时候的长度过滤(测试未通过)    
 * 属性有:
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */
function TextAreaObj(editerObj) {

  //定义输入对象
  this.edtObj = editerObj;

  //公共方法
  this.getParentObj = TAO_getParentObj;
  this.getBaseObj = TAO_getBaseObj;
  this.onvalidate = TAO_onvalidate;
  this.onReady = TAO_onContentReady;
  this.doKeypress = TAO_doKeypress;
  this.doPaste = TAO_doPaste;
  this.eventBand = TAO_eventBand;

  //私有方法

  //私有对象
  var ParObj = null;
  var BasObj = null;
}

/**
 *名称：
 */
function TAO_getParentObj() {
  if (this.ParObj == null) {
    this.ParObj = new BaseObj(this.edtObj);
  }
  return this.ParObj;
}

/**
 *名称：
 */
function TAO_getBaseObj() {
  if (this.BasObj == null) {
    this.BasObj = new BaseObj(this.edtObj);
  }
  return this.BasObj;
}

/**
 *名称：
 */
function TAO_onvalidate() {
  return this.getBaseObj().commonCheck();
}


function TAO_doKeypress() {
  var maxLength = parseInt(event.srcElement.getAttribute("maxLength"));
  if (isNaN(maxLength)) {
    return;
  }
  if (!isNaN(maxLength)) {
    maxLength = parseInt(maxLength);
    var oTR = event.srcElement.document.selection.createRange();
     // Allow user to type character if at least one character is selected
    if (oTR.text.length >= 1) {
      event.returnValue = true;
    } else {
      if (event.srcElement.value.length > maxLength - 1) {
        event.returnValue = false;
      }
    }
  }
}

/**
 *
 */
function TAO_doPaste() {
  var maxLength = parseInt(event.srcElement.getAttribute("maxLength"));
  if (isNaN(maxLength)) {
    return;
  }
  var oTR = event.srcElement.document.selection.createRange();
  var iInsertLength = maxLength - event.srcElement.value.length;
  var sData = window.clipboardData.getData("Text").substr(0, iInsertLength);
  oTR.text = sData;
}

/**
 *名称：
 */
function TAO_onContentReady() {
  //调用ParentObj 的初始化方法
  this.getParentObj().onReady();
}

/**
 *名称：
 */
function TAO_eventBand() {
  this.edtObj.attachEvent("onkeypress", this.doKeypress);
  this.edtObj.attachEvent("onpaste", this.doPaste);
}

