Vue.component('task',{
        template:`
<div class="task">
    <input type="checkbox" id="checkbox" v-model="checked">
    <label :class="{ taskcomplete: checked }" for="checkbox">{{name}} {{title}}</label>
</div>


`,
data() {
       return {
       checked:false
       }
   },
computed: {
       title() {
           return this.checked;
       }
},
props: {
    name: String,
    completed:Boolean,
},

watch: {
    title(newValue, oldValue) {
      this.$emit('updateParent', {
        name: this.name,
        completed: this.checked
      })
    }
}



})



Vue.component('card', {
   template: `
<div class="card">

<ul>
               <li  v-for="t in tasks" >
               {{t}}
               <task @updateParent="onUpdateSalary" :name="t.name" :completed="t.completed">{{}}</task>
               </li>
</ul>
        </div>

 `,
props: {
          count: Number,
   },
data() {
       return {
       tasks:[
       {name:"task",completed:false},{name:"task1",completed:false},{name:"task2",completed:false}
       ]
       }
   },
methods: {
    onUpdateSalary(data) {
var dat = data.name
console.log(dat)
var myIndex = this.tasks.indexOf(dat);
console.log(myIndex);
if (myIndex !== -1) {

    this.tasks.splice(myIndex, 1);
}
console.log(this.tasks)
      this.tasks.push(data)
    }
   },
computed: {
       title() {
       }
}
})


let app = new Vue({
   el: '#app',
   data: {
       premium: true,
       cart: []
   },
})
