const API_END_POINT = '';

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('API 호출 오류');
  } catch (e) {
    console.log(e.message);
  }
};

export default request;
