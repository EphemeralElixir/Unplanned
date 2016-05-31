let actions = {
	addUser: function(id, name) {
		return {
			type: 'ADD_USER',
			id: id,
			name: name
		}
	},
	updateUserList: function(newUserList) {
		return {
			type: 'UPDATE_USERLIST',
			newUserList: newUserList
		}
	}
}

export default actions;