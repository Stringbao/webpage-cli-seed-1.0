
export default class ObjectProxy{
    constructor(obj, dom, key, observer){
        this._obj = obj;
        this._dom = dom;
        this._key = key;

        this._observer = observer;
    }

    registerField(){
        let that = this;
        let value = that._obj[that._key];
        Object.defineProperty(this._obj, this._key, {
            get(){
                return that._observer._parent.getValue();
            },
            set(newVal){
                // if(value == newVal){
                //     return;
                // };
                value = newVal;
                that._observer.update(newVal);
            }
        })
    }

    registerAll(){
        for(let i in this._obj){
            if(this._obj.hasOwnProperty(i)){
                let val = this._obj[i];
                if(typeof val === "object"){
                    this.registerAll(val);
                }else{
                    this.handler(i, val);
                }
            }
        }
    }

    handler(key, val){
        Object.defineProperty(this._obj, key, {
            enumerable: true,
            confingurable: true,
            get(){
                return val;
            },
            set(newVal){
                val = newVal;
            }
        })
    }

    init(){
        this.registerField();
    }
}