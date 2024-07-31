export const EmailRegexp = new RegExp(
  /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+)/
);
export const LoginRegexp = new RegExp(/^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/);
export const NameRegexp = new RegExp(/^([А-ЯЁA-Z][а-яёa-z-]*)$/);
export const PasswordRegexp = new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/);
export const PhoneRegexp = new RegExp(/^\+?\d{10,15}$/);
export const MessageRegexp = new RegExp(/^[^\W_]+$/);
