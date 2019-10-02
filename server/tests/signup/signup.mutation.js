const signup = `mutation Signup(
	$username: String!
	$email: String!
	$password: String!
	$isAFoodTruck: Boolean!
) {
	signup(
		username: $username
		email: $email
		password: $password
		isAFoodTruck: $isAFoodTruck
	)
}`;

module.exports = signup;
