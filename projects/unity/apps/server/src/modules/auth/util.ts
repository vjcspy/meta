export function extractToken(header: string): string | null {
  const parts = header.split(' ');
  // Kiểm tra có đúng 2 phần và phần đầu là "Bearer"
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }
  return null;
}
