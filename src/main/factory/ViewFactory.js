import Factory from "./Factory";
import Constant from "@constant/index.js";

//如果 PC mobile  tablet公用一套view，只需在声明的时候指向一个view即可

/*********************  PC *********************************/
import RegisterPC from "@vpc/Register.js";

/*********************  Wap *********************************/
import RegisterMobile from "@vpc/Register.js";

/********************* tablet *********************************/
import RegisterTablet from "@vpc/Register.js";

const createViewByType = (pcType, mobileType, tabletType, data) => {
    let model = data.model;
    let obj = new pcType(model);
    switch(data.deviceType){
        case flash_fe_core_tool.$CONSTANT.TERMINAL.MOBILE:
            obj = new mobileType(model);
            break;
        case flash_fe_core_tool.$CONSTANT.TERMINAL.TABLET:
            obj = new tabletType(model);
            break;
    }
    return obj;
}

export default class ViewFactory extends Factory{
    constructor(){
        super();
    }
}

ViewFactory.prototype[Constant.MODEL_TYPES.REGISTER.TYPE] = (data)=>{
    return createViewByType(RegisterPC, RegisterMobile, RegisterTablet, data);
}