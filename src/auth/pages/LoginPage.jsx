import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth  );

    const dispatch = useDispatch();

    const {email, password, onInputChange } = useForm(formData);

    const isAuthenticating = useMemo( () => status === 'checking', [status] );

    const onSubmit = (event) => {
      event.preventDefault();

      // console.log({ email, password });

      dispatch( startLoginWithEmailPassword({email, password}) ); // aca va el otro dispatch

    }

    const onGoogleSignIn = () => {
        console.log('onGoogleSignIn');
        dispatch( startGoogleSignIn() );
    }



  return (
    <AuthLayout>
        <form 
        aria-label="submit-form"
        onSubmit={onSubmit} 
        className='animate__animated animate__fadeIn animate__faster'
          >
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField
                  label="correo"
                  type="email"
                  placeholder="correo@google.com"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField
                  label="contraseña"
                  type="password"
                  placeholder='contraseña'
                  fullWidth 
                  name="password"
                  inputProps={{
                    'data-testid': 'password'
                  }}
                  value={password}
                  onChange={onInputChange}
                />
              </Grid>

              <Grid container>

                <Grid
                 item
                 xs={ 12 }
                 display={ !!errorMessage ? '' : 'none' }
                 >
                  <Alert severity='error'>{errorMessage}</Alert>
                </Grid>

              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1}}>
                <Grid item xs={12} sm={6}>
                  <Button 
                  disabled={isAuthenticating}
                  type="submit" 
                  variant="contained"
                  fullWidth
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    disabled={isAuthenticating}
                    variant="contained"
                    fullWidth
                    aria-label='google-btn'
                    onClick={onGoogleSignIn}
                    >
                    <Google />
                    <Typography sx={{ ml: 1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Link component={ RouterLink } color='inherit' to="/auth/register">
                  Crear una Cuenta
                </Link>

              </Grid>

            </Grid>

        </form>

    </AuthLayout>

        

      
  )
}
