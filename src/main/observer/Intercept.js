import Observer from "./Observer.js";
import Subject from "./Subject.js";
import ObjectProxy from "./ObjectProxy.js";
import DomHelper from "./DomHelper.js";

export default class Intercept{
    constructor(opts = {doms:[],obj:null,key:"",ctype:""}){
        this._doms = opts.doms instanceof Array?opts.doms:[opts.doms];
        this._obj = opts.obj;
        this._key = opts.key;
        this._type = opts.ctype;
        this._observer = new Observer();

        this._value = null;
    }

    execute(){
        this._observer._parent = this;
        this._doms.forEach(x=>{
            this._observer.register(new Subject(x, this._type));
        })
        return new ObjectProxy(this._obj, this._doms, this._key, this._observer).init();
    }

    updateValue(val){
        this._value = val;
    }

    getValue(){
        if(this._type == CONSTANT.OBSERVER_ELEMENT.TYPE.CLASS){
            return this._value;
        }
        return DomHelper.getValue(this._doms[0], this._type);
    }
}