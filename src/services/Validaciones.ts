import { alertaError } from "../components/alertas/toast";

export const validarNumero = (dato: string, state: any) => {
    if (/^[0-9]+$/.test(dato)) {
      return dato;
    } else if (dato.length === 0) {
      return "";
    }
    alertaError("Este campo solo acepta numeros.")
    return state;
  };