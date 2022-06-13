
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
import {useDispatch} from "react-redux";
import {loginTC} from "../../reducers/authReducer";
import {useAppSelector} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch=useDispatch();
    const isLogin= useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const validate = (values:any) => {
        const errors: FormikErrorType= {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length <=3) {
            errors.password = 'symbol of password should > 3';
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
           // alert(JSON.stringify(values)); //это для теста что все работает)
            dispatch(loginTC(values));
            formik.resetForm();
        },

    })
    if (isLogin){ //если тру-то сделай редирект на страницу с тодолистами
        return <Navigate to ={'/'}/>
    }


    return <Grid container justifyContent={'center'}>

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
                    <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />

                    {formik.touched.email && formik.errors.email &&  <div style={{color:"red"}}>{formik.errors.email}</div> }

                    <TextField type="password" label="Password" {...formik.getFieldProps('password')}
                               margin="normal"
                    />
                    {formik.touched.password && formik.errors.password &&  <div style={{color:"red"}}>{formik.errors.password}</div> }
                    <FormControlLabel label={'Remember me'} control={<Checkbox  {...formik.getFieldProps('rememberMe')}
                                                                                checked={formik.values.rememberMe}/> //благодаря этой строке чекбокс тоже сбрасывается
                    }/>
                    {formik.touched.password && formik.errors.password &&  <div style={{color:"red"}}>{formik.errors.password}</div> }

                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                    <ErrorSnackbar/>
                </FormGroup>
            </FormControl>
            </form>

    </Grid>
}

