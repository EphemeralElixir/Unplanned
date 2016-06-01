const actions = {
  addUser(id, name) {
    return {
      type: 'ADD_USER',
      id,
      name,
    };
  },
  updateUserList(newUserList) {
    return {
      type: 'UPDATE_USERLIST',
      newUserList,
    };
  },
};

export default actions;
