import React from 'react';
import axios from "axios";
import {Container, ListGroup,ListGroupItem,Button} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import './List.css';
export default class ShoppingList extends React.Component{
	state={
		items:[
		{id:Number},
		]
	}
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 0);
      this.setState({ intervalIsSet: interval });
    }
  }	

    componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch("/get"||"http://localhost:5000/get")
      .then(data => data.json())
      .then(res => this.setState({ items: res.data }));
  };

  postDataToDb =(name)=>{
  	      let currentIds=this.state.items.map(items=>items.id);
      let idToBeAdded=0;
      while(currentIds.includes(idToBeAdded)){
        ++idToBeAdded;
      }
  	axios.post("/"||"http://localhost:5000/",{
  		id:idToBeAdded,
  		name:name
  	});
  };

  deleteData=(id)=>{
  	axios.delete("/"||"http://localhost:5000/",{
  		      data: {
        id: id
      }
  	})
  }
  
	render(){
		const { items,id } = this.state;
		if(items)//to check if DB ==null
		return(
			<Container>
				<Button
				color="dark"
				style={{marginBottom:'2rem'}}
				onClick={() => {
					const name = prompt('Enter Item');
					if(name){
						this.postDataToDb(name);
					}
				}}
				>
				Add Item
				</Button>
				<ListGroup className="list">
					<TransitionGroup className="shopping-list">
					{items.map(({id,name})=>(
						<CSSTransition key={id} timeout={80} classNames="fade">
					<ListGroupItem className="subList">
					<Button
					className="remove-btn"
					color="danger"
					size="sm"
					onClick={()=>this.deleteData(id)}
					>
					&times;
					</Button>
					{name}
					</ListGroupItem>
					</CSSTransition>
					))} 
					</TransitionGroup>
				</ListGroup>
			</Container>
			);
	}
}