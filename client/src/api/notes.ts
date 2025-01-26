import { NoteBody } from '../config/types';
import { h } from '../helpers';
import Axios from 'axios';

const api_url = 'http://localhost:4000/api';

/**
 * Note get all api request
 * @param data
 * @param showMessage
 * @returns {data: [], status: string}
 */

export async function getAll(params: object, showMessage: boolean = false) {
  const response = await Axios({
    url: `${api_url}/notes`,
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    params,
  });
  return h.api.handleApiResponse(response, showMessage);
}

/**
 * Note create api request
 * @param data
 * @param showMessage
 * @returns {data: {}, status: string}
 */
export async function create(data: {} = {}, showMessage: boolean = false) {
  const response = await Axios({
    url: `${api_url}/notes/`,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  });
  return h.api.handleApiResponse(response, showMessage);
}

/**
 * Note update api request
 * @param id
 * @param data
 * @param showMessage
 * @returns {data: {}, status: string}
 */
export async function update(
  id: string,
  data: Partial<NoteBody>,
  showMessage: boolean = false,
) {
  const response = await Axios({
    url: `${api_url}/notes/${id}`,
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  });
  return h.api.handleApiResponse(response, showMessage);
}

/**
 * Note remove api request
 * @param id
 * @param showMessage
 * @returns {data: {}, status: string}
 */
export async function remove(id: string, showMessage: boolean = false) {
  const response = await Axios({
    url: `${api_url}/notes/${id}`,
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return h.api.handleApiResponse(response, showMessage);
}
