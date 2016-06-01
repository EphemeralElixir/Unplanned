export default function reducer(state, action) {
  switch (action.type) {
    case 'ADD_USER': {
      const newUser = {};
      newUser[action.id] = { name: action.name };
      const newUsers = {};

      state.users.each((key) => { newUsers[key] = state.users[key]; });
      // for (const key in state.users) {
      //   if ({}.hasOwnProperty.call(state.users, key)) {
      //     newUsers[key] = state.users[key];
      //   }
      // }
      newUser.each((key) => { newUsers[key] = newUser[key]; });
      // for (var key in newUser) {
      //   newUsers[key] = newUser[key];
      // }

      return Object.assign({}, { users: newUsers });
    }

    case 'UPDATE_USERLIST': {
      return Object.assign({}, { users: action.newUserList });
    }

    default:
      return state;
  }
}
