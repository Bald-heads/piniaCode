import {getCurrentInstance, inject} from "vue"
import {piniaSymbol} from "./piniaSymbol";
import {createSetupStore} from "./createSetupStore";
import {createOptionsStore} from "./createOptionsStore";

export function defineStore(idOrOptions, optionsOrSetup) {
    let id, options
    if (typeof idOrOptions === "string") {
        id = idOrOptions
        options = optionsOrSetup
    } else {
        options = optionsOrSetup
        id = optionsOrSetup.id
    }
    const useStore = () => {
        const instance = getCurrentInstance()
        const piniaStore = instance && inject(piniaSymbol)
        if (!piniaStore._stores.has(id)) {
            if (typeof optionsOrSetup === "function") {
                createSetupStore(id, optionsOrSetup, piniaStore)
            } else {
                createOptionsStore(id, options, piniaStore)
            }
        }
        return piniaStore._stores.get(id)
    }
    return useStore
}