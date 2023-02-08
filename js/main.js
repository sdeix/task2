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
      <input v-for="i in options" :key="i" class="pointInput" type="text" placeholder="пункт">
      <input type="submit" @click.prevent="createCard" value="Создать карточку">
      </form>
       
      <card v-for="card in column1" :pointsAndTitle="card" :block="blockOne">  </card>
      
      
      
      </div>
      <div class="column column2">
      <card v-for="card in column2" :pointsAndTitle="card">  </card></div>
      <div class="column column3">
      <card v-for="card in column3" :pointsAndTitle="card">  </card></div>



</div>
`,
data(){
      return{
            cardTitle: '',
            numberOfOptions: 3,
            cards:[],
            options:[],
            points:[],
            column1:[],
            column2:[],
            column3:[],
            blockOne:false,
      }
  },
methods:{
      createCard(){

                  console.log(this.column1.length)
                  
                  this.options.splice(0,this.options.length)
                  this.points.splice(0,this.points.length)
                  let points = document.querySelectorAll('.pointInput')
      
                  for(let i = 0; i < points.length; i++){
                      this.points.push({point: points[i].value ? points[i].value:(i+1)+" пункт", checked: false})
                  }
      
                  let copy = this.points.concat()
      
                  this.column1.push({title: this.cardTitle ? this.cardTitle : 'Без названия', points: copy})




      },
      makeOptionsArr(){
            this.points.splice(0,this.points.length)
            this.options.splice(0,this.options.length);

            for(let i = 0; i < this.numberOfOptions; i++){
                this.options.push(i)
            }
            
      }
},







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
               
              <li v-if="!block" >{{point.point}}</li>
              <hr>
          </div>
      </ul>
      </div>
      `,
      data(){
            return{  
            }
      },
      props:{
            pointsAndTitle: null,

      },
      methods: {
            check(){

            }
      }    
      
})





let app = new Vue({
   el: '#app',
   data: {
   },
})
