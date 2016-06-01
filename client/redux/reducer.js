export default function reducer(state, action) {
  switch (action.type) {

    case 'UPDATE_USERLIST': {
      return Object.assign({}, {
        users: action.newUserList,
        meet: state.meet,
        gmap: state.gmap,
      });
    }

    case 'UPDATE_OPENED_USER_ID': {
      return Object.assign({}, {
        users: state.users,
        meet: state.meet,
        gmap: {
          openedUserId: action.socketId,
        },
      });
    }

    case 'CLEAR_MEET': {
      return Object.assign({}, {
        users: state.users,
        meet: {
          recipientId: undefined,
          requesterId: undefined,
          acceptedId: undefined,
        },
        gmap: state.gmap,
      });
    }

    case 'SET_RECIPIENT': {
      return Object.assign({}, {
        users: state.users,
        meet: {
          recipientId: action.recipientId,
          requesterId: state.meet.requesterId,
          acceptedId: state.meet.acceptedId,
        },
        gmap: state.gmap,
      });
    }

    case 'SET_REQUESTER': {
      return Object.assign({}, {
        users: state.users,
        meet: {
          recipientId: state.meet.requesterId,
          requesterId: action.requesterId,
          acceptedId: state.meet.acceptedId,
        },
        gmap: state.gmap,
      });
    }

    case 'SET_ACCEPTED': {
      return Object.assign({}, {
        users: state.users,
        meet: {
          recipientId: state.meet.recipientId,
          requesterId: state.meet.requesterId,
          acceptedId: action.acceptedId,
        },
        gmap: state.gmap,
      });
    }

    default:
      return state;
  }
}
