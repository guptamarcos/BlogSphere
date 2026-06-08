const BASE_URL = "http://localhost:4000/api";

export const fetchApi = async function (apiEndPoint, options = {}) {
  // console.log(apiEndPoint, options);
  try {
    const res = await fetch(`${BASE_URL}${apiEndPoint}`, {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  
    const data = await res?.json();
    // console.log("Fetch api", data);

    if (!res.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data;
  } catch (err) {
    console.log("API Error: ", err);
    throw err;
  }
};
