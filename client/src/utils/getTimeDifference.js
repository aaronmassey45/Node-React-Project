import moment from 'moment';

export default time => {
  const now = moment(new Date().getTime());
  const createdAt = moment(time);

  return now.diff(createdAt, 'days') >= 30
    ? moment(time).format('MMM DD, YYYY')
    : moment(time).fromNow();
};
