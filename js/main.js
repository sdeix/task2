let eventBus = new Vue()


Vue.component('board',{
template:`
<div id=board>
      <div class="column column1"><card></card></div>
      <div class="column column2"></div>
      <div class="column column3"></div>



</div>
`

})

Vue.component('card',{
      template:`
      <div id=card>
                  <p>qwew</p>
      
      
      
      </div>
      `
      
      })


let app = new Vue({
   el: '#app',
   data: {
   },
})
