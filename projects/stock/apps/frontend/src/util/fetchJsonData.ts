import { showMessage } from '@src/util/showMessage';

export const fetchJsonData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Trả về dữ liệu từ API
    return { data };
  } catch (error) {
    showMessage(`Error: ${url}`, 'error');
    throw error;
  }
};
