import axios from "axios";
import { get, post, postRefresh, postSingle, putPass } from "./apiServiceExt";


export class UserServices {


    public static consultaCatalogos(data: any,token:string) {
        return post('/api/consultaCatalogos', data,token);
    }

    public static usertypes(data: any,token:string) {
        return post('/api/user-types', data,token);
    }

    public static verify(data: any,token:string) {
        return post('/api/verify', data,token);
    }

    public static async userDetail(data: any,token:string) {
        return await post('/api/user-detail', data,token);
    }

    public static async login(data: any) {
        return await postSingle('login', data);
    }

    public static async refreshToken() {
        return await postRefresh('/api/refresh-token');
    }

    public static async createsolicitud(data: any,token:string) {
        return await post('/api/create-solicitud', data,token);
    }

    public static async detalleSol(data: string) {
        return await get('detalleSol?' + data);
    }

    public static async solicitudesapp(data: string) {
        return await get('solicitudes-app?' + data);
    }

    public static async changepassword(data: any) {
        return await putPass('change-password', data);
    }

}

export const userDetail=(data:any)=>{
    axios.post(process.env.REACT_APP_APPLICATION_DEV+'/api/userapp-detail',data)
    .then(response=>{console.log(response);
    })
    .catch(error=>{console.log(error);
    })
}

