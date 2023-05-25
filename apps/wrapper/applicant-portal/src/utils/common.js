import Cookies from "js-cookie";

export const setCookie = (cname, cvalue) => {
  try {
    Cookies.set(cname, JSON.stringify(cvalue));
  } catch (error) {
    return false;
  }
};

export const getCookie = (cname) => {
  try {
    let cookie = Cookies.get(cname);
    if (cookie) return JSON.parse(cookie);
  } catch (error) {
    return false;
  }
};

export const removeCookie = (cname) => {
  try {
    Cookies.remove(cname);
    return true;
  } catch (error) {
    return false;
  }
};

export const getInitials = (name) => {
  const names = name.split(" ");

  const firstInitial = names[0].charAt(0).toUpperCase();
  let lastInitial = "";
  if (names.length > 1) {
    lastInitial = names[1].charAt(0).toUpperCase();
  }
  return firstInitial + lastInitial;
};
