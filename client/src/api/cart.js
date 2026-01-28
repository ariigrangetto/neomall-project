const API = import.meta.env.VITE_API;

export async function getCart() {
  try {
    const response = await fetch(`${API}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    throw new Error("Error fething data " + error.message);
  }
}

export async function addProductToCart(id) {
  try {
    const response = await fetch(`${API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    throw new Error("Error fetching data " + error.message);
  }
}

export async function incrementProductQuantity(id) {
  try {
    const response = await fetch(`${API}/cart/increment`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    throw new Error("Error fetching data " + error.message);
  }
}

export async function decrementProductQuantity(id) {
  try {
    const response = await fetch(`${API}/cart/decrement`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    throw new Error("Error fetching data " + error.message);
  }
}

export async function deleteFromCart(id) {
  try {
    const response = await fetch(`${API}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    throw new Error("Error fetching data " + error.message);
  }
}
