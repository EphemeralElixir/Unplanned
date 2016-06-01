export default function reducer(state, action) {
  switch (action.type) {

    case 'UPDATE_USERLIST': {
      return Object.assign({}, { users: action.newUserList,
        meet: {
          recipientID: state.meet.recipientID, requestorID: state.meet.requestorID,
          acceptedID: state.meet.requestorID,
        },
        map: { openedUser: state.map.openedUser },
      });
    }

    default:
      return state;
  }
}
