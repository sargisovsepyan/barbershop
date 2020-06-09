# swal-vue

Vue.js wrapper for SweetAlert2.


---

## Get started


```bash
yarn add swal-vue
```


```js
// main.js
import Vue from 'vue';
import SwalVue from 'swal-vue';

Vue.use(SwalVue);
```

Now you can use SweetAlert2 in your Vue project [sweetalert2](https://github.com/limonte/sweetalert2).

```html
// vue-component.vue
<template>
    <button @click="showAlert">Hello world</button>
    <button @click="showAlertWithComponent('hello')">Hello world, again</button>
    <button @click="showAlertWithComponent2('hello')">Hello world, another time</button>
</template>

<script>
import anotherVueComponent from 'another-vue-component.vue'

export default {
    methods: {
        showAlert(){
            // Use sweetalert2
            this.$swal.fire({
                type: 'success',
                title: 'Hello world',
                text: 'hi from swal-vue',
            })
        },
        /**
         * include a Vue component in the modal
         */
        showAlertWithComponent(message){
            // Use sweetalert2
            this.$swal.fire({
                type: 'success',
                title: 'Hello world',
                text: 'hi from swal-vue',
                component: anotherVueComponent,
                componentArgs: {propsData: {msg: message}}
            })
            // if you need access to the component
            const component = this.$swal.getComponent()
        },
        /**
         * another way to include a Vue component in the modal
         */
        showAlertWithComponent2(message){
            // Use sweetalert2
            this.$swal.fire({
                type: 'success',
                title: 'Hello world',
                text: 'hi from swal-vue',
            })
            this.$swal.addVueComponent(anotherVueComponent, {propsData: {msg: message}})
            // if you need access to the component
            const component = this.$swal.getComponent()
        }
    }
}
</script>
```

// Or
```js
Vue.$swal('Hello world!');
```

## [`sweetalert2` documentation] (https://sweetalert2.github.io/)