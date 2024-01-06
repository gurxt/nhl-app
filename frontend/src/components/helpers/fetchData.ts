import axios from 'axios';

export const fetchData = async <T>(url: string): Promise<T> => {
  const res = await axios.get<T>(`/api/${url}`);
  return res.data;
};
