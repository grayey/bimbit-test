import moment from "moment";
import * as titleCase from "titlecase";



export const formatDate = (date) =>  moment(date).format('MMM D, YYYY');
  
export const toTiltle = (stringVal) => titleCase(stringVal);


export const formatNumber = (numberValue, toDecimal=true, no_places = 2) => {
    let val = numberValue || 0;
    let stringValue = toDecimal ? parseFloat(val).toFixed(no_places) : val.toString();
    return stringValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  
  }

export const processErrors = (error) => {
    let errorMessage = '';
    let { data, status } = error;
    status = status ? status.toString() : '';
    switch(status){
        case '403':
            errorMessage = data ? data.detail : '';
            break;
        case '400':
            for(let key in data){ errorMessage += `${data[key][0].replace('This',key)}\r\n` }
            break;
        default:
            errorMessage = 'Server has gone away!. Please try again in a bit.'
            break;
    }

    return errorMessage;
}

  
export const generateRandomId = () => {
    let tempId = Math.random().toString();
    let uid = tempId.substr(2, tempId.length - 1);
    return uid;
}

export const getTimeDifference = (date) => {
    let difference =
      moment(new Date(), "DD/MM/YYYY HH:mm:ss").diff(
        moment(date, "DD/MM/YYYY HH:mm:ss")
      ) / 1000;
  
    if (difference < 60) return `${Math.floor(difference)} seconds`;
    else if (difference < 3600) return `${Math.floor(difference / 60)} minutes`;
    else if (difference < 86400) return `${Math.floor(difference / 3660)} hours`;
    else if (difference < 86400 * 30)
      return `${Math.floor(difference / 86400)} days`;
    else if (difference < 86400 * 30 * 12)
      return `${Math.floor(difference / 86400 / 30)} months`;
    else return `${(difference / 86400 / 30 / 12).toFixed(1)} years`;
}
  
export const isValid = (fields)=>{
  for(let key in fields){
    if (!fields[key]) return false;
  }
  return true;
}
