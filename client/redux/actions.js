let actions = {
	addUser: function(id, name) {
		return {
			type: 'ADD_USER',
			id: id,
			name: name
		}
	}
}

export default actions;