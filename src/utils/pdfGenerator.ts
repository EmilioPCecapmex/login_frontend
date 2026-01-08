import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import React from "react";
import { SolicitudPDFTemplate } from "../components/templates/SolicitudPDFTemplate";

interface DatosSolicitudPDF {
  Fecha: string;
  TipoDeMovimiento: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Puesto: string;
  AccesoApp: string;
  NombreUsuario: string;
  Correo: string;
  CURP: string;
  RFC: string;
  Telefono: string;
  Extension: string;
  Celular: string;
  TpoUsuario: string;
  Estatus: string;
  PlataformaSolicitada: string; // <-- Added missing property
}

export const generarPDFSolicitud = async (
  datos: DatosSolicitudPDF,
  nombreArchivo: string
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Crear un contenedor temporal para el template
      const tempDiv = document.createElement("div");
      tempDiv.id = "pdf-template-container";
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-10000px"; // Mover fuera de la pantalla
      tempDiv.style.top = "-10000px";  // Mover fuera de la pantalla
      tempDiv.style.zIndex = "2147483647"; 
      tempDiv.style.background = "#ffffff"; // Fondo blanco explícito
      tempDiv.style.width = "794px"; 
      tempDiv.style.margin = "0";
      tempDiv.style.padding = "0";
      // Asegurar que se muestre
      tempDiv.style.visibility = "visible";
      
      document.body.appendChild(tempDiv);

      // Crear el template con ReactDOM
      const root = createRoot(tempDiv);

      // Renderizar el template. Usamos 0 de padding extra ya que usamos Flexbox centrado
      root.render(
        React.createElement(SolicitudPDFTemplate, {
          ...datos,
          extraPaddingTop: 0 
        })
      );

      // Esperar a que se renderice completamente y las imágenes carguen
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Esperar fonts y evitar timeout si no cargan
      try {
          const maybeFonts = (document as any).fonts;
          if (maybeFonts?.ready) {
            await Promise.race([
                maybeFonts.ready,
                new Promise((r) => setTimeout(r, 1000))
            ]);
          }
      } catch (e) {
          // ignore
      }
      
      const element = document.getElementById("pdf-template");
      if (!element) {
        throw new Error("No se pudo renderizar el template");
      }

      // Asegurarse de que las imágenes estén cargadas
      const images = element.getElementsByTagName('img');
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );
      
      // Captura: Scroll al inicio
      const prevScrollX = window.scrollX;
      const prevScrollY = window.scrollY;
      
      const originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "visible"; // Asegurar visibilidad aunque sea absolute
      
      window.scrollTo(0, 0); 
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Usar tempDiv directamente para la captura, ya que es el contenedor padre posicionado
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        foreignObjectRendering: false,
        width: 794,
        height: 1123,
        windowWidth: 794,
        windowHeight: 1123,
        x: 0, 
        y: 0,
        scrollX: 0,
        scrollY: 0,
      });

      // Restaurar estado
      document.body.style.overflow = originalBodyOverflow;
      window.scrollTo(prevScrollX, prevScrollY);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Márgenes controlados (mm) para evitar recorte superior y mantener consistencia
      const marginTop = 14;
      const marginX = 12;
      const availableWidth = pdfWidth - marginX * 2;
      const availableHeight = pdfHeight - marginTop;

      // IMPORTANTE: NO mezclar px con mm.
      // Calcula el tamaño en mm usando solo la relación de aspecto del canvas.
      let imgWidth = availableWidth;
      let imgHeight = (availableWidth * canvas.height) / canvas.width;

      // Si por altura no cabe, ajusta por altura y recalcula el ancho
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = (availableHeight * canvas.width) / canvas.height;
      }

      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = marginTop;

      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(nombreArchivo);

      // Limpiar
      root.unmount();
      document.body.removeChild(tempDiv);

      resolve();
    } catch (error) {
      console.error("Error al generar PDF:", error);
      reject(error);
    }
  });
};
