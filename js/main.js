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
      <card v-for="(card, index) in column3" :dat="dat[index]" :pointsAndTitle="card" >  </card></div>
<button
      v-on:click="Cleen()"
>
  cleen
</button>


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
            dat: [],
            allColumns:[],
            al:[]
      }
  },
methods:{
      Cleen(){
            this.column1=[],
            this.column2=[],
            this.column3=[],
            this.dat=[],
            this.blockOne= false

      },
      createCard(){
            let points = document.querySelectorAll('.pointInput')
            console.log(points.length)
            if(this.column1.length!=3 && points.length>2){
                  
                  this.options.splice(0,this.options.length)
                  this.points.splice(0,this.points.length)
                  let points = document.querySelectorAll('.pointInput')
      
                  for(let i = 0; i < points.length; i++){
                      this.points.push({point: points[i].value ? points[i].value:(i+1)+" пункт", checked: false})
                  }
      
                  let copy = this.points.concat()
      
                  this.column1.push({title: this.cardTitle ? this.cardTitle : 'Без названия', points: copy})

            }


      },
      makeOptionsArr(){
            this.points.splice(0,this.points.length)
            this.options.splice(0,this.options.length);

            for(let i = 0; i < this.numberOfOptions; i++){
                this.options.push(i)
            }
            
      }
},
computed: {

},
mounted(){
      if (localStorage.getItem('allColumns')) {
            try {
              this.allColumns = JSON.parse(localStorage.getItem('allColumns'));
              this.column1 = this.allColumns[0]
              this.column2 = this.allColumns[1]
              this.column3 = this.allColumns[2]
              this.dat = this.allColumns[3]
              this.blockOne = this.allColumns[4]
            } catch(e) {
              localStorage.removeItem('allColumns');
            }
      }

      eventBus.$on('checkCard', cardsCheck => {
            if(this.column2.length<5){

                  for(let i = 0; i < this.column1.length; i++){
                        let numbOfChecked = 0
      
                        for(let j = 0; j < this.column1[i].points.length; j++){
                            if(this.column1[i].points[j].checked === true){
                                numbOfChecked += 1
                            }
                        }
      
                        if(this.column1[i].points.length/2 <= numbOfChecked && this.column1[i].points.length !== numbOfChecked){
                            this.column2.push(this.column1[i])
                            this.column1.splice(i, 1)
                            if(this.column2.length==5){
                              this.blockOne=true
                            }
                        }
                  }


            }

            for(let i = 0; i < this.column2.length; i++){
                  let numbOfChecked = 0
  
                  for(let j = 0; j < this.column2[i].points.length; j++){
                      if(this.column2[i].points[j].checked === true){
                          numbOfChecked += 1
                      }
                  }

                  if(this.column2[i].points.length === numbOfChecked){

                      var now = new Date() 
                      this.dat.push(String(now))
                      this.column3.push(this.column2[i])
                      this.column2.splice(i, 1)
                      this.blockOne=false
                  }
              }
      })


},

watch:{
      column1(){
            this.allColumns = [this.column1,this.column2,this.column3, this.dat, this.blockOne]
            




            const parsed = JSON.stringify(this.allColumns);
            localStorage.setItem('allColumns', parsed);


      },
      column2(){
            allColumns = [this.column1, this.column2, this.column3, this.dat, this.blockOne]

            
            const parsed = JSON.stringify(this.allColumns);
            localStorage.setItem('allColumns', parsed);

      },
      column3(){
            allColumns = [this.column1, this.column2, this.column3, this.dat, this.blockOne]

            
            const parsed = JSON.stringify(this.allColumns);
            localStorage.setItem('allColumns', parsed);


      },
}  



})

Vue.component('card',{
      template:`
      <div class=card>
      <p id="cardTitle">{{pointsAndTitle.title}}</p>
      <ul id="pointslist">
          <div v-for="point in pointsAndTitle.points"
               @click="point.checked=true"
               @click="check"
               :class="{done:point.checked}">
               
              <li v-if="!block" >{{point.point}}</li>
              <hr>
          </div>
          <li>{{dat}}</li>
      </ul>
      </div>
      `,
      data(){
            return{  
            }
      },
      props:{
            pointsAndTitle: null,
            block: false,
            dat: "",

      },
      methods: {
            check(){
                  eventBus.$emit('checkCard')
            }
      }    
      
})





let app = new Vue({
   el: '#app',
   data: {
   },
})
