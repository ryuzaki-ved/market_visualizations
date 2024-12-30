export const safeJSONParse = (data: any) => {
  try {
    return typeof data === 'string' ? JSON.parse(data) : data;
  } catch (error) {
    console.error('JSON parse error:', error);
    return [];
  }
};