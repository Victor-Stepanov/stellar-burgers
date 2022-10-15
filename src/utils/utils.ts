import { TIngrediens } from "../services/types/data";

export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}\]\\^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (
  name: string,
  value: string,
  props: { [key: string]: any } & { expires?: number | Date | string } = {}
) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
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

export const deleteCookie = (name: string) => {
  setCookie(name, "", { expires: -1 });
};

export const convertedDate = (date: string) => {
  return new Date(date).toLocaleString();
};

export const checkedOrderStatus = (status: string) =>
  status === "done" ? "Выполнен" : status === "pending" ? "Готовится" : "";

export const sumIngredients = (arr: Array<TIngrediens>) => {
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

export const checkedArrayLength = (arr: Array<TIngrediens>) =>
  arr.length - 6 > 0 ? `${arr.length - 6}` : null;

export const countIngredients = (arr: Array<TIngrediens>, value: string) => {
  let result: any = {}; //Не могу победить в этой игре
  let name: string = "";
  arr.forEach((item) => {
    name = item.name;
    if (name in result) {
      result[name]++;
    } else {
      result[name] = 1;
    }
  });
  return value in result ? result[value] : null;
};
