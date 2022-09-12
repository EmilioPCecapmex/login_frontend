import { Close as CloseIcon } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { IdUsuario_LS, JWT_Token } from "../funcs/validation";

export interface NewDialogProps {
	newDialogOpen: boolean;
	handleNewDialogClose: Function;
}

export const NewDialog = (props: NewDialogProps) => {
	const [nombre, setNombre] = useState("");
	const [nombreUsuario, setNombreUsuario] = useState("");
	const [apellidoPaterno, setApellidoPaterno] = useState("");
	const [apellidoMaterno, setApellidoMaterno] = useState("");
	const [correo, setCorreo] = useState("");

	const handleStoreBtn = () => {
		if (
			nombre === "" ||
			nombreUsuario === "" ||
			apellidoPaterno === "" ||
			apellidoMaterno === ""
		) {
			Swal.fire({
				icon: 'error',
				title: 'Mensaje',
				text: 'Completa todos los campos para continuar',
			});
		} else {
			const data = {
				Nombre: nombre,
				ApellidoPaterno: apellidoPaterno,
				ApellidoMaterno: apellidoMaterno,
				NombreUsuario: nombreUsuario,
				CorreoElectronico: correo,
				IdUsuarioModificador: IdUsuario_LS,
			};

			axios({
				method: "post",
				url: "http://10.200.4.105:5000/api/sign-up",
				headers: {
					"Content-Type": "application/json",
					Authorization: JWT_Token
							},
				data: data,
			})
				.then(function (response) {
					props.handleNewDialogClose(true);
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
			open={props.newDialogOpen}
			onClose={() => props.handleNewDialogClose()}
			fullWidth={true}
			maxWidth="md"
			aria-labelledby="edit-dialog-title"
			aria-describedby="edit-dialog-description"
		>
			<DialogTitle id="edit-dialog-title">
				Nuevo Usuario
				<IconButton
					aria-label="close"
					onClick={() => props.handleNewDialogClose()}
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
							id="nombreUsuario"
							label="Nombre de Usuario"
							type="text"
							fullWidth
							variant="standard"
							value={nombreUsuario}
							required
							onChange={(v) => setNombreUsuario(v.target.value)}
						/>
					</Grid>
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
							required
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
							required
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
							required
							onChange={(v) => setApellidoMaterno(v.target.value)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							autoFocus
							margin="dense"
							id="correo"
							label="Correo Electrónico"
							type="text"
							fullWidth
							variant="standard"
							value={correo}
							required
							onChange={(v) => setCorreo(v.target.value)}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					color="error"
					onClick={() => props.handleNewDialogClose()}
				>
					Cancelar
				</Button>
				<Button onClick={() => handleStoreBtn()}>Actualizar</Button>
			</DialogActions>
		</Dialog>
	);
};
