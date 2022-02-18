import Vue from 'vue'

export default class FormService {
    constructor (data) {
        this.originalData = data
        this.setData(data)
    }

    setData (data) {
        let copyData = JSON.parse(JSON.stringify(data))
        for (let property in copyData) {
            Vue.set(this, property, copyData[property])
        }

        /**
         * Use for Vue 3:
         * Object.assign(this, JSON.parse(JSON.stringify(data)));
         */
    }

    getData (all = false) {
        let newData = {}

        let data = all ? this : this.originalData
        for (let property in data) {
            newData[property] = this[property]
        }

        return JSON.parse(JSON.stringify(newData))
    }

    reset () {
        let data = this.originalData
        Object.keys(this).forEach(x => delete this[x])
        this.originalData = data
        this.setData(data)
    }
}
