//Custom alternative to dotenv

const env = process.env.NODE_ENV;
const app_mode = env ? env.trim() : "development";
console.log("env", env, process.env)

const environment = {
    development: {
        api_base_url: 'http://localhost:8000/api',
        base_url_front: '' // can be used as redirect url for backend. e.g mails, active directory etc.
    },
    production: {
        api_base_url: 'https://<backend-url>/api',
        base_url_front: ''
    }

}

export const APP_ENVIRONMENT = environment[app_mode];