export default [
  {
    label: 'Username*',
    name: 'username',
    type: 'text',
    required: true,
  },
  {
    label: 'Email*',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    label: 'Location*',
    name: 'location',
    type: 'text',
    required: true,
  },
  {
    label: 'URL for Profile Pic*',
    name: 'profileImg',
    type: 'text',
    required: true,
  },
  {
    label: 'Is account a food truck?*',
    name: 'isAFoodTruck',
    type: 'checkbox',
    required: true,
  },
  {
    label: 'Bio*',
    name: 'bio',
    type: 'textarea',
    required: true,
  },
  {
    label: 'New Password',
    name: 'newPassword',
    type: 'password',
  },
  {
    label: 'Current Password*',
    name: 'currentPassword',
    type: 'password',
    required: true,
  },
];
