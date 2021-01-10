
import Delivery from "../model/Delivery.js";
import Sku from "../model/Sku.js";
import Checkout from "../model/Checkout.js";

class CheckoutService{

    static getName(){
        return "CheckoutService";
    }

    constructor(){
        
    }

    getSkuAndDeliveryData(){
        return API.getCheckout().then(x=>{
            let _checkoutModel = new Checkout();
            _checkoutModel._delivery = new Delivery(x.data.delivery);
            _checkoutModel._sku = new Sku(x.data.skus);
            return Promise.resolve({checkoutModel:_checkoutModel});
        })
    }

}

engine.registerService(CheckoutService.getName(), new CheckoutService());

export default new CheckoutService();