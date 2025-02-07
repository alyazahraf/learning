import config from "../config/api";
import axios from "axios";

const baseUrl = config.BASE_API_URL;
const apiKey = config.API_KEY;

export async function getAllMoviesDay() {
    const response = await axios.get(`${baseUrl}/trending/movie/day`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.results;
  }
  
async function getAllMoviesWeek() {
  const response = await axios.get(`${baseUrl}/trending/movie/week`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}

export async function getTopRated() {
  const response = await axios.get(`${baseUrl}/movie/top_rated`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
}