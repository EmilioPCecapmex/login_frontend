export const queries = {

    buttonCancelarSolicitudInscripcion: {
      marginTop: "1rem",
      backgroundColor: "rgb(175, 140, 85)",
      height: "4vh",
      color: "white",
      "&&:hover": {
        backgroundColor: "rgba(175, 140, 85, 0.6)",
        color: "#000",
      },
      fontSize: "90%",
      borderRadius: "0.8vh",
      textTransform: "capitalize",
      "&.Mui-disabled": {
        opacity: 1,
        backgroundColor: "rgba(175, 140, 85, 0.6)",
        color: "#000",
      },
    },
  
    buttonContinuarSolicitudInscripcion: {
      marginTop: "1rem",
      backgroundColor: "#15212f",
      height: "4vh",
      color: "white",
      "&&:hover": {
        backgroundColor: "rgba(47, 47, 47, 0.4)",
        color: "#000",
      },
      fontSize: "90%",
      borderRadius: "0.8vh",
      textTransform: "capitalize",
    },
    text: {
      fontSize: "2ch",
      fontFamily: "'Montserrat', sans-serif",
      alignSelf: "center",
      "@media (max-width: 600px)": {
     
        fontSize: "1rem",
      },
      "@media (min-width: 601px) and (max-width: 900px)": {
        
        fontSize: "1.5ch",
      },
    },
     italic_text: {
      fontSize: "2ch",
      fontFamily: "MontserratRegular",
      fontStyle: "oblique",
      "@media (max-width: 600px)": {
        fontSize: "1rem",
      },
      "@media (min-width: 601px) and (max-width: 900px)": {
        fontSize: "1.5ch",
      },
    },
    medium_text: {
      fontSize: "2ch",
      fontFamily: "MontserratMedium",
      "@media (max-width: 600px)": {
        fontSize: "1rem",
      },
      "@media (min-width: 601px) and (max-width: 900px)": {
        fontSize: "1.5ch",
      },
    },
    bold_text: {
      fontSize: "1.8ch",
      fontFamily: "MontserratBold",
      "@media (max-width: 600px)": {
        fontSize: "1rem",
      },
      "@media (min-width: 601px) and (max-width: 900px)": {
        fontSize: "1.5ch",
      },
    },
   
  
  }