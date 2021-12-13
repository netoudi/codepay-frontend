import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function fetcher(url: string) {
  return http
    .get(url, {
      headers: {
        'x-token': 'r78u1lj3g7n',
      },
    })
    .then((response) => response.data);
}
