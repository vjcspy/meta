import moment from 'moment';

export const getLatestWorkingDay = (): string => {
  const marketToDate = moment();

  if (marketToDate.day() === 0) {
    // Nếu ngày là Chủ Nhật, chuyển sang Thứ Sáu của tuần trước
    marketToDate.day(-2); // -2 tương ứng với Thứ Sáu của tuần trước
  } else if (marketToDate.day() === 6) {
    // Nếu ngày là Thứ Bảy, chuyển sang Thứ Sáu của tuần sau
    marketToDate.day(5); // 5 tương ứng với Thứ Sáu
  }

  return marketToDate.format('YYYY-MM-DD');
};
