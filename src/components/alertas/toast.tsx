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
  fnc(false);
  return Toast.fire({
    icon: "success",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
  });
}

export function alertaInformativa(titulo:string) {
  return Toast.fire({
    icon: "info",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
  });
}

export function alertaError(titulo = "Movimiento fallido") {
  Toast.fire({
    icon: "info",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
  });
}
