export function toDecimal(number: any, total = 8, decimal = 3) {
  const num = Number(number);

  if (!Number.isNaN(num)) {
    // Chuyển số thành chuỗi với 3 chữ số thập phân
    const str = num.toFixed(decimal);

    // Kiểm tra tổng số chữ số không vượt quá 8
    if (str.replace('.', '').length > total) {
      throw new Error(`Number has more than ${total} digits in total.`);
    }

    return Number(str);
  }

  return undefined;
}
