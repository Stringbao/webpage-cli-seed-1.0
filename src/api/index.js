
const url = "/router/v2/registration/registerAuth";

export default {
    doRegister(params){
        let registerUrl = flash_fe_core_tool.$util.$coreMethods.getRequestPrefix() + url;
        return flash_fe_core_tool.$http.post(registerUrl,params);
    }
}