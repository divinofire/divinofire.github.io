//vue instanc<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>e
// { "keys": ["ctrl+shift+s"], "command": "auto_save" }




//todo app component

// test todo component
var todo1_compoment1 = Vue.component("todo", {
	data(){
		return {
			count:0
		}
	},

	props: ["note"],

	template:` 
		<div class="todo">
			<button class="btn btn-primary" v-on:click="count++">you clicked me {{count}} time(s)</button>
			<br>
			<h3>{{note.title}}</h3>
			<p>{{note.body}}</p>
			<slot></slot>
		</div>
	`
});


var todo_component2 = Vue.component("todo-item", {
	components: {},
	data : function(){
		return {
		completeButtonMessage: this.changeButtonColor().text,
		button_complete_color: this.changeButtonColor().color,
		crossTextClass: this.crossText()
		 }
	},
	props: ["todo", "position"],

	// mounted: function(){
	// 	this.initialize();
	// },

	methods: {
	    toggle_complete(){
			 this.$props.todo.isComplete =! this.$props.todo.isComplete;
			 this.completeButtonMessage = this.changeButtonColor().text;
			 this.button_complete_color = this.changeButtonColor().color;
			 this.crossTextClass = this.crossText();
			 this.$root.saveTodos();
		},

		delete_me(){
			let todos = this.$root.$data.todos;
			let index = todos.indexOf(this.$props.todo);
			todos.splice(index, 1); //delete the todo item
			this.$root.saveTodos();
		},

		crossText(){
			return  (this.$props.todo.isComplete)? "divino-cross-text" : "";
		},

		changeButtonColor(){
			let text =  (this.$props.todo.isComplete)? "Undo Complete" : "Mark as Complete";
			let color = (this.$props.todo.isComplete)? "btn-warning" : "btn-primary";
			return {text, color};
		},



		// initialize(){
		// 	this.completeButtonMessage = this.changeButtonColor().text;
		// 	this.button_complete_color = this.changeButtonColor().color;
		// 	this.crossTextClass = this.crossText();
		// 	for (i in this.$root.$data.todos){
		// 		console.log("todo: ", i, "completet ", this.$root.$data.todos[i].isComplete);
		// 	}
		// }

	},

	template: `
		<div class="todo-item card"> 
			<div class="card-header divino-black1-bg"><span class="divino-circular"> {{position}} </span></div>
			<!-- <img :src="todo.image" class="card-image-top" alt="image unavailable"> -->
			<div class="card-body todo-root"> 

				<h4 class="card-title todo-title">
					<span :class="crossTextClass">{{todo.title}}</span>
					<div class="todo-slot">
								<slot v-if="!todo.title.length" style="size:5px;"> Untitled </slot>
					</div>
				</h4>
				<p class="card-text todo-body">
					<span :class="crossTextClass">{{todo.body}}</span>
					<div class="todo-slot">
							<slot v-if="!todo.body.length" style="size:5px;"> No message in todo body </slot>
					</div>
				</p>
				<div class="divino-align">
						<button class="btn btn-primary divino-align-left" :class="button_complete_color" @click="toggle_complete">{{completeButtonMessage}}</button>
						<button class="btn btn-danger divino-align-right" @click="delete_me">Delete</button>
				</div>
			</div>
		 </div>
		 	`

});


var newtodoComponent = Vue.component("component-name", {

	data: function(){
		return{

		}
	},

	props: [
	
	],

	methods: {

	},

	template: `
		<div class="">

		</div>
	`




});

