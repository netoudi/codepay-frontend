import axios from 'axios';

export const httpNext = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const httpNest = axios.create({
  baseURL: process.env.NEST_API_URL,
});

export function fetcher(url: string) {
  return httpNext.get(url).then((response) => response.data);
}
