
/**
 * Title: Jsv1.0 对象集
 * Description: 1. Select 校验组件，Base Object ,Parent Object 都是 BaseObj
 *              2. 主要是为了非空校验加上一个"请选择"
 * 属性有:
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */
function SelectObj(editerObj) {

  //定义输入对象
  this.edtObj = editerObj;

  //公共方法
  this.getParentObj = SEL_getParentObj;
  this.getBaseObj = SEL_getBaseObj;
  this.onvalidate = SEL_onvalidate;
  this.onReady = SEL_onDocumentReady;
  this.eventBand = SEL_eventBand;

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
function SEL_getParentObj() {
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
function SEL_getBaseObj() {
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
function SEL_onvalidate() {

  //调用BaseObj.js中的公用函数检查数据合法性
  if (this.getBaseObj().commonCheck()) {
    return true;
  }
  return false;
}
/**
 *名称：onDocumentReady
 *功能：在select中自动增加这项<option value="">请选择</option>
 *形参：
 *返回：
 */
function SEL_onDocumentReady() {
  try {
    if (this.edtObj.options(0).text != "请选择") {
      this.edtObj.add(new Option("请选择", ""), 0);
      this.edtObj.selectedIndex = this.edtObj.selectedIndex - 1;
    }
  }
  catch (e) {
  }
  if (!flag && ((this.edtObj.selectedIndex == 0) || (this.edtObj.selectedIndex == -1))) {
    this.edtObj.selectedIndex = 0;
  }

  //调用父类的初始化方法
  this.getParentObj().onReady();
}
/**
 *名称：
 */
function SEL_eventBand() {
  this.edtObj.attachEvent("onkeydown", this.getBaseObj().enterToTab);
}

