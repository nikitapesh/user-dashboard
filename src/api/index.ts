import axios from "axios";

export async function getPeople(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getFilteredPeople(value: string) {
  try {
    if (value !== "") {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${value}`
      );
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
