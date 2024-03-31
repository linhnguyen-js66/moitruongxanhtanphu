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
export const convertImage = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: any) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);
