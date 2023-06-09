import { CircularProgress, Dialog, Grid, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import * as React from 'react';


const SliderProgress = ({
  open,
  texto
}: {
  open: boolean,
  texto: string
}) => {

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

 




  return (
    <Dialog fullScreen
      className='ContainerSliderProgress'
      sx={{ zIndex: 2000 }}
      open={open}
    >
      <Grid className='containerCenter' container direction="column"
        justifyContent="center"
        alignItems="center"  >
        <Grid item >
          <CircularProgress
            size={200}
            sx={{
              color: "#AF8C55",
            }}
          />

        </ Grid>
        <Grid item >

          <Typography variant='h4' className='Cargando'>
            {texto ? texto : "Cargando .."}
          </Typography>
        </ Grid>
      </Grid>

    </Dialog>
  )
}

export default SliderProgress
