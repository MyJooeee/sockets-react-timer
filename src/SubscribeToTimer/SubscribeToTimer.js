// Scoket io client : https://github.com/socketio/socket.io-client

import React from 'react'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export default class SubscribeToTimer extends React.Component {

	// Constructor ----------------------------------------------------------------
	constructor(props) {
		super(props)

		this.state = {
			timestamp: 'no timestamp yet'
		}
	}

	componentDidMount() {
		this.subscribeToTimer((timestamp) => this.setState({
			timestamp: timestamp
		}));
	}

	componentWillUnmount() {

	}

	// On passe la référence de la méthode (fonction de callback)
	// à SubscribeToTimer dans le componentDidMount et on lui
	// renvoie le résultat retourné par le serveur node.js (socket.io)
	// pour le mettre dans le state
	subscribeToTimer(callback) {
		// timestamp : la valeur arrive depuis le server
		socket.emit('subscribeToTimer', 1000);
		socket.on('timer', timestamp => callback(timestamp));
	}


	// Renderers ----------------------------------------------------------------
	render() {
		return (
			<p> This is the timer value: {this.state.timestamp} </p>
		)
	}
}
