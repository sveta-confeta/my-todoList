
import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const validate = (values:any) => {
        const errors: FormikErrorType= {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values)); //это для теста что все работает)
        },
    })


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            {/*//оборачиваем наши все формы тегом form..*/}
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField label="Email" margin="normal" name="email" onChange={formik.handleChange} value={formik.values.email}/>
                    <TextField type="password" label="Password" name="password" onChange={formik.handleChange} value={formik.values.password}
                               margin="normal"
                    />
                    <FormControlLabel label={'Remember me'} control={<Checkbox  name="rememberMe" onChange={formik.handleChange} checked={formik.values.rememberMe}/>}/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}

