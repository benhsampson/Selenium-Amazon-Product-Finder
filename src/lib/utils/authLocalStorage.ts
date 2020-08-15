import moment from 'moment';

declare global {
  interface Window {}
}

export function setTokenLocalStorage(responseObj: {
  token: string;
  expiresIn: string;
}) {
  const expiresAt = moment().add(responseObj.expiresIn);
  localStorage.setItem('id_token', responseObj.token);
  localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
}

export function getTokenLocalStorage(window: Window) {
  const token = window.localStorage.getItem('id_token');
  const expiresAt = window.localStorage.getItem('expires_at');
  return {token, expiresAt};
}
