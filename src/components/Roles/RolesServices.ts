import axios from "axios"

export const getRoles=(IdApp:string,setState:Function,bandera:Function)=>{
    axios({
        method: "get",
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/roles",
        params: { IdApp:IdApp },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }).then(
        ({data})=>{ 
          console.log(data.data[0]);
          
          if(data.data[0].Id){
             setState(data.data)
          }
          // setTimeout(() => {
            bandera();
          // }, 750);
          
        }
      ).catch(
        ()=>{bandera();}
      )
}