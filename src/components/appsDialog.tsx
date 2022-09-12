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
import { Usuario } from "../screens/Users/Users";

export interface AppsDialogProps {
	appsDialogOpen: boolean
	handleAppsDialogClose: Function
	usuario: Usuario | any
}

export const AppsDialog = (props: AppsDialogProps) => {
	const [apps, setApps] = useState([]);
	const [appsUser, setAppsUser] = useState([]);

	const getAllApps = (appsUserTemp: any) => {
		axios({
			method: "get",
			url: "http://10.200.4.105:5000/api/apps",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVVc3VhcmlvIjoiUlZpbGxhcnJlYWwiLCJJZFVzdWFyaW8iOiIyOTdmNTlhMi0zMDg3LTExZWQtYWVkMC0wNDAzMDAwMDAwMDAiLCJpYXQiOjE2NjI3NjI0MzcsImV4cCI6MTY2Mjc2NTEzN30.MwYKvfVyVYi9owZ9HJ1GGd25axlLVrx7Yk9qCpuvOl0",
			},
		})
		.then(function (response) {
			// console.log(appsUserTemp);
			// const array1 = ['f18ad0d4-3087-11ed-aed0-040300000000', "fa82e267-3087-11ed-aed0-040300000000"];
			// console.log(array1.find(element => element === 'f18ad0d4-3087-11ed-aed0-04030000000') !== undefined)
			const appsTemp = response.data.data.map( (app: any) => {
				app.active = appsUserTemp.find((el: any) => el === app.Id) !== undefined;
				return app;
			})
			setApps(appsTemp);
		})
		.catch(function (error) {
			Swal.fire({
				icon: 'error',
				title: 'Mensaje',
				text: "(" + error.response.status + ") " + error.response.data.msg,
			});
		});
	}

	const getAllAppsUser = () => {
		const data = {
			IdUsuario: props.usuario.Id,
		};

		axios({
			method: "post",
			url: "http://10.200.4.105:5000/api/user-apps",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVVc3VhcmlvIjoiUlZpbGxhcnJlYWwiLCJJZFVzdWFyaW8iOiIyOTdmNTlhMi0zMDg3LTExZWQtYWVkMC0wNDAzMDAwMDAwMDAiLCJpYXQiOjE2NjI3NjI0MzcsImV4cCI6MTY2Mjc2NTEzN30.MwYKvfVyVYi9owZ9HJ1GGd25axlLVrx7Yk9qCpuvOl0",
			},
			data: data
		})
		.then(function (response) {
			const appsUserTemp = response.data.data.map((app: any) => {return app.IdApp});
			setAppsUser(appsUserTemp);
			getAllApps(appsUserTemp);
		})
		.catch(function (error) {
			Swal.fire({
				icon: 'error',
				title: 'Mensaje',
				text: "(" + error.response.status + ") " + error.response.data.msg,
			});
		});
	}

	useEffect(() => {
		getAllAppsUser();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<Dialog
			open={props.appsDialogOpen}
			onClose={() => props.handleAppsDialogClose()}
			fullWidth={true}
			maxWidth="md"
			aria-labelledby="edit-dialog-title"
			aria-describedby="edit-dialog-description"
		>
			<DialogTitle id="edit-dialog-title">
				Editar Acceso a Plataformas de Usuario {props.usuario.NombreUsuario}
				<IconButton
					aria-label="close"
					onClick={() => props.handleAppsDialogClose()}
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
				{apps.map((app: any) => (
					<Grid item xs={12} md={6}>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										id={app.Id}
										checked={app.active}
										// onChange={(v) =>
										// 	setEstaActivo(v.target.checked)
										// }
									/>
								}
								label={app.Nombre}
							/>
						</FormGroup>
					</Grid>
				))}
			</DialogContent>
			<DialogActions>
				<Button
					color="error"
					onClick={() => props.handleAppsDialogClose()}
				>
					Cancelar
				</Button>
				<Button onClick={() => props.handleAppsDialogClose()}>
					Actualizar
				</Button>
			</DialogActions>
		</Dialog>
	);
};
