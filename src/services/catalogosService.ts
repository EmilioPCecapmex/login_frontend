import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({

  toast: true,

  position: "top-end",

  showConfirmButton: false,

  timer: 3000,

  timerProgressBar: true,

  didOpen: (toast) => {

    toast.addEventListener("mouseenter", Swal.stopTimer);

    toast.addEventListener("mouseleave", Swal.resumeTimer);

  },

});

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

export const modificarCatalogo=(path:string,data:any,setOpen:Function)=>{
  axios({
    method: "put",
    data: data,
    url: process.env.REACT_APP_APPLICATION_DEV + `/api${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    // aqui se recibe lo del endpoint en response
    .then((r)=>{
      Toast.fire({
        icon: "success",
        title: `El registro se modifico correctamente`,

      });
        setOpen(false)
    })
    .catch((e)=>{
      let mensaje =e.response.data.error==='Ingrese IdModificador válido.'?'No se detectaron cambios':e.response.data.error;
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "( " +mensaje+ " ) " 
      })
    
    }
    );
}

export const createCatalogo=(path:string,data:any,setOpen:Function)=>{
  axios({
    method: "post",
    data: data,
    url: process.env.REACT_APP_APPLICATION_DEV + `/api${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    // aqui se recibe lo del endpoint en response
    .then((r)=>{
      Toast.fire({
        icon: "success",
        title: `El registro se creo correctamente`,

      });
        setOpen(false)
    })
    .catch((e)=>{
      let mensaje =e.response.data.error==='Ingrese IdModificador válido.'?'No se detectaron cambios':e.response.data.error;
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "( " +mensaje+ " ) " 
      })
    
    }
    );
}

export const EliminarCatalogo=(path:string,Id:string)=>{
  axios({
    method: "put",
    data:{ 
      Id:Id,
      IdUsuario: localStorage.getItem("IdUsuario"),
    },
    url: process.env.REACT_APP_APPLICATION_DEV + `/api/${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    // aqui se recibe lo del endpoint en response
    .then((r)=>{
        // console.log('data',data.data);
        console.log(r);
        
    })
    .catch((e)=>{console.log(e);
    }
    );
}