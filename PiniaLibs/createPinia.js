import {piniaSymbol} from "./piniaSymbol";

export function createPinia() {
    const piniaStore = {
        _stores: new Map(),
        install(application) {
            application.provide(piniaSymbol, piniaStore)
            application.config.globalProperties.$pinia = piniaStore
        }
    }
    return piniaStore
}