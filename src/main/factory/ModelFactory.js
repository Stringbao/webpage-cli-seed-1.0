import Register from "@model/Register.js";
import Factory from "./Factory";
import Constant from "@constant/index.js";

export default class PromotionFactory extends Factory {
    constructor(){
        super();
    }
}

PromotionFactory.prototype[Constant.MODEL_TYPES.REGISTER.TYPE] = function(data){
    let _register = new Register();
    _register.init(data);
    return _register;
}