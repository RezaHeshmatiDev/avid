import cookie from "js-cookie";
const cookie_key = "username";

const getToken = () => {
  return cookie.get(cookie_key);
};

export { getToken };
