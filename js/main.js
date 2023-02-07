let eventBus = new Vue()


Vue.component('board',{
template:`
<div id=board>
      <div class="column column1">
      <form>
      <div id="upperFormDiv">
          <div>
              <p>Название карточки:</p>
              <input type="text" placeholder="Название" v-model="cardTitle" maxlength="15">
          </div>
          <p>Количество заметок в карточке:</p>
          <input type="number" max="5" min="3" v-model="numberOfOptions">
          
          
          <input type="submit" value="Создать пункты" @click.prevent="makeOptionsArr" maxlength="20">
      </div>
      <input v-for="i in 5" :key="i" class="pointInput" type="text" placeholder="пункт">
      <input type="submit" @click.prevent="createCard" value="Создать карточку">
      </form>
       
      <card></card>
      
      
      
      </div>
      <div class="column column2"></div>
      <div class="column column3"></div>



</div>
`,
data(){
      return{
            cardTitle: '',
            numberOfOptions: 5,
            cards:[],
      }
  },
methods:{
      createCard(){

      },
      makeOptionsArr(){

            
      }

}

})

Vue.component('card',{
      template:`
      <div id=card>
      <p id="cardTitle">{{pointsAndTitle.title}}</p>
      <ul id="pointslist">
          <div v-for="point in pointsAndTitle.points"
               @click="point.checked=true"
               @click="check"
               :class="{done:point.checked}">
              <li>{{point.point}}</li>
              <hr>
          </div>
      </ul>
      </div>
      `,
      data(){
            return{   
                  pointsAndTitle: {points : [{checked:false, point:"qweqweqw1"}, {checked:false, point:"2qweqweq"}, {checked:false, point:"qweqwe3"}, {checked:false, point:"4qweqweqw"}], title:"title"}                  
            }
      },
      props:{

      },
      methods: {
            check(){
                  console.log(this.pointsAndTitle)
            }
      }    
      
})





let app = new Vue({
   el: '#app',
   data: {
   },
})
