import { toast, ToastPosition } from 'react-toastify';
/**
 * inverse of isEmpty function
 * @param value
 * @returns {boolean}
 */
export function notEmpty(value: any) {
  return !isEmpty(value);
}

/**
 * check variable for empty value
 * @param value
 * @returns {boolean}
 */
export function isEmpty(value: any) {
  if (value === undefined) return true;

  if (
    typeof value === 'function' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    Object.prototype.toString.call(value) === '[object Date]'
  )
    return false;

  if (value === null || value === '' || value.length === 0)
    // null or 0 length array
    return true;

  if (typeof value === 'object') {
    // empty object

    let r = true;

    if (Object.keys(value).length > 0) {
      r = false;
    }

    return r;
  }

  return false;
}

/**
 * Toast message
 * @param {*} type
 * @param {*} param1
 */
export function alert(
  type: 'success' | 'error' | 'info' | 'warn' | 'dark' | 'default',
  {
    message = '',
    position = 'top-center',
  }: { message: string; position?: ToastPosition },
) {
  if (type === 'default') {
    toast(message, { position });
  } else {
    toast[type](message, { position });
  }
}

/**
 * alias of compareString function
 * @param str1
 * @param str2
 */
export function cmpStr(str1: string, str2: string) {
  return compareString(str1, str2);
}

/**
 * alias of compareBoolean function
 * @param value1
 * @param value2
 */
export function cmpBool(value1: boolean, value2: boolean) {
  return compareBoolean(value1, value2);
}

/**
 * alias of compareString function
 * @param value1
 * @param value2
 */
export function cmpInt(value1: number, value2: number) {
  return compareInt(value1, value2);
}

/**
 * compare two booleans and returns true if match else false
 * @param value1
 * @param value2
 * @returns {boolean}
 */
export function compareBoolean(value1: boolean, value2: boolean) {
  if (
    typeof value1 !== typeof undefined &&
    typeof value1 !== typeof undefined
  ) {
    if (Boolean(value1) === Boolean(value2)) {
      return true;
    }
  }
  return false;
}

/**
 * compare two integers and returns true if match else false
 * @param value1
 * @param value2
 * @returns {boolean}
 */
export function compareInt(value1: number, value2: number) {
  if (
    typeof value1 !== typeof undefined &&
    typeof value2 !== typeof undefined
  ) {
    if (value1 === value2) {
      return true;
    }
  }
  return false;
}

/**
 * compare two values and returns true if match else false
 * @param str1
 * @param str2
 */
export function compareString(str1: string, str2: string) {
  if (typeof str1 !== typeof undefined && typeof str2 !== typeof undefined) {
    if (String(str1).toLowerCase() === String(str2).toLowerCase()) {
      return true;
    }
  }
  return false;
}
