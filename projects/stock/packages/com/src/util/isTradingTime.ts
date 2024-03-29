import moment from 'moment-timezone';

export const isTradingTime = () => {
  const currentTime = moment().tz('Asia/Ho_Chi_Minh');
  // Kiểm tra xem ngày giờ hiện tại có nằm trong khoảng từ thứ 2 đến thứ 6 không
  const isWeekday =
    currentTime.isoWeekday() >= 1 && currentTime.isoWeekday() <= 5;

  // Kiểm tra xem giờ hiện tại có nằm trong khoảng từ 9h đến 14h45 không
  const start = moment.tz({ hour: 9, minute: 0 }, 'Asia/Ho_Chi_Minh');
  const end = moment.tz({ hour: 14, minute: 45 }, 'Asia/Ho_Chi_Minh');
  const isTimeInRange = currentTime.isBetween(start, end);

  return isWeekday && isTimeInRange;
};
