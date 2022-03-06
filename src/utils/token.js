//相当于浏览器的数据库
//存储token
export const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};
//获取token
export const getToken = () => {
  return localStorage.getItem("jwtToken");
};

//清除本地存储的token
export const removeToken=()=>{
   localStorage.removeItem("jwtToken");
}
