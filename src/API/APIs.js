import axios from 'axios'
const MAIN_URL = "http://localhost:3001/"
const LOGIN_URL = 'http://localhost:3001/logged_in'
const LOGOUT_URL = 'http://localhost:3001/logout'
const PROPERTIES_URL = `${MAIN_URL}/properties`;


export const deleteProperty = (id) =>{
 return fetch(`${PROPERTIES_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(res => res.json())
}

export const createNewProperty = (value) => {
 return fetch(PROPERTIES_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(value)
  })
  .then(res => res.json())
}

export const loginUser = (handleLogin, handleLogout) => {
 return axios.get(LOGIN_URL, {withCredentials: true})
  .then(response => {
    if (response.data.logged_in){
      handleLogin(response.data)
    }else{
      handleLogout()
    }
  })
}

export const handleClickLogOut = () =>{
 return axios.delete(LOGOUT_URL, {withCredentials: true})
}