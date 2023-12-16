import moment from 'moment';

export const getLatestWorkingDay = (): string => {
  const marketToDate = moment();

  if (marketToDate.day() === 0 || marketToDate.day() === 6) {
    // Nếu ngày là cuối tuần, chuyển sang ngày thứ 6
    marketToDate.day(5); // 5 tương ứng với thứ 6
  }
  return marketToDate.format('YYYY-MM-DD');
};
