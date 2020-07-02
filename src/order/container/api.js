import { API } from "../../config";
import wooCommerceApi from "../../wooApi";
const wooApi = wooCommerceApi();
export const createApi = async (userId, token, data) => {
  try {
    const response = await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateApi = async (userId, token, id, value) => {
  try {
    const response = await fetch(`${API}/order/${id}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(value),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateStatusApi = async (userId, token, id, status) => {
  try {
    const response = await fetch(`${API}/order/status/${id}/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const removeApi = async (userId, token, ids) => {
  try {
    const response = await fetch(`${API}/products/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateWooStatusApi = async (id, status) => {
  const url = "orders/" + id;
  console.log({ url, status });
  try {
    const response = await wooApi.put(url, { status });
    return response;
  } catch (err) {
    console.log(err);
  }

  // return new Promise((resolve, reject) => {
  //   console.log({ url, wooApi });
  //   wooApi
  //     .put(url, { status })
  //     .then((response) => {
  //       if (response !== undefined) {
  //         resolve(response.data);
  //       } else reject("contenu vide");
  //     })
  //     .catch((error) => {
  //       error.response && reject(error.response.data);
  //       !error.response && reject({ data: { message: " connexion failed" } });
  //     });
  // });
};
