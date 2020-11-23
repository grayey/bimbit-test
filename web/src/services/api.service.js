import axios from 'axios';
import { APP_ENVIRONMENT } from '../environment/environment';

const BASE_URL = APP_ENVIRONMENT.api_base_url;


/**
 * 
 * @param {*} url 
 * @param {*} id 
 * This method optionally accepts an id to retrieve a single entity, otherwisde retrieves all.
 */
export const get = async (url, id = null) => {
    let path = `${BASE_URL}/${url}`;
    path = (!id) ? path : `${path}/${id}`;
    return await axios.get(path).then(
        (response) => {
            return response.data;
        }
    ).then(
        (jsonData) => {
            return jsonData
        })
        .catch(
            (error) => {
                const errorResponse = {
                    data: error,
                    message: error.message,
                    requestStatus: false,
                    statusCode: error
                }
                throw errorResponse;
            }
        )

}


/**
 * 
 * @param {*} url 
 * @param {*} data 
 * This method posts data. (Usually used for Create operations )
 */
export const post = async (url, data) => {
    const path = `${BASE_URL}/${url}`;
    return await axios.post(path, data).then(
        (response) => { return response.data; }).catch((error) => {
            
            const errorResponse= error.response
            console.log(errorResponse)
            throw errorResponse;
        })
}


/**
 * 
 * @param {*} url 
 * @param {*} data 
 * This method updates an entity
 */
export const put = async (url, data = {}) => {
    const path = `${BASE_URL}/${url}`;
    return await axios.put(path, data).then(
        (response) => { return response.data; }).catch((error) => {
            const errorResponse= error.response
            throw errorResponse;
        })

}

/**
 * 
 * @param {*} url 
 * @param {*} data 
 * This method patches (smart-updates) an entity
 */
export const patch = async (url, data = {}) => {
    const path = `${BASE_URL}/${url}`;
    return await axios.patch(path, data).then(
        (response) => { return response.data; }).catch((error) => {
            const errorResponse= error.response
            throw errorResponse;
        })

}


/**
 * 
 * @param {*} url 
 * This method deletes an entity
 */
export const del = async (url) => {
    const path = `${BASE_URL}/${url}`;
    return await axios.delete(path).then(
        (response) => { return response.data; }).catch((error) => {
            const errorResponse= error.response
            throw errorResponse;
        })

}


/**
 * 
 * @param {*} url 
 * @param {*} data 
 * This method retrieves a file
 */
export const getFile = async (url, data = null) => {
    const path = extractDataAsParam(`${BASE_URL}/${url}`, data);
    return await axios.get(path, {responseType : 'arraybuffer'}).then(
        (response) => {
          return response.data;

        }).catch((error) => {
            throw error.response;
        })

}


/**
 * 
 * @param {*} url 
 * @param {*} file 
 * @param {*} data 
 * This method posts a file
 */
export const postFile = async (url, file, data = null) => {
    const path = extractDataAsParam(`${BASE_URL}/${url}`, data);
    const formData = new FormData();
    formData.append("file",file,file.name);
    return await axios.post(path, formData, {responseType : 'arraybuffer'}).then(
        (response) => {
          return response.data;
            }).catch((error) => {
            throw error.response;
        })

}



/**
 * 
 * @param {*} path 
 * @param {*} data 
 * This methods converts form body to url params. (Usually used when posting a file along with form body)
 */
const extractDataAsParam = (path, data = null) =>{
    if (data) {
        let dataParams = '?';
        let appendment = '';
        for (let key in data) {
            appendment += `${key}=${data[key]}&`;
        }
        path += `${dataParams}${appendment}`;
    }
    return path;
}