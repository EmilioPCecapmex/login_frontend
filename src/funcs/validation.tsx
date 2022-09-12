import axios from "axios";


export const JWT_Token: string = localStorage.getItem("jwtToken") || "";

export const IdUsuario_LS: string = localStorage.getItem("IdUsuario") || "";


export const sessionValid = () => {
        return axios.post('http://10.200.4.105:5000/api/verify', {
        }, {headers: {
          'Content-Type': 'application/json',
          'authorization': JWT_Token
        }}).then((r) => {
          if(r.status === 200){
           localStorage.setItem("validation", "true")
          }
        }).catch((error) => {
          if(error.response.status === 401){
            localStorage.clear()
        }
        })
  }

  
