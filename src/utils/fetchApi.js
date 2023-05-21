import axios from "axios";

const BASE_URL = 'https://bayut.p.rapidapi.com';

const fetchApi = async (url) => {
  const {data} = await axios.get((url), {
    headers: {
      'X-RapidAPI-Key': '074d2f3ae3mshbd5c04c0b4aa281p189a38jsn0051b16565cd',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  });

  return data;
}

export {BASE_URL, fetchApi};