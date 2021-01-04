
import DomHelper from "./DomHelper.js";

export default class Subject{
    constructor(dom, type){
        this._dom = dom;
        this._type = type;
    }

    onUpdate(value){
        DomHelper.setValue(this._dom, value, this._type);
    }
}