var add_todo_component = Vue.component("todo-input", {

	data: function(){
		return{

		}
	},

	props: [

		
	],

	methods: {


		addTodo(){
			let todo_title = document.getElementById("todo_title_").value;
			let todo_body = document.getElementById("todo_body_").value;

			if(todo_title || todo_body){
				let todos = this.$root.$data.todos;
				let id = this.$root.generateID();
				//this.$root.shiftTodoIDs(1);
				todos.unshift({id: id, title: todo_title, body: todo_body, image:"default.img", show:true, isComplete:false});
				this.$root.saveTodos( );
			}

		},

		changeInputFocus(inputElement){
			if (inputElement == "title"){ document.getElementById("todo_title_").focus();}
			else if (inputElement == "body") {document.getElementById("todo_body_").focus();}
		},

		searchTodo(){

		}

	},

	template: `
		<div class="todo-input">

			<!-- input todo title -->
			<div class="input-group mb-3">
				<span class="input-group-text">Todo Title </span>
				<input type="text" value="" class="form-control divino-black-bg" id="todo_title_" placeholder="new task title" aria-label="input todo title" @keyup.down="changeInputFocus('body')" autofocus>
				<button type="button" class="btn btn-success">Search</button>
			</div>

			<!-- input todo body -->
			<div class="input-group mb-3">
				<span class="input-group-text" id="label-input-todo">Todo Body</span>
				<textarea type="text" value="" class="form-control divino-black-bg" id="todo_body_" placeholder="new task tody" aria-label="input todo title" @keyup.up="changeInputFocus('title')" @keyup.enter="addTodo"></textarea>
				<button type="button" class="btn btn-primary" @click="addTodo">Add</button>
				<button type="button" class="btn btn-success">Search</button>
			</div>

		</div>
	`




});

app2 = new Vue({
	el: "#todo-components",
	data: {
		notes: [
			{id: 1, title: "chemistry", body: "water is a mixture of 1 hydrogen and 2 oxygen molecules"},
			{id: 2, title: "API", body: "it's good to take things from APIs if there are readily available"},
			{id: 3, title: "money", body: "trust even God to provide your financial needs"}
		],
		todos: [
			{id: 1, title: "my report", body: "", image:"100.img", show:true, isComplete:false},
			{id: 2, title: "API", body: "learn about thingsmake, bible and weather API", image:"101.img", show:true, isComplete:false},
			{id: 3, title: "", body: "learn advance ways of making passive income", image:"102.img", show:true, isComplete:false},
			{id: 4, title: "arises", body:"get up at 3 am", image:"104.img", show:true, isComplete:false},
			{id: 5, title: "learn theology", body:"the first shall be the last", image:"105.img", show:true, isComplete:false},
			{id: 6, title: "read the bible", body:"the history of the church and acts of the apostles", image:"106.img", show:true, isComplete:false},
			{id: 7, title: "write a book", body:"modern attack on christians", image:"107.img", show:true, isComplete:false},
			{id: 8, title: "take out the trash tomorrow", body:"take out the trash and clean the house before 8 am", image:"108.img", show:true, isComplete:false}
		],
		default_title: "Untitled",
		default_body: "No message in todo body"

		
	},

	created: function(){
		this.initialize();
	},

	methods: {

		*generateID__(){
			let IDs = [];
			for (todo of this.todos){
				IDs.push(todo.id);
			}

			while(IDs.length != 9999){
				let i = Math.round(Math.random() * 1000);
				if (IDs.includes(i)) continue;
				IDs.push(i);
				console.log("IDs: ", IDs);
				yield i;
				
			}
		},

		generateID(){
			let gen = this.generateID__().next();
			if (gen.done == true) {alert("Danger: maximum todos limit has reached"); return -1;}
			else return gen.value;
		},

		saveTodos(){

			let todosJson = JSON.stringify(this.todos);
			//console.log(todosJson);
			localStorage.setItem("__todos_address__DIVIN", todosJson);

		},

		loadTodos(){
			
			let todosJson = localStorage.getItem("__todos_address__DIVIN");
			let todos = JSON.parse(todosJson);
			this.todos = todos;
			//this.serializeTodoIDs();
			return true;
			
		},

		initialize(){
			if (localStorage.__todos_address__DIVIN) {this.loadTodos(); console.log("saved data loaded")}
			else {
			  //this.serializeTodoIDs();
			  console.log("default data loaded");
			}
		}

	}

});
