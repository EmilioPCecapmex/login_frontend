import { useEffect, useState } from "react";
import axios from "axios";
import {
	Box,
	Container,
	Card,
	CardHeader,
	CardContent,
	IconButton,
	Tooltip,
	Button,
} from "@mui/material";
import {
	AccountTree as AccountTreeIcon,
	Edit as EditIcon,
	PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { ls } from "./strings/st";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import { styles } from "./style/lst";
import "./style/Fonts.css";
import { EditDialog } from "../../components/editDialog";
import { NewDialog } from "../../components/newDialog";
import Swal from "sweetalert2";
import { AppsDialog } from "../../components/appsDialog";

const actualYear = () => {
	const year = new Date();
	const yearSt = year.getFullYear();
	return yearSt;
};

let st = styles;

export interface Usuario {
	Id: string
	Nombre: string
	ApellidoPaterno: string
	ApellidoMaterno: string
	EstaActivoLabel: string
	NombreUsuario: string
}

export default function Users() {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 5000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});
	const [rows, setRows] = useState([]);

	const [newDialogOpen, setNewDialogOpen] = useState(false);
	const handleNewDialogOpen = () => setNewDialogOpen(true);
	const handleNewDialogClose = (changed: boolean) => {
		if (changed === true) {
			Toast.fire({
				icon: "success",
				title: "Usuario Creado Exitosamente",
			});
			getAllUsers();
		}
		setNewDialogOpen(false);
	};
	const handleNewBtnClick = (event: any) => {
		handleNewDialogOpen();
	};

	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [editDialogUsuario, setEditDialogUsuario] = useState<Usuario>();
	const handleEditDialogOpen = () => setEditDialogOpen(true);
	const handleEditDialogClose = (changed: boolean) => {
		if (changed === true) {
			Toast.fire({
				icon: "success",
				title: "Usuario Actualizado Exitosamente",
			});
			getAllUsers();
		}
		setEditDialogOpen(false);
	};
	const handleEditBtnClick = (event: any, cellValues: any) => {
		setEditDialogUsuario(cellValues.row);
		handleEditDialogOpen();
	};

	const [appsDialogOpen, setAppsDialogOpen] = useState(false);
	const [appsDialogUsuario, setAppsDialogUsuario] = useState<Usuario>();
	const handleAppsDialogOpen = () => setAppsDialogOpen(true);
	const handleAppsDialogClose = (changed: boolean) => {
		if (changed === true) {
			Toast.fire({
				icon: "success",
				title: "Plataformas de Usuario Actualizadas Exitosamente",
			});
			getAllUsers();
		}
		setAppsDialogOpen(false);
	};
	const handleAppsBtnClick = (event: any, cellValues: any) => {
		setAppsDialogUsuario(cellValues.row);
		handleAppsDialogOpen();
	};

	const getAllUsers = () => {
		axios({
			method: "get",
			url: "http://10.200.4.105:5000/api/users",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVVc3VhcmlvIjoiUlZpbGxhcnJlYWwiLCJJZFVzdWFyaW8iOiIyOTdmNTlhMi0zMDg3LTExZWQtYWVkMC0wNDAzMDAwMDAwMDAiLCJpYXQiOjE2NjI5OTU4NTgsImV4cCI6MTY2Mjk5ODU1OH0.WLrTKu8MnPMIPl1cSv0qwhxfWOC7kCMgz95fgH-WOtk",
			},
		})
		.then(function (response) {
			// console.log(response.data.data);
			const rows = response.data.data.map((row: any) => {
				const estaActivoLabel = row.EstaActivo ? "Activo" : "Inactivo";
				const rowTemp = { EstaActivoLabel: estaActivoLabel, ...row };
				return rowTemp;
			});
			setRows(rows);
		})
		.catch(function (error) {
			console.log(error);
			
			Swal.fire({
				icon: 'error',
				title: 'Mensaje',
				text: "(" + error.response.status + ") " + error.response.data.message,
			});
		});
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const columns = [
		{
			field: "acciones",
			headerName: "Acciones",
			width: 100,
			renderCell: (cellValues: any) => {
				return (
					<Box>
						<Tooltip
							title={"Editar usuario " + cellValues.row.NombreUsuario}
						>
							<IconButton
								color="warning"
								onClick={(event) => {
									handleEditBtnClick(event, cellValues);
								}}
							>
								<EditIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title={"Editar acceso a plataformas"}>
							<IconButton
								color="info"
								onClick={(event) => {
									handleAppsBtnClick(event, cellValues);
								}}
							>
								<AccountTreeIcon />
							</IconButton>
						</Tooltip>
					</Box>
				);
			},
		},
		{ field: "Nombre", headerName: "Nombre", width: 180, hideable: false },
		{ field: "ApellidoPaterno", headerName: "Apellido Paterno", width: 180 },
		{ field: "ApellidoMaterno", headerName: "Apellido Materno", width: 180 },
		{ field: "NombreUsuario", headerName: "Nombre Usuario", width: 180 },
		{
			field: "CorreoElectronico",
			headerName: "Correo Electrónico",
			width: 200,
		},
		{ field: "CreadoPor", headerName: "Creado Por", width: 150 },
		{ field: "ModificadoPor", headerName: "Modificado Por", width: 150 },
		{ field: "EstaActivoLabel", headerName: "Esta Activo", width: 110 },
	];

	return (
		<Box>
			<Container>
				<Card sx={{ mt: 3 }}>
					<CardHeader
						title="Usuarios"
						subheader="Listado de usuarios con acceso a Plataformas"
					/>
					<CardContent>
						<Box mb={3} display="flex" justifyContent="flex-end">
							<Button
								variant="contained"
								onClick={(event) => handleNewBtnClick(event)}
								startIcon={<PersonAddIcon />}
							>
								Nuevo Usuario
							</Button>
						</Box>
						<MUIXDataGrid
							id={(row: any) => row.Id}
							columns={columns}
							rows={rows}
						/>
					</CardContent>
				</Card>
			</Container>
			<Box sx={st.footer}>
				<Box>{actualYear()}</Box>
				<Box sx={st.footerCenterText}>{ls.footerSecondText}</Box>
				<Box>{ls.footerThirdText}</Box>
			</Box>
			{newDialogOpen ? (
				<NewDialog
					newDialogOpen={newDialogOpen}
					handleNewDialogClose={handleNewDialogClose}
				/>
			) : null}
			{editDialogOpen ? (
				<EditDialog
					editDialogOpen={editDialogOpen}
					handleEditDialogClose={handleEditDialogClose}
					usuario={editDialogUsuario}
				/>
			) : null}
			{appsDialogOpen ? (
				<AppsDialog
					appsDialogOpen={appsDialogOpen}
					handleAppsDialogClose={handleAppsDialogClose}
					usuario={appsDialogUsuario}
				/>
			) : null}
		</Box>
	);
}
