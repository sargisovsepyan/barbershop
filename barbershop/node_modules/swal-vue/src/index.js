import Vue from 'vue'
import 'sweetalert2/dist/sweetalert2.min.css'
import Swal from 'sweetalert2/dist/sweetalert2.min.js'

/**
 * helper function to add a Vue component inside the SweetAlert content
 * the component must be created 
 * 
 * @param {Object} component a vue component definition
 * @param {Object} args arguments to pass to the component on creation (propsData, etc...)
 */
Swal.addVueComponent = function(component, args={}) {
    const content = this.getContent()
    const componentContainer = document.createElement('div')
    componentContainer.classList.add('vue-component')
    content.appendChild(componentContainer)
    try {
        const vueConstructor = Vue.extend(component)
        const vueInstance = new vueConstructor(args)
        vueInstance.$mount(componentContainer)
        return vueInstance
    } catch (error) {
        console.log('error inserting the vue component', error)
    }
}
/**
 * extend the fire method to accept a vue component
 * store a reference to the component instance in the component variable
 */
Swal._fire = Swal.fire // keep a reference to the original method
Swal.fire = function(settings) {
    this.component = null // reset the component reference
    const component = settings.component || null
    const modal = this._fire(settings)
    if(component) {
        const args = settings.componentArgs || {}
        this.component = this.addVueComponent(component, args)
    }
    return modal
}
/**
 * return the component embedded in the modal
 */
Swal.getComponent = function() {
    return this.component || null
}

class SwalVue {
    constructor(Swal) {
        // keep a reference to the original method
        this.Swal = Swal
        this._fire = Swal.fire
    }


}




export default {
    install(Vue) {
        // set a global reference
        Vue.$swal = Swal
        // Vue instance property
        Vue.prototype.$swal = Swal
    },
}