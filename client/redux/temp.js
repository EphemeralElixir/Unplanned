var state = {users: {45: {name: 'leo'}}};


console.log(state);

var newUser = {55: {name: 'sepher'}};


var newUsers = {};

for (var key in state.users) {
	newUsers[key] = state.users[key];
}
for (var key in newUser) {
	newUsers[key] = newUser[key];
}

console.log(newUsers);

var nextState = Object.assign({}, {users: newUsers});

console.log(nextState);

var a = {id: 5}
var key = a.id;
var obj = {key: 'hi'}

console.log(obj)