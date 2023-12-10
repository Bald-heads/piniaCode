import {reactive} from "vue";

export function createSetupStore(id, setup, piniaStore) {
    function warpAction(action) {
        return function () {
            const warpFunction = action.apply(store, arguments)
            return warpFunction
        }
    }

    const store = reactive({})
    const setupStore = setup()
    for (const setupStoreKey in setupStore) {
        const prop = setupStore[setupStoreKey]
        if (typeof prop === "function") {
            setupStore[setupStoreKey] = warpAction(prop)
        }
    }

    Object.assign(store, setupStore)
    piniaStore._stores.set(id, store)
}