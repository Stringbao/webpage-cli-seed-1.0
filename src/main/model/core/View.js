
export default class BaseView{
    constructor(model){
        this._el = null;
        this._model = model;
        this._rootContainer = null;
    }

    setRootContainer(rootContainer){
        this._rootContainer = rootContainer;
    }

    render(){

    }

    registerEvent(){
        let that = this;
        let eventNams = ["click", "blur", "input"];
        eventNams.forEach(ename=>{
            let tmp = "le" + ename;
            this._el && this._el.find("["+tmp+"]").each((index, item)=>{
                let eventHandlerName = $(item).attr(tmp);
                (function(dom, eventHandlerName){
                    $(dom).off(ename).on(ename, function(){
                        that._eventCenter[eventHandlerName](this, {view:that})
                    });
                })(item, eventHandlerName);
            })
        })
    }
 
    domChangedHelper(sender, cb){
        // let tagName = sender.get(0).tagName.toLowerCase();
        // let type = sender.get(0).type;
        // if(tagName == "input"){
        //     if(type == "text" || type =="password"){
        //         $(sender).off("input").on("input",function(){
        //             cb && cb(this);
        //         })
        //     }
        // }
    }
}