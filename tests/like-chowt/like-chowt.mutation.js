const likeChowtMutation = `
	mutation LikeChowt($id: ID!) {
		likeChowt(id: $id) {
			id
		}
	}
`;

module.exports = likeChowtMutation;
