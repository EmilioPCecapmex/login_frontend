import {
  Box,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import moment from 'moment'

export const CommentsDialog = ({
  open,
  close,
  solicitud,
}: {
  open: boolean;
  close: Function;
  solicitud: string;
}) => {
  const [comentarios, setComentarios] = useState<Array<IComentarios>>([]);
  const [renderComments, setRenderComments] = useState(false);

  const getComentarios = () => {
    axios({
      method: "get",
      url: "http://10.200.4.105:5000/api/comentarios-solicitudes",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
      params: {
        IdUsuario: localStorage.getItem("IdUsuario"),
        IdSolicitud: solicitud,
      },
    })
      .then(function (response) {
        setComentarios(response.data.data);
        setRenderComments(true);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.msg,
        });
      });
  };

  useEffect(() => {
    if (open) {
      getComentarios();
    } else {
      setRenderComments(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={() => close()} fullWidth={true} maxWidth="md">
      <Box sx={{ width: "100%", height: "40vh" }}>
        
        <TableContainer>
          <Table>
            <TableHead sx={{ width: "100%" }}>
              <TableRow sx={{ width: "100%", backgroundColor: "#d6d6d6" }}>
                <TableCell align="center" sx={{ width: "33%" }}>
                  <Typography sx={{ fontFamily: "MontserratBold" }}>
                    Usuario
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: "34s%" }}>
                  <Typography sx={{ fontFamily: "MontserratBold" }}>
                    Comentario
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: "33%" }}>
                  <Typography sx={{ fontFamily: "MontserratBold" }}>
                    Fecha
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
         
            <TableBody>
              {comentarios?.map((row) => {
                return (
                  <TableRow sx={{ width: "100%" }}>
                    <TableCell align="center" sx={{ width: "33%" }}>
                      <Typography sx={{ fontFamily: "MontserratRegular" }}>
                        {row.NombreCreador}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "34s%" }}>
                      <Typography sx={{ fontFamily: "MontserratRegular" }}>
                        {row.Comentario}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "33%" }}>
                      <Typography sx={{ fontFamily: "MontserratRegular" }}>
                        {moment(row.FechaDeCreacion, moment.ISO_8601)
                                    .format("DD/MM/YYYY HH:mm:SS")
                                    .toString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {comentarios.length === 0 ? (
<Box sx={{width: '100%', height: '80%', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Typography sx={{fontFamily: 'MontserratRegular'}}>Sin Comentarios</Typography>
</Box>
            ): null}
      </Box>
    </Dialog>
  );
};

export interface IComentarios {
  Id: string;
  Respuesta: string;
  Mensaje: string;
  Comentario: string;
  CreadoPor: string;
  FechaDeCreacion: string;
  NombreCreador: string;
}
