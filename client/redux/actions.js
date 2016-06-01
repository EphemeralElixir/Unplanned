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
  updateOpenedUserId(socketId) {
    return {
      type: 'UPDATE_OPENED_USER',
      socketId,
    };
  },
};

export default actions;
