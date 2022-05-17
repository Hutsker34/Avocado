export function setToken(tok){
    localStorage.setItem('user', tok)
}

export function getToken(){
  return  localStorage.getItem('user')
}

export function deleteToken(){
    localStorage.removeItem('user')
}

