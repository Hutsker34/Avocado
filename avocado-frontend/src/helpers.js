export function setToken(tok){
    localStorage.setItem('accessToken', tok)
}

export function getToken(){
  return  localStorage.getItem('accessToken')
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