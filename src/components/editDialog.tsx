import { Close as CloseIcon } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	Switch,
	TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IdUsuario_LS, JWT_Token } from "../funcs/validation";
import { Usuario } from "../screens/Users/Users";

export interface EditDialogProps {
	editDialogOpen: boolean
	handleEditDialogClose: Function
	usuario: Usuario | any
}

export const EditDialog = (props: EditDialogProps) => {
	const [nombre, setNombre] = useState("");
	const [nombreUsuario, setNombreUsuario] = useState("");
	const [apellidoPaterno, setApellidoPaterno] = useState("");
	const [apellidoMaterno, setApellidoMaterno] = useState("");
	const [estaActivo, setEstaActivo] = useState(false);

	useEffect(() => {
		setNombre(props.usuario.Nombre);
		setNombreUsuario(props.usuario.NombreUsuario);
		setApellidoPaterno(props.usuario.ApellidoPaterno);
		setApellidoMaterno(props.usuario.ApellidoMaterno);
		setEstaActivo(props.usuario.EstaActivoLabel === "Activo" ? true : false);
	}, [
		props.usuario.Nombre,
		props.usuario.NombreUsuario,
		props.usuario.ApellidoPaterno,
		props.usuario.ApellidoMaterno,
		props.usuario.EstaActivoLabel,
	]);

	const handleUpdateBtn = () => {
		if (nombre === "" || apellidoPaterno === "" || apellidoMaterno === "") {
			Swal.fire({
				icon: 'error',
				title: 'Mensaje',
				text: 'Completa todos los campos para continuar',						
			});
		} else {

			const data = {
				IdUsuario: props.usuario.Id,
				Nombre: nombre,
				ApellidoPaterno: apellidoPaterno,
				ApellidoMaterno: apellidoMaterno,
				EstaActivo: estaActivo ? 1 : 0,
				IdUsuarioModificador: IdUsuario_LS,
			};

			axios({
				method: "put",
				url: "http://10.200.4.105:5000/api/user",
				headers: {
					"Content-Type": "application/json",
					Authorization: JWT_Token				},
				data: data,
			})
				.then(function (response) {
					props.handleEditDialogClose(true);
				})
				.catch(function (error) {
					Swal.fire({
						icon: 'error',
						title: 'Mensaje',
						text: "(" + error.response.status + ") " + error.response.data.msg,
					});
				});
		}
	};

	return (
		<Dialog
			open={props.editDialogOpen}
			onClose={() => props.handleEditDialogClose()}
			fullWidth={true}
			maxWidth="md"
			aria-labelledby="edit-dialog-title"
			aria-describedby="edit-dialog-description"
		>
			<DialogTitle id="edit-dialog-title">
				Editar Usuario {nombreUsuario}
				<IconButton
					aria-label="close"
					onClick={() => props.handleEditDialogClose()}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							autoFocus
							margin="dense"
							id="nombre"
							label="Nombre(s)"
							type="text"
							fullWidth
							variant="standard"
							value={nombre}
							onChange={(v) => setNombre(v.target.value)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							autoFocus
							margin="dense"
							id="apellidoPaterno"
							label="Apellido Paterno"
							type="text"
							fullWidth
							variant="standard"
							value={apellidoPaterno}
							onChange={(v) => setApellidoPaterno(v.target.value)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							autoFocus
							margin="dense"
							id="apellidoMaterno"
							label="Apellido Materno"
							type="text"
							fullWidth
							variant="standard"
							value={apellidoMaterno}
							onChange={(v) => setApellidoMaterno(v.target.value)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										checked={estaActivo}
										onChange={(v) =>
											setEstaActivo(v.target.checked)
										}
									/>
								}
								label={estaActivo ? "Activo" : "Inactivo"}
							/>
						</FormGroup>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					color="error"
					onClick={() => props.handleEditDialogClose()}
				>
					Cancelar
				</Button>
				<Button onClick={() => handleUpdateBtn()}>
					Actualizar
				</Button>
			</DialogActions>
		</Dialog>
	);
};
