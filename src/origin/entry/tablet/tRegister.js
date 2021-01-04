import "@css/pc/pcRegister.scss";
import "@css/tablet/tRegister.scss";
import Engine from "@services/register.js";

let _engine = new Engine();
//develpoment环境下需要执行该方法, 生产环境无需执行
if(!$PRODUCTION){
    _engine.init(flash_fe_core_tool.$CONSTANT.TERMINAL.TABLET, $(".rectangle-copy"));
}
export default _engine;