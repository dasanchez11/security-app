import React, { useState } from 'react'
import TextField from '../TextField/TextField.component'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomButton from '../CustomButton/CustomButton'
import { useNavigate, Navigate } from 'react-router-dom'
import FormSuccess from '../FormSuccess/FormSuccess.component'
import FormError from '../FormError/FormError.component'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { FetchContext } from '../../context/FetchContext'


const SignIn = () => {
    const [signinSuccess, setSigninSuccess] = useState()
    const [signinError, setSigninError] = useState()
    const [redirectOnSignin, setredirectOnSignin] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const validate = Yup.object({
        email: Yup.string().email('Email is invalid ').required('Email is Required'),
        password: Yup.string().min(8, 'Must have at least 8 characters').required('Password is Required'),
    })
    const authContext = useContext(AuthContext)
    const fetchContext = useContext(FetchContext)
    const {isAuthenticated} = authContext.authState

    const handleRegister = () => {
        navigate('/signup')
    }
    const submitCredentials = async (credentials) => {
        try {
            setLoading(true)
            const { data } = await fetchContext.publicAxios.post('signin', credentials)
            authContext.setAuthState(data)
            setSigninSuccess(data.message)
            setSigninError('')
            setTimeout(() => {
                setredirectOnSignin(true)
            }, 700)
        } catch (error) {
            setLoading(false)
            console.log(error)
            const { message } = error.response.data
            setSigninError(message)
            setSigninSuccess('')
        }
    }
  

    return (
        <>
            {isAuthenticated && <Navigate to='/dashboard' />}
            {redirectOnSignin && <Navigate to='/dashboard' />}
            {signinSuccess && (
                <FormSuccess text={signinSuccess} />
            )}
            {signinError && (
                <FormError text={signinError} />
            )}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={values => {
                    submitCredentials(values)
                }}
                validationSchema={validate}>
                {formik => (
                    <>
                        <Form className='flex flex-col gap-2 pt-5'>
                            <TextField label='Email' name='email' type='email' />
                            <TextField label='Password' name='password' type='password' />
                            <div className='flex flex-row justify-end text-sm font-normal cursor-pointer p-2' >
                                <span className=''>Forgot password?</span>
                            </div>
                            <CustomButton type='submit' name='Login'>Submit</CustomButton>
                            <p className='text-sm text-black self-center mt-3'>Don't have an account? <span onClick={handleRegister} className='text-Main cursor-pointer font-semibold underline'>Register</span></p>

                        </Form>
                    </>
                )}
            </Formik>
        </>


    )
}

export default SignIn