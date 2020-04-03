import { API } from "../../config";

const readPostUrl = id => {
  return `${API}/post/${id}`;
};

export { readPostUrl };
