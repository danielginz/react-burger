import { setCookie } from "./setCookie";

export function deleteCookie(name: string) {
    setCookie(name, null, { expires: -1 });
}