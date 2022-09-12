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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { JWT_Token } from "../funcs/validation";
import { Usuario } from "../screens/Users/Users";

export interface AppsDialogProps {
	appsDialogOpen: boolean;
	handleAppsDialogClose: Function;
	usuario: Usuario | any;
}

export const AppsDialog = (props: AppsDialogProps) => {
	const [apps, setApps] = useState([]);

	const getAllApps = (appsUser: any) => {
		axios({
			method: "get",
			url: "http://10.200.4.105:5000/api/apps",
			headers: {
				"Content-Type": "application/json",
				Authorization: JWT_Token
						},
		})
			.then(function (response) {
				const appsTemp = response.data.data.map((app: any) => {
					app.active =
						appsUser.find((el: any) => el === app.Id) !== undefined;
					return app;
				});
				setApps(appsTemp);
			})
			.catch(function (error) {
				Swal.fire({
					icon: "error",
					title: "Mensaje",
					text:
						"(" + error.response.status + ") " + error.response.data.msg,
				});
			});
	};

	const getAllAppsUser = () => {
		const data = {
			IdUsuario: props.usuario.Id,
		};

		axios({
			method: "post",
			url: "http://10.200.4.105:5000/api/user-apps",
			headers: {
				"Content-Type": "application/json",
				Authorization: JWT_Token			},
			data: data,
		})
			.then(function (response) {
				if(response.data.data){
					const appsUser = response.data.data.map((app: any) => {
						return app.IdApp;
					});
					getAllApps(appsUser);
				} else
					getAllApps([]);
			})
			.catch(function (error) {
				Swal.fire({
					icon: "error",
					title: "Mensaje",
					text:
						"(" + error.response.status + ") " + error.response.data.msg,
				});
			});
	};

	const handleCheck = (active: boolean, id: string) => {
		const index = apps.findIndex((app: any) => {
			return app.Id === id;
		});
		let appsTemp: any = apps;
		appsTemp[index].active = active;
		setApps(appsTemp);
	};

	useEffect(() => {
		getAllAppsUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUpdateBtn = () => {
		const data = {
			IdUsuario: props.usuario.Id,
			Apps: apps.map((app: any) => {
				return { IdApp: app.Id, Vincular: app.active ? 1 : 0 };
			}),
		};
		
		axios({
			method: "post",
			url: "http://10.200.4.105:5000/api/manage-links",
			headers: {
				"Content-Type": "application/json",
				Authorization: JWT_Token			},
			data: data,
		})
			.then(function (response) {
				props.handleAppsDialogClose(true);
			})
			.catch(function (error) {
				Swal.fire({
					icon: 'error',
					title: 'Mensaje',
					text: "(" + error.response.status + ") " + error.response.data.msg,
				});
			});
	};

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
				Editar acceso a plataformas: {props.usuario.NombreUsuario}
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
					<Grid item xs={12} md={6} key={app.Id}>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										defaultChecked={app.active}
										// checked={app.active}
										onChange={(v) =>
											handleCheck(v.target.checked, app.Id)
										}
									/>
								}
								label={app.Nombre}
							/>
						</FormGroup>
					</Grid>
				))}
			</DialogContent>
			<DialogActions>
				<Button color="error" onClick={() => props.handleAppsDialogClose()}>
					Cancelar
				</Button>
				<Button onClick={() => handleUpdateBtn()}>Actualizar</Button>
			</DialogActions>
		</Dialog>
	);
};
