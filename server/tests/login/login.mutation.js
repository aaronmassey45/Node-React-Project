const login = `mutation Login($username: String, $password: String) {
	login(username: $username, password: $password)
}`;

module.exports = login;
