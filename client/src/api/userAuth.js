const API = import.meta.env.VITE_API;

export async function registerRequest(user) {
  try {
    const response = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    return { status: response.status, data };
  } catch (error) {
    throw new Error("Error fetching data " + error.message);
  }
}

export async function loginRequest(user) {
  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    throw new Error("Error fetching data " + error.message);
  }
}

export async function logoutRequest() {
  try {
    const response = await fetch(`${API}/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) return null;
    return response;
  } catch (error) {
    throw new Error("Error fetching data " + error.message);
  }
}

export async function verifyTokenRequest(token) {
  try {
    const response = await fetch(`${API}/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data " + error.message);
  }
}
