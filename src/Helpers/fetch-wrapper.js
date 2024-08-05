
import { storageHandler } from './storage';
import { http } from './http-common';
import { utils } from './utils';
export const fetchWrapper = {
  get,
  post,
  put,
  postFile,
  delete: _delete,
  postFormData,
};

function get(url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(url)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeader(url)
    },
    credentials: 'include',
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function postFile(url, formData, onUploadProgress) {
  return http
    .post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        ...authHeader(url)
      },
      credentials: 'include',
      onUploadProgress
    })
    .then(handleAxiosResponse);
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeader(url)
    },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function postFormData(url, body) {
  const requestOptions = {
    method: 'POST',  

    body: (body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}


// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(url)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions
function authHeader(url) {

  const isApiUrl = url.startsWith(import.meta.env.REACT_APP_API_URL);
 
  
}

function handleResponse(response) {
let c = (response.headers.get("content-type"))
 
    return response.text().then(text => {
   
      const data = text && JSON.parse(text);
     
      if (!response.ok) {
        let errorMessage = '';
        if (data['error']) {
          errorMessage = `Error: ${data['error']['message'] ||
            data['error']['status'] ||
            data['error']}`;
        } else if (data['errors']) {
          errorMessage = objToString(data['errors']);
        } else {
          errorMessage = (data && data.message) || response.statusText;
        }
        return Promise.reject(errorMessage);
      }
      return data;
    });
  
 
}

function objToString(obj) {
  let res = ``;
  for (var i in obj) {
    if (Array.isArray(obj[i])) {
      obj[i].forEach(item => {
        res += `<p>${item}</p>`;
      });
    }
  }
  return res;
}

function handleAxiosResponse(response) {
  if (response.status !== 200) {
    if ([401, 403].includes(response.status)) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      //accountService.logout();
    }
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
  }
  return response.data;
}
