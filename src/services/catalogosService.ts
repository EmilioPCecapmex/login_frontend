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

export const getCatalogo = (path: string, setState: Function) => {
  axios({
    method: "get",
    params: {
      IdUsuario: localStorage.getItem('IdUsuario')
    },
    url: process.env.REACT_APP_APPLICATION_DEV + `/api/${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    // aqui se recibe lo del endpoint en response
    .then(({ data }) => {
      console.log(`catalogo ${path}`,data.data);
      setState(data.data)
    })
    .catch(
   
  );


}

export const modificarCatalogo = (path: string, data: any, setOpen: Function, reloadData: Function) => {
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
    .then((r) => {
      reloadData(String(Math.random()))
      Toast.fire({
        icon: "success",
        title: `¡Registro Editado!`,

      });
      setOpen(false)
    })
    .catch((e) => {
      let mensaje = e.response.data.error === 'Ingrese IdModificador válido.' ? 'No se detectaron cambios' : e.response.data.error;
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "( " + mensaje + " ) "
      })

    }
    );
}

export const createCatalogo = (path: string, data: any, setOpen: Function, reloadData: Function) => {
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
    .then((r) => {
      reloadData(String(Math.random()))
      Toast.fire({
        icon: "success",
        title: `¡Registro creado!`,

      });
      setOpen(false)
    })
    .catch((e) => {
      let mensaje = e.response.data.error === 'Ingrese IdModificador válido.' ? 'No se detectaron cambios' : e.response.data.error;
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "( " + mensaje + " ) "
      })

    }
    );
}

export const EliminarCatalogo = (path: string, Id: string, setOpen: Function, reloadData: Function) => {
  axios({
    method: "put",
    data: {
      Id: Id,
      IdUsuario: localStorage.getItem("IdUsuario"),
    },
    url: process.env.REACT_APP_APPLICATION_DEV + `/api/${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    // aqui se recibe lo del endpoint en response
    .then((r) => {
      reloadData(String(Math.random()))
      Toast.fire({
        icon: "success",
        title: `¡Registro eliminado!`,

      });
      setOpen(false)
    })
    .catch((e) => {
      let mensaje = e.response.data.error === 'Ingrese IdModificador válido.' ? 'No se detectaron cambios' : e.response.data.error;
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "( " + mensaje + " ) "
      });
    }
    );
}