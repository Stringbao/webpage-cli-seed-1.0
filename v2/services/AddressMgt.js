
import Address from "../model/Address.js";

class AddressService{
    static getName(){
        return "AddressService";
    }

    getAddressList(){
        API.get().then(x=>{
            new Address(x);
        })
    }

    createAddress(){

    }

    updateAddress(){

    }

    listEnbaleAddress(){

    }

    getSelectedAddress(){

    }
}

engine.registerService(AddressService.getName(), new AddressService());

export default new AddressService();