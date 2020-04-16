import { API } from "../../config";
export const createCategoryApi = async (userId, token, category) => {
  try {
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({ "regular_price": "800" });

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
};

export const test = () => {
  fetch(
    "http://oph.f19.myftpupload.com/wp-json/wc/v3/products?per_page=10&page=1&oauth_consumer_key=ck_a0b788e42b32f777fa86859fa9fbe95dd0bac179&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1586993483&oauth_nonce=lz95WFbOqcm&oauth_version=1.0&oauth_signature=XUE8U7AINQr3fnm2vlrPzoiJIjI=",
    { ...requestOptions }
  )
    .then((response) => console.log(response.text()))
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
