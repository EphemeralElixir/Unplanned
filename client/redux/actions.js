export default actions = {
	addUser(id, name) {
		return {
			type: 'ADD_USER',
			id: id,
			name: name
		}
	}
}