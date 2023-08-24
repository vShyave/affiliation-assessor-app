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
  if (!name) return;
  const names = name?.split(" ");
  const firstInitial = names[0].charAt(0).toUpperCase();
  let lastInitial = "";
  if (names.length > 1) {
    lastInitial = names[1].charAt(0).toUpperCase();
  }
  return firstInitial + lastInitial;
};

export const readableDate = (dateStr) => {
  const date = new Date(dateStr);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()
  );
};

export const generate_uuidv4 = () => {
  var dt = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var rnd = Math.random() * 16; //random number in range 0 to 16
    rnd = (dt + rnd) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? rnd : (rnd & 0x3) | 0x8).toString(16);
  });
};
