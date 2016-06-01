export default function reducer(state, action) {
  switch (action.type) {

    case 'UPDATE_USERLIST': {
      return Object.assign({}, {
        users: action.newUserList,
        meet: {
          recipientId: state.meet.recipientID,
          requestorId: state.meet.requestorID,
          acceptedId: state.meet.requestorID,
        },
        gmap: { openedUserId: state.gmap.openedUserId },
      });
    }

    case 'UPDATE_OPENED_USER': {
      return Object.assign({}, {
        users: state.users,
        meet: state.meet,
        gmap: {
          openedUserId: action.socketId,
        },
      });
    }

    default:
      return state;
  }
}
