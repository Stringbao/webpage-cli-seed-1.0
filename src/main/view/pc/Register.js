import Constant from "@constant/index.js";
import BaseView from "@model/core/View.js";
import Intercept from "@observer/Intercept.js";

export default class RegisterPCView extends BaseView{
    constructor(model) {
        super(model);
        this._model = model;
        this._model._view = this;

        this._eventCenter = new RegisterEvent();
    }
    
    interceptList() {
        let arr = [
            {dom:this._emailEl, obj:this._model._email, key:"value"},
            {dom:this._firstNameEl, obj:this._model._firstName, key:"value"},
            {dom:this._lastNameEl, obj:this._model._lastName, key:"value"},
            {dom:this._passwordEl, obj:this._model._password, key:"value"},
            {dom:this._confirmPasswordEl, obj:this._model._confirmPassword,key:"value"},

            {dom:this._emailEl.parents('div.register-input'), obj:this._model._email, key:"errClass", ctype:"class"},
            {dom:this._firstNameEl.parents('div.register-input'), obj:this._model._firstName, key:"errClass", ctype:"class"},
            {dom:this._lastNameEl.parents('div.register-input'), obj:this._model._lastName, key:"errClass", ctype:"class"},
            {dom:$('li[ptag=step1]'), obj:this._model._password.step1, key:"errClass", ctype:"class"},
            {dom:$('li[ptag=step2]'), obj:this._model._password.step2, key:"errClass", ctype:"class"},
            {dom:this._confirmPasswordEl.parents('div.register-input'), obj:this._model._confirmPassword, key:"errClass", ctype:"class"},
        
            {dom:$($(".button-button-structure")[1]), obj:this._model, key:"_isAgreePrivacy", ctype:"disabled"},
            {dom:this._isSubscriberEl, obj:this._model, key:"_isSubscriber", ctype:"checked"},
            {dom:this._rewardsSignupEl, obj:this._model, key:"_rewardsSignup", ctype:"checked"},

            {dom:$(".tip_box"), obj:this._model._validateAjax, key:"showError", ctype:"show"},
            {dom:$(".tip_box .tip_text"), obj:this._model._validateAjax, key:"errorMsg"},
        ];
        arr.forEach(x=>{
            new Intercept({
                doms:x.dom,
                obj:x.obj,
                key:x.key,
                ctype:x.ctype
            }).execute();
        })
    }

    render() {
        this._el = this._rootContainer;
        this._emailEl = this._rootContainer.find("#uEmail");
        this._firstNameEl = this._rootContainer.find("#uFname");
        this._lastNameEl = this._rootContainer.find("#uLname");
        this._passwordEl = this._rootContainer.find("#upwd");
        this._confirmPasswordEl = this._rootContainer.find("#cpwd");
        this._isSubscriberEl = this._rootContainer.find(".subscriber_checkbox");
        this._rewardsSignupEl = this._rootContainer.find(".rewardsSignup_checkbox");
        this._isAgreePrivacyEl = this._rootContainer.find(".agreePrivacy_checkbox");
        this._isRobotEl = this._rootContainer.find(".robot_checkbox");

        this.interceptList();
        this.registerEvent();
    }
}

class RegisterEvent{
    //doRegister
    doRegister(sender, data){
        let view = data.view;
        let model = view._model;
        model._recaptchaResponse = "";
        
        model.validate().then(x=>{
            model._recaptchaResponse = grecaptcha.getResponse();
            if(model._recaptchaResponse == ""){
                alert('recaptchaResponse can not be null');
                return;
            }
            
            model.doRegister().then(x=>{
                if(x.status == 200){
                    window.location.href = "http://test-2c.gl.lenovouat.cn/account/register/pcCheckEmail.html";
                }
            }).catch(err=>{
                model._validateAjax.showError = true;
                model._validateAjax.errorMsg = err.msg;
                $(document).scrollTop(0);
            });
            grecaptcha.reset();
        }).catch(err=>{
            $(document).scrollTop(0);
        })
    }

    accepted(sender, data){
        data.view._model._isAgreePrivacy = sender.checked;
    }

    emailSignup(sender, data){
        data.view._model._isSubscriber = sender.checked;
    }

    rewards(sender, data){        
        data.view._model._rewardsSignup = sender.checked;
    }

    notNone(el){
        $(el).val()?$(el).next(".label").addClass("notnone"):$(el).next(".label").removeClass("notnone");
    }

    blurEmail(sender, data){
        data.view._model.validateEmail();
        this.notNone(sender);
    }

    blurFName(sender, data){
        data.view._model.validateFirstName();
        this.notNone(sender);
    }

    blurLName(sender, data){
        data.view._model.validateLastName();
        this.notNone(sender);
    }

    inputPwd(sender, data){
        data.view._model.validatePassword();
        this.notNone(sender);
    }

    blurCPwd(sender, data){
        data.view._model.validateConfirmPassword();
        this.notNone(sender);
    }

    showPassword(e){
        if( $("#upwd").attr('type') == 'text'){
            $("#upwd").attr('type','password');
            $(e).addClass("tyepIsPsd");
        }else{
            $("#upwd").attr('type','text');
            $(e).removeClass("tyepIsPsd");
        }
    }
    showConfirmPassword(e){    
        if( $("#cpwd").attr('type') == 'text'){
            $("#cpwd").attr('type','password');
            $(e).addClass("tyepIsPsd");
        }else{
            $("#cpwd").attr('type','text');
            $(e).removeClass("tyepIsPsd");
        }
    }
}