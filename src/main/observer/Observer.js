
export default class Obervser{
    constructor(){
        this._parent = null;
        this._subjects = [];
    }
    register(subject){
        this._subjects.push(subject);
    }
    unRegister(observer){
        let _index = -1;
        for (let index = 0; index < this._subjects.length; index++) {
            if(this._subjects[index]._id == observer._id){
                _index = index;
            }
        }
        if(_index != -1){
            this._subjects.splice(_index,1);
        }
    }
    update(data){
        this._subjects.forEach(x => {
            x.onUpdate(data);
        });
        this._parent.updateValue(data);
    }
}