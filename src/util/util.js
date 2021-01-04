import {cloneDeep} from "lodash-es";

const $util = {
    
}

const $idSeed = {
    id:100000,
    newId:()=>{
        return $idSeed.id++;
    }
}

export {
    $util,
    $idSeed
}

export default {
    $util,
    $idSeed
}