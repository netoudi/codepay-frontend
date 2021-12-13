import axios from 'axios';

export const httpNext = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const httpNest = axios.create({
  baseURL: process.env.NEST_API_URL,
});

export function fetcher(url: string) {
  return httpNext
    .get(url, {
      headers: {
        'x-token': 'r78u1lj3g7n',
      },
    })
    .then((response) => response.data);
}
