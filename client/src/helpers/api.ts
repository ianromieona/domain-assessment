import { AxiosResponse } from 'axios';
import { h } from './index';

/**
 * Handles api response
 * @param {object} response
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */

type ResponseBody = {
  status: string;
  data: any;
};

/**
 * handle api response code and message structure
 * @param response
 * @param showMessage
 * @returns {data: {}, status: string}
 */
export async function handleApiResponse(
  response: AxiosResponse,
  showMessage = true,
) {
  const apiRes: ResponseBody = { status: '', data: [] };
  if (!response) return apiRes;

  apiRes.data = response.data.data || {};
  if (
    h.general.notEmpty(response) &&
    h.general.compareInt(response.status, 200)
  ) {
    apiRes.status = 'ok';
  } else {
    apiRes.status = 'error';
    if (showMessage) {
      h.general.alert('error', { message: response.data.message });
    }
  }
  return apiRes;
}
