
import AddressView from "./Address.js";
import CouponView from "./Checkout.js";

export default class CheckoutView {
    constructor(){
        this._addressView = null;
        this._couponView = null;
    }

    init(){
        this._addressView = new AddressView();
        this._couponView = new CouponView();

        let checkoutServices = engine.getService("CheckoutService");
        let addressServices = engine.getService("AddressService");

        this._couponView.init();
        this._addressView.init();
    }
}