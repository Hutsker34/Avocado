export function setToken(param, value){
    localStorage.setItem(param, value)
}

export function getToken(param){
    const a = localStorage.getItem(param)
    let result = {}
    try{
        result = JSON.parse(a)
    }catch(error){
        console.log(error.message)
    }
  return  result
}

export function deleteToken(){
    localStorage.removeItem('accessToken')
}

export const authHeader = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
      return {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer: ' + accessToken
      };
  } else {
      return {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      };
  }
};