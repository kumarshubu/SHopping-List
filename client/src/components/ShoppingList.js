import React from 'react';
import axios from "axios";
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import './List.css';
export default class ShoppingList extends React.Component {
	state = {
		items: [
		],
		currentItem: "",
		disabled: false,
		// intervalIsSet: null
	}

	componentDidMount() {
		this.getDataFromDb();
		// if (!this.state.intervalIsSet) {
		// 	let interval = setInterval(this.getDataFromDb, 1000);
		// 	this.setState({ intervalIsSet: interval });
		// }
	}

	componentWillUnmount() {
		// if (this.state.intervalIsSet) {
		// 	clearInterval(this.state.intervalIsSet);
		// 	this.setState({ intervalIsSet: null });
		// }
	}

	getDataFromDb = () => {
		fetch("/get" || "http://localhost:5000/get")
			.then(data => data.json())
			.then(res => { this.setState({ items: res.data }) },
				this.setState({ disabled: false }));
	};

	postDataToDb = (name) => {
		let currentIds = this.state.items.map(items => items.id);
		let idToBeAdded = 0;
		while (currentIds.includes(idToBeAdded)) {
			++idToBeAdded;
		}
		axios.post("/" || "http://localhost:5000/", {
			id: idToBeAdded,
			name: name
		})
			.then(() => {
				this.getDataFromDb()
			})
			.catch(err => console.log(err))
	};

	deleteData = (id) => {
		axios.delete("/" || "http://localhost:5000/", {
			data: {
				id: id
			}
		})
			.then(() => { this.getDataFromDb() })
			.catch(err => console.log(err))
	}

	handleSubmit = (e) => {
		e.preventDefault()

		if(document.getElementById("input").value==""){
			return;
		}
		this.postDataToDb(this.state.currentItem)
		document.getElementById("input").value = ""
		this.setState({ disabled: true })
		this.setState({ currentItem:""})
	}

	render() {
		const { items } = this.state;
		//to check if DB ==null		
		if (items)
			return (
				<Container>
					<div style={{ margin: "10px 0px 10px 0px" }}>
						<form>
							<InputGroup>
								<Input id="input" placeholder="type your items here..." autoFocus onChange={(e) => { this.setState({ currentItem: e.target.value }) }} />
								<InputGroupAddon addonType="append">
									<Button
										disabled={this.state.disabled}
										type="submit"
										color="dark"
										style={{ marginBottom: '2rem' }}
										onClick={this.handleSubmit}
									>
										Add Item
					</Button>
								</InputGroupAddon>
							</InputGroup>

						</form>
					</div>
					<ListGroup className="list">
						<TransitionGroup className="shopping-list">
							{items.map(({ id, name }) => (
								<CSSTransition key={id} timeout={0} classNames="fade">
									<ListGroupItem className="subList">
										<Button
											className="remove-btn"
											color="danger"
											size="sm"
											onClick={() => this.deleteData(id)}
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