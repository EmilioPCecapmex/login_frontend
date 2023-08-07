import axios from "axios"

export const getPermisosMenu=(IdMenu:string,setState:Function,IdApp:string,bandera:Function)=>{
    axios({
        method: "get",
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/permisos-menu",
        params: { IdMenu:IdMenu, IdApp:IdApp},
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }).then(
        ({data})=>{ 
          console.log("permisosMenu",data.data);
          
          if(data.data[0].Id){
             setState(data.data)
          }
          // setTimeout(() => {
            bandera();
          // }, 750);
          
        }
      ).catch(
        ()=>{setState([]);bandera();}
      )
}


export const getPermisosMenuRol=(IdMenu:string,IdRol:string,setState:Function)=>{
    axios({
        method: "get",
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/permisos-menu-rol",
        params: {IdMenu:IdMenu, IdRol:IdRol },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }).then(
        ({data})=>{ 
          console.log("permisosMenuRol",data.data);
          
        //   if(data.data[0].Id){
             setState(data.data)
        //   }
        //   // setTimeout(() => {
          
        //   // }, 750);
          
        }
      ).catch(
        ()=>{setState([])}
      )
}

export const createPermisoMenuRol=(IdRol:string,IdMenu:string,IdPermiso:string,CreadoPor:string,fnc:Function)=>{
  axios({
      method: "post",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/permiso-menu-rol",
      data:{IdRol:IdRol,IdMenu:IdMenu,IdPermiso:IdPermiso,CreadoPor:CreadoPor},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(
      (r)=>{ 
        console.log("r",r);
        
      //   if(data.data[0].Id){
          //  setState(data.data)
      //   }
      //   // setTimeout(() => {
        
      //   // }, 750);
        fnc()
      }
    ).catch(
      ()=>{fnc()}
    )
}

export const deletePermisoMenuRol=(IdRelacion:string,fnc:Function)=>{
  axios({
      method: "delete",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/permiso-menu-rol",
      data:{ Id:IdRelacion },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(
      (r)=>{ 
        console.log("r",r);
        
      //   if(data.data[0].Id){
          //  setState(data.data)
      //   }
      //   // setTimeout(() => {
        
      //   // }, 750);
        fnc()
      }
    ).catch(
      ()=>{fnc()}
    )
}

