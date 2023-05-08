import {ICookieProps} from "../services/types";
export const formatDateTime = (time: string | number | Date) => {
  const dateTime = new Date(time);
  const today = new Date(Date.now()).getDate();
  const daysFromToday = today - dateTime.getDate();

  const getPluralDayForm = (n: number) => (
      (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ?
          'дня' : 'дней'
  );

  const day = (
      daysFromToday === 0 ?
          'Сегодня' :
          daysFromToday === 1 ?
              'Вчера' :
              `${daysFromToday} ${getPluralDayForm(daysFromToday)} назад`
  );
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const mins = dateTime.getMinutes().toString().padStart(2, '0');
  const timeZone = new Intl.NumberFormat("ru-RU", {
    signDisplay: "exceptZero"
  }).format(
      0 - dateTime.getTimezoneOffset() / 60
  );

  return (`${day}, ${hours}:${mins} i-GMT${timeZone}`);
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
    name: string,
    value: string | number | boolean ,
    //props: { [name: string]: string | number | boolean | Date | undefined; expires?: Date | number | string/*any*/; path?: string; }
    props: ICookieProps = {}
) {
  props = props || {};
  let exp = props.expires;

  if (typeof props.expires == 'number' && props.expires) {
    const d = new Date();
    d.setTime(d.getTime() + props.expires * 1000);
    props.expires = d;
  }
  if (props.expires instanceof Date && props.expires) {
    props.expires = props.expires.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name,'', { expires: -1 });
}
