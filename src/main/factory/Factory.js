

export default class Factory{
    constructor(){

    }
    create(type, data){
        if(this.__proto__.hasOwnProperty(type) && typeof(this.__proto__[type]) == "function"){
            return this.__proto__[type].call(this, data);
        }
        return null;
    }
}