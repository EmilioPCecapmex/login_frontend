import React from "react";

interface SolicitudPDFTemplateProps {
  Fecha: string;
  TipoDeMovimiento: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Puesto: string;
  AccesoApp: string; // "Estado" (Nombre de la plataforma)
  NombreUsuario: string;
  Correo: string;
  CURP: string;
  RFC: string;
  Telefono: string;
  Extension: string;
  Celular: string;
  TpoUsuario: string;
  // Si tienes un prop especifico para la 2da mención de plataforma úsalo, si no, repetimos AccesoApp
  PlataformaSolicitada?: string; 
  Estatus: string; // "Estado" (El número o estado final, ej: "1" o "Pendiente")
  extraPaddingTop?: number; // Permite ajustar margen superior al exportar PDF
  extraPaddingX?: number;   // Permite ajustar margen lateral al exportar PDF
}

export const SolicitudPDFTemplate: React.FC<SolicitudPDFTemplateProps> = (props) => {

  const extraPaddingTop = props.extraPaddingTop ?? 0;
  const extraPaddingX = props.extraPaddingX ?? 0;
  
  // Estilos fijos para asegurar la estructura vertical
  const styles = {
    page: {
      width: '794px', // Ancho A4 
      height: '1123px',
      display: 'flex' as const,
      flexDirection: 'column' as const,
      justifyContent: 'center' as const, // Centrado Vertical
      alignItems: 'center' as const,     // Centrado Horizontal
      padding: `80px ${extraPaddingX}px ${extraPaddingTop}px`, // Margen de seguridad general
      backgroundColor: '#ffffff',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: '#333',
      boxSizing: 'border-box' as const,
    },
    content: {
      width: '100%',
      maxWidth: '700px',
      // margin: '0 auto', // Ya no es necesario con alignItems center
    },
    // CONTENEDOR DEL ENCABEZADO: Flujo normal
    
    logo: {
      height: '100px', 
      width: 'auto',
      objectFit: 'contain' as const,
      display: 'block',
    },
    headerContainer: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
      width: '100%',
      marginBottom: '20px',
    },
    logoWrapper: {
      display: 'flex' as const,
      justifyContent: 'center' as const,
      width: '100%',
      marginBottom: '200px',
    
    },
    titlesWrapper: {
      textAlign: 'center' as const,
      width: '100%',
    },
    headerTitle: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '4px',
      textTransform: 'uppercase' as const,
    },
    sectionLabel: {
      fontSize: '10px',
      color: '#999',
      marginBottom: '12px',
      marginTop: '8px',
      textAlign: 'left' as const,
    },
    // TABLA
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginTop: '10px',
    },
    row: {
      borderBottom: '1px solid transparent', // Mantiene el espaciado
    },
    labelCell: {
      width: '180px', // Ancho fijo para alinear :
      fontWeight: 'bold',
      fontSize: '11px',
      color: '#000',
      padding: '5px 0',
      verticalAlign: 'top' as const,
      textAlign: 'left' as const,
    },
    valueCell: {
      fontSize: '11px',
      color: '#333',
      padding: '5px 0',
      verticalAlign: 'top' as const,
      textAlign: 'left' as const,
    },
    footer: {
      marginTop: '80px',
      textAlign: 'center' as const,
      fontSize: '10px',
      color: '#ccc',
    }
  };

  return (
    <div id="pdf-template" style={styles.page}>
      <div style={styles.content}>
        {/* 1. ENCABEZADO (Flexbox Vertical: Logo arriba, Textos abajo) */}
        <div style={styles.headerContainer}>
          {/* Wrapper del Logo */}
          <div style={styles.logoWrapper}>
            <img 
              src={`${process.env.PUBLIC_URL}/logo192.png`} 
              alt="Logo" 
              style={styles.logo} 
            />
          </div>
          
          {/* Wrapper de Textos */}
          <div style={styles.titlesWrapper}>
            <div style={styles.headerTitle}>
              GOBIERNO DEL ESTADO DE NUEVO LEÓN
            </div>
            <div style={styles.headerTitle}>
              SECRETARÍA DE FINANZAS Y TESORERÍA GENERAL DEL ESTADO
            </div>
            <div style={{ ...styles.headerTitle, textTransform: 'none', fontSize: '13px', marginTop: '6px', marginBottom: '4px' }}>
              Solicitud de usuarios
            </div>
          </div>
        </div>

        {/* 2. SUBTITULO */}
        <div style={styles.sectionLabel}>
          Datos Generales
        </div>

        {/* 3. TABLA DE DATOS (Lista completa de 17 campos) */}
        <table style={styles.table}>
          <tbody>
          <tr>
            <td style={styles.labelCell}>Fecha:</td>
            <td style={styles.valueCell}>{props.Fecha}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Tipo de movimiento:</td>
            <td style={styles.valueCell}>{props.TipoDeMovimiento}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Nombre:</td>
            <td style={styles.valueCell}>{props.Nombre}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Apellido paterno:</td>
            <td style={styles.valueCell}>{props.ApellidoPaterno}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Apellido materno:</td>
            <td style={styles.valueCell}>{props.ApellidoMaterno}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Puesto:</td>
            <td style={styles.valueCell}>{props.Puesto}</td>
          </tr>
          {/* PRIMER "Estado": Se refiere a la plataforma principal */}
          <tr>
            <td style={styles.labelCell}>Estado:</td>
            <td style={styles.valueCell}>{props.AccesoApp}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Nombre de usuario:</td>
            <td style={styles.valueCell}>{props.NombreUsuario}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Correo:</td>
            <td style={styles.valueCell}>{props.Correo}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>C.U.R.P.:</td>
            <td style={{...styles.valueCell, textDecoration: 'underline'}}>{props.CURP}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>R.F.C.:</td>
            <td style={styles.valueCell}>{props.RFC}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Teléfono:</td>
            <td style={styles.valueCell}>{props.Telefono}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Extensión:</td>
            <td style={styles.valueCell}>{props.Extension}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Celular:</td>
            <td style={styles.valueCell}>{props.Celular || "Sin Dato"}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>Tipo de usuario:</td>
            <td style={styles.valueCell}>{props.TpoUsuario}</td>
          </tr>
          {/* Plataforma solicitada (Puede ser igual a AccesoApp o diferente) */}
          <tr>
            <td style={styles.labelCell}>Plataforma solicitada:</td>
            <td style={styles.valueCell}>{props.PlataformaSolicitada || props.AccesoApp}</td>
          </tr>
          {/* SEGUNDO "Estado": Se refiere al Estatus numérico o de proceso */}
          <tr>
            <td style={styles.labelCell}>Estado:</td>
            <td style={styles.valueCell}>{props.Estatus}</td>
          </tr>
        </tbody>
        </table>

        {/* 4. SECCIÓN INFERIOR */}
        <div style={styles.footer}>
          <div style={{ marginBottom: '80px' }}>Notas</div>
          <div>Firmas</div>
        </div>
      </div>
    </div>
  );
};