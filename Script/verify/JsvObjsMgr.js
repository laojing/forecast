
/**
 * Jsv1.0 对象管理器，负责所有功能对象的获取、页面初始化工作
 */
jsvObjsMgr = new JsvObjsMgr();

function JsvObjsMgr() {
  this.getJsvObj = JsvOM_getJsvObj;
  this.onReady = JsvOM_onReady; //body的onLoad事件调用
  this.onvalidate = JsvOM_onvalidate; //单入口校验
}
/**
 *名称：得到JsvObject
 */
function JsvOM_getJsvObj(editerObj) {
  var verifyName = editerObj.getAttribute("verifyName");
  var obj = null;
  switch (verifyName) {
    case "Double":
    obj = new DoubleObj(editerObj);
    break;
    case "IDCard":
    obj = new IDCardObj(editerObj);
    break;
    case "Integer":
    obj = new IntegerObj(editerObj);
    break;
    case "Money":
    obj = new MoneyObj(editerObj);
    break;
    case "Number":
    obj = new NumberObj(editerObj);
    break;
    case "Password":
    obj = new PasswordObj(editerObj);
    break;
    case "PasswordConfirm":
    obj = new PasswordConfirmObj(editerObj);
    break;
    case "QuickSelect":
    obj = new QuickSelectObj(editerObj);
    break;
    case "ReadOnly":
    obj = new ReadOnlyObj(editerObj);
    break;
    case "ReadOnlyField":
    obj = new ReadOnlyFieldObj(editerObj);
    break;
    case "Select":
    obj = new SelectObj(editerObj);
    break;
    case "StateBar":
    obj = new StateBarObj(editerObj);
    break;
    case "TextArea":
    obj = new TextAreaObj(editerObj);
    break;
    case "Text":
    obj = new TextObj(editerObj);
    break;
    default:
    obj = null;
  }
  return obj;
}
/**
 *名称：body onload的时候对所有form的所有输入区做初始化
 */
function JsvOM_onReady() {
  var forms = document.forms;
  for (var i = 0; i < forms.length; i++) {
    var form = forms[i];
    for (var j = 0; j < form.elements.length; j++) {
      var obj = form[j];
      if (obj.getAttribute("verifyName") != null && obj.type != "submit" && obj.type != "reset" && obj.type != "button" && obj.type != "hidden" && obj.type != "checkbox") {
        var jsvObj = this.getJsvObj(obj);
        if (jsvObj != null) {
          jsvObj.onReady(); //初始化;
          jsvObj.eventBand(); //初始化;
        }
      }
    }
  }
}

/**
 *名称：form submit的时候对当前form的所有输入区做校验
 */
function JsvOM_onvalidate(editerObj) {
  var jsvObj = this.getJsvObj(editerObj);
  if (jsvObj == null) {
    return true;
  }
  return jsvObj.onvalidate();
}

