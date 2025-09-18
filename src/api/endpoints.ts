//endpoints.ts

const BASE_URL = "http://localhost:5000/api"; // Change this after hosting

export const API = {
  PROJECTS: {
    CREATE: `${BASE_URL}/projects`,
    GET_ALL: `${BASE_URL}/projects`,
    UPDATE: (id: string) => `${BASE_URL}/projects/${id}`,
    DELETE: (id: string) => `${BASE_URL}/projects/${id}`,
  },
  VIDEOS: {
    CREATE: `${BASE_URL}/videos`,
    GET_ALL: `${BASE_URL}/videos`,
    UPDATE: (id: string) => `${BASE_URL}/videos/${id}`,
    DELETE: (id: string) => `${BASE_URL}/videos/${id}`,
  },
  AUDIOS: {
    CREATE: `${BASE_URL}/audios`,
    GET_ALL: `${BASE_URL}/audios`,
    UPDATE: (id: string) => `${BASE_URL}/audios/${id}`,
    DELETE: (id: string) => `${BASE_URL}/audios/${id}`,
  }
};

export default API;
