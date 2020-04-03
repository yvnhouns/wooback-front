import { API } from "../config";

export const signup = async user => {
  try {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const signin = async user => {
  try {
    const response = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const authenticate = async (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = async next => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();
    try {
      const response = await fetch(`${API}/signout`, {
        method: "GET"
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window === undefined) return false;
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  }
  return false;
};

export const authenticated =
  typeof window === undefined
    ? false
    : localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt"))
    : false;
