import axios from "axios"

export const getMenus=(IdApp:string,setState:Function,bandera:Function)=>{
    axios({
        method: "get",
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/menus",
        params: { IdApp:IdApp },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }).then(
        ({data})=>{ 
          console.log("menus",data.data);
          
          if(data.data[0].Id){
             setState(data.data)
          }
          // setTimeout(() => {
            bandera();
          // }, 750);
          
        }
      ).catch(
        ()=>{bandera();setState([])}
      )
}


export const getMenusRol=(IdRol:string,setState:Function)=>{
    axios({
        method: "get",
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/menus-rol",
        params: { IdRol:IdRol },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }).then(
        ({data})=>{ 
          console.log("menusRol",data.data);
          
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

export const deleteMenuRol=(IdRelacion:string,fnc:Function)=>{
  axios({
      method: "delete",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/menu-rol",
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

export const createMenuRol=(IdRol:string,IdMenu:string,CreadoPor:string,fnc:Function)=>{
  axios({
      method: "post",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/menu-rol",
      data:{IdRol:IdRol,IdMenu:IdMenu,CreadoPor:CreadoPor},
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

