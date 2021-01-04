
const htmlTags = ["div"];
const textTags = ["p","span","h1","h2","h3","h4","h5","h6"];
const valTags = ["input","select"];

export default {
    checkTagName(tagName){
        let res = {
            isHtmlTag:false,isValTag:false,isTextTag:false
        }
        res.isHtmlTag = htmlTags.filter(x=>{
            return tagName == x;
        }).length > 0?true:false;
        res.isValTag = valTags.filter(x=>{
            return tagName == x;
        }).length > 0?true:false;
        res.isTextTag = textTags.filter(x=>{
            return tagName == x;
        }).length > 0?true:false;
        return res;
    },
    setValue(dom, val, type = flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.VALUE){
        let _dom = dom.get(0);
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CLASS){
            dom.attr("class", val);
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.SHOW){
            val?dom.show():dom.hide();
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CHECKED){
            _dom.checked = val;
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.SELECTED){
            dom.val(val);
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.VALUE){
            let tagName = _dom.tagName.toLowerCase();
            let res = this.checkTagName(tagName);
            if(res.isHtmlTag){
                $(_dom).html(val);
            }
            if(res.isTextTag){
                $(_dom).text(val);
            }
            if(res.isValTag){
                $(_dom).val(val);
            }
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.DISABLED){
            !val?dom.attr("disabled","disabled"):dom.removeAttr("disabled");
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.READONLY){
            !val?dom.attr("readonly","readonly"):dom.removeAttr("readonly");
        }
    },
    getValue(dom, type = flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.VALUE){
        let _dom = dom.get(0);
        let tagName = _dom.tagName.toLowerCase();
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.VALUE){
            let res = this.checkTagName(tagName);
            if(res.isHtmlTag){
                return dom.html();
            }
            if(res.isTextTag){
                return dom.text();
            }
            if(res.isValTag){
                return dom.val();
            }
            if(res.isSelectTag){
                return dom.val();
            }
            if(res.isCheckedTag){
                return _dom.checked;
            }
            return "";
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.SHOW){
            return _dom.style.display == "display"?true:false;
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.DISABLED){
            return dom.attr("disabled")?false:true;
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.READONLY){
            return dom.attr("readonly")?false:true;
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.CHECKED){
            return _dom.checked;
        }
        if(type == flash_fe_core_tool.$CONSTANT.OBSERVER_ELEMENT.TYPE.SELECTED){
            return dom.val(val);
        }
    }
}