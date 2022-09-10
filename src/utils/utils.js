export const setCookie = (name, value, props) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name) => {
  setCookie(name, null, { expires: -1 });
};

export const convertedDate = (date) => {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(date).toLocaleDateString("ru", options);
};

export const checkedOrderStatus = (status) =>
  status === "done"
    ? "Выполнен"
    : status === "pending"
    ? "Готовится"
    : status === "created"
    ? "Создан"
    : "Выполнен";

export const sumIngredients = (arr) => {
  let sum = 0;
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      if (item?.price) {
        sum += item.price;
      }
    });
  }
  return sum;
};

export const checkedArrayLength = (arr) =>
  arr.length - 6 > 0 ? `${arr.length - 6}` : null;
