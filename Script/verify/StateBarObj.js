/**
 * Title: Jsv1.0 对象集
 * Description: 1.StateBar，无状态的进度条组件，和其他的Object不同，不需要初始化
 *              也没有父对象和基对象，不需要校验  
 *              2.构造方法是需要显示进度条的<div>对象。
 *              3.<div verifyName="StateBar" id="bar" name="bar" width="" height="15" color="#ECF2FF" barColor="#3399FF" text="文件上传中..." speed="10"></div>  
 *              4.jsvObjsMgr.getJsvObj(findObj('bar')).start()开始或jsvObjsMgr.getJsvObj(findObj('bar')).stop()停止。  
 * 属性有: width:进度条的宽度
 *        height:进度条的宽度
 *        color:进度条的颜色
 *        barColor:滚动部分的颜色
 *        text:进度条上的说明文字
 *        speed:进度条的的速度
 * Company: 东北大学软件理论研究所
 * Author: 宋杰 sy_songjie@163.com
 * Date: 2006-09
 * Version 1.0
 */
function StateBarObj(editerObj) {

  //定义输入对象
  this.edtObj = editerObj;

  //公共方法
  this.start = SBO_start;
  this.stop = SBO_stop;
  
  //私有变量
  var tmp = parseInt(editerObj.getAttribute("width"));
  var width = isNaN(tmp) ? 200 : tmp;
  tmp = parseInt(editerObj.getAttribute("height"));
  var height = isNaN(tmp) ? 8 : tmp;
  tmp = editerObj.getAttribute("color");
  var color = tmp == null || tmp == "" ? "#ECF2FF" : tmp;
  tmp = editerObj.getAttribute("barColor");
  var barColor = tmp == null || tmp == "" ? "#3399FF" : tmp;
  var text = editerObj.getAttribute("text");
  tmp = parseInt(editerObj.getAttribute("speed"));
  var speed = isNaN(tmp) ? 30 : tmp;
  
  this.stateBar =  "<table width='1'>"
                 + "  <tr><td style='font-size:12px' align='center'>" + text
                 + "   <marquee style='border:1px solid #000000' width='" + width + "' height='" + height + "' direction='right' scrollamount='" + speed + "' bgcolor='" + color + "'>"
                 + "     <table cellspacing='1' cellpadding='0'>"
                 + "       <tr height='" + height + "'>"
                 + "         <td bgcolor='" + barColor + "' width='8'></td><td></td>"
                 + "         <td bgcolor='" + barColor + "' width='8'></td><td></td>"
                 + "         <td bgcolor='" + barColor + "' width='8'></td><td></td>"
                 + "         <td bgcolor='" + barColor + "' width='8'></td><td></td>"
                 + "       </tr>"
                 + "     </table>"
                 + "   </marquee>"
                 + " </td></tr>"
                 + " </table>";
                 
}
/**
 *@description 刷新函数
 *@param       当前的值
 *@param       当前的工作
 */
function SBO_start() {
  this.edtObj.innerHTML = this.stateBar;
}
/**
 *名称：
 */
function SBO_stop() {
   this.edtObj.innerHTML = "";
}

