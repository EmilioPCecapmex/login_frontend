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

export function alertaExito(fnc: Function, titulo = "Movimiento exitoso") {
  fnc(false)
  return (Toast.fire({
    icon: "success",
    title: titulo,
  }))
}

export function alertaError(titulo = "Movimiento fallido") {
  Toast.fire({
    icon: "error",
    title: titulo,
  });
}