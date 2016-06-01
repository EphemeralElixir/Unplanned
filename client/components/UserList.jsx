import React from 'react';

const UserList = (props) => (
  <div>
    <ul>
      {Object.keys(props.userList).map((key) => (
        <li key={key}>{props.userList[key].name}</li>
        )
      )}
    </ul>
  </div>
);

UserList.propTypes = {
  userList: React.PropTypes.object,
};

export default UserList;
