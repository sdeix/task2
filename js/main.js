Vue.component('card', {
   template: `
<div class="card">

    <ul>
               <li v-for="(cardn, index) in count">
    <div>
      <input type="checkbox" id=cardn name=cardn>
      <label for=cardn>Scales</label>
    </div>


               </li>
    </ul>
        </div>

 `,
 props: {
          count: Number,

   },

})


let app = new Vue({
   el: '#app',
   data: {
       premium: true,
       cart: []
   },
})
