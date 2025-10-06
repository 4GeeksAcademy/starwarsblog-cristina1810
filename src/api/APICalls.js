const baseURL = "https://www.swapi.tech/api";

export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${baseURL}/${endpoint}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDetails = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status} | URL: ${url}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
