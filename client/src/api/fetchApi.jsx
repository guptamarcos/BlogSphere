const BASE_URL = "http://localhost:4000/api";

export const fetchApi = async (apiEndPoint, options = {}) => {
  try {
    let res = await fetch(`${BASE_URL}${apiEndPoint}`, {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    // console.log(res);
    
    // Access token expired
    if (res?.status === 401) {
      console.log("Access token expired. Refreshing...");

      const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      // Refresh token invalid/expired
      if (!refreshRes.ok) {
        throw new Error("Session expired. Please login again.");
      }

      // Retry original request
      res = await fetch(`${BASE_URL}${apiEndPoint}`, {
        credentials: "include",
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data;
  } catch (err) {
    
    console.error("API Error:", err);

    throw err;
  }
};
