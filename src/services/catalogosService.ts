import axios from "axios";

export const getCatalogo=(path:string,setState:Function)=>{
    axios({
        method: "get",
        params:{
            IdUsuario: localStorage.getItem('IdUsuario')
        },
        url: process.env.REACT_APP_APPLICATION_DEV + `/api/${path}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
        // aqui se recibe lo del endpoint en response
        .then(({data})=>{
            console.log('data',data.data);
            setState(data.data)
        })
        .catch(
        //     function (error) {
        // //   Swal.fire({
        // //     icon: "error",
        // //     title: "Mensaje",
        // //     text: "(" + error.response.status + ") " + error.response.data.message,
        // //   })
        // }
        );
    
        
}