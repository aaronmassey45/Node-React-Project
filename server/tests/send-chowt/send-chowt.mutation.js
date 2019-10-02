const sendChowtMutation = `
	mutation Chowt($location: Location, $text: String!) {
		chowt(text: $text, location: $location) {
			id
			text
			location {
				lat
				lng
			}
			_creator {
				id
			}
		}
	}
`;

module.exports = sendChowtMutation;
