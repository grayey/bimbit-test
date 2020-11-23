import axios from "axios";
import localStorageService from "./localStorage.service";
import jwt_decode from "jwt-decode";

class JwtAuthService {
  
  // fake  user object
  user = {
    userId: "1",
    role: 'ADMIN',
    displayName: "Bimbi Philips",
    email: "bimbi@gmail.com",
    photoURL: "/assets/images/face-7.jpg",
    token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh"
  }

  loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 1000);
    }).then(data => {
      this.setSession(data.token);
      this.setUser(data);
      return data;
    });
  };

  loginWithToken = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 100);
    }).then(data => {
      this.setSession(data.token);
      this.setAuthUser(data);
      return data;
    });
  };

  

  logout = () => {
    this.setSession(null);
    this.removeUser();
  }

  setSession = token => {
    if (token) {
      localStorage.setItem("bimbi_app_user", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("bimbi_app_user");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  getAuthUser = () => {
    const token = localStorageService.getItem('bimbi_app_user');
    const authUser = jwt_decode(token);
    return authUser;
  }

  setAuthUser = (token) => {    
    // localStorageService.setItem("auth_user", user);
    this.setSession(token);
  }

  removeUser = () => {
    localStorage.removeItem("bimbi_app_user");
  }
}

export default new JwtAuthService();
