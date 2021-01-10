import ViewFactory from "@factory/ViewFactory.js";
import ModelFactory from "@factory/ModelFactory.js";
import Constant from "@constant/index.js";

export default class Engine {
    constructor(){
        this._register = null;
    }

    //model 
    notice(){
        
    }

    init(deviceType, rootContainer){
        this._rootContainer = rootContainer;
        this._register = new ModelFactory().create(Constant.MODEL_TYPES.REGISTER.TYPE, null);
        let _registerView = new ViewFactory().create(Constant.MODEL_TYPES.REGISTER.TYPE, {model:this._register,deviceType:deviceType});
        _registerView.setRootContainer(this._rootContainer);
        _registerView.render();
        this.notice();
        flash_fe_core_tool.$customer_events.on(flash_fe_core_tool.$CONSTANT.CUSTOMER_EVENT_KEY.ACCOUNT.REGISTER).setIndex(0);
    }
}