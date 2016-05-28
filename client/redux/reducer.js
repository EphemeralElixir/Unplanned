export default function reducer(state, action) {
	switch (action.type) {
		case 'ADD_USER': {
			var newUser = {};
			newUser[action.id] = {name: action.name};
			var newUsers = {};

			for (var key in state.users) {
				newUsers[key] = state.users[key];
			}
			for (var key in newUser) {
				newUsers[key] = newUser[key];
			}

			return Object.assign({}, {users: newUsers});
		}

		default:
		  return state;
	}
}