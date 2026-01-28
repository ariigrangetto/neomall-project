const API = import.meta.env.VITE_API;

export async function getProduts() {
  try {
    const response = await fetch(`${API}/products`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return { status: response.status, products: data };
  } catch (error) {
    throw new Error("Error fetching data");
  }
}

export async function getProductsFiltered(baseUrl) {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    throw new Error("Error fetching data");
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${API}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);

    return { status: response.status, data };
  } catch (error) {
    throw new Error("Error fetching data");
  }
}
