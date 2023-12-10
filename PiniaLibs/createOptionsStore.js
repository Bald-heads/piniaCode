import {computed} from "vue";
import {createSetupStore} from "./createSetupStore";

export function createOptionsStore(id, options, piniaStore) {
    const {state, getters, actions} = options
    const setup = () => {
        const localState = state ? state() : {}
        return Object.assign(localState, actions, Object.keys(getters).reduce((computedGetter, getterName) => {
            computedGetter[getterName] = computed(() => {
                const store = piniaStore._stores.get(id)
                return getters[getterName].call(store, store)
            })
            return computedGetter
        }, {}))
    }
    createSetupStore(id, setup, piniaStore)
}