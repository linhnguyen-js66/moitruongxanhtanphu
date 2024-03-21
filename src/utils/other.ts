export function generateCustomerID() {
  // Tạo phần số ngẫu nhiên cho ID
  const numbers = '0123456789';
  let numericPart = '';
  for (let i = 0; i < 3; i++) {
    numericPart += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  // Kết hợp 'TP-' với phần số để tạo ID hoàn chỉnh
  return `TP-${numericPart}`;
}
