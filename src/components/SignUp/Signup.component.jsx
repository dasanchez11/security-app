import React, { useState, useContext, useRef } from 'react'
import * as Yup from 'yup'
import TextField from '../TextField/TextField.component'
import { Formik, Form } from 'formik'
import CustomButton from '../CustomButton/CustomButton'
import { Navigate, useNavigate } from 'react-router-dom'
import FormSuccess from '../FormSuccess/FormSuccess.component'
import FormError from '../FormError/FormError.component'
import { AuthContext } from '../../context/AuthContext'
import ReCAPTCHA from "react-google-recaptcha";
import { FetchContext } from '../../context/FetchContext'



const SITE_KEY = '6Le1gdsgAAAAAB1_p3Lwiy_GRuWRiV7hhDNlNN4E'

const Signup = () => {
    const [signupSuccess, setSignUpSuccess] = useState(null)
    const [signupError, setSignUpError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [redirectOnSignup, setRedirectOnSignup] = useState(false)
    const authContext = useContext(AuthContext)
    const fetchContext = useContext(FetchContext)

    const reRef = useRef();


    const navigate = useNavigate()

    const validate = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Email is invalid ').required('Email is Required'),
        password: Yup.string().min(8, 'Must have at least 8 characters').required('Password is Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match').required('Confirm Password is Required')
    })

    const handleSignIn = () => {
        navigate('/signin')
    }

    const submitCredentials = async (credentials) => {
        try {
            const captchaToken = await reRef.current.executeAsync()
            reRef.current.reset()
            const credentialValues = { ...credentials, captchaToken }
            setLoading(true)
            const { data } = await fetchContext.publicAxios.put('signup', credentialValues)
            authContext.setAuthState(data)
            setSignUpSuccess(data.message)
            setSignUpError('')
            setTimeout(() => {
                setRedirectOnSignup(true)
            }, 700)
        } catch (error) {
            setLoading(false)
            const { message } = error.response.data
            setSignUpError(message)
            setSignUpSuccess('')
        }
    }


    return (
        <>
            {redirectOnSignup && <Navigate to='/dashboard' />}
            {signupSuccess && (
                <FormSuccess text={signupSuccess} />
            )}
            {signupError && (
                <FormError text={signupError} />
            )}
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={values => {
                    submitCredentials(values)
                }}
                validationSchema={validate}>
                {formik => (
                    <>
                        <Form className='flex flex-col gap-2 pt-5'>
                            <div className='flex flex-row gap-8'>
                                <TextField label='First Name' name='firstName' type='text' />
                                <TextField label='Last Name' name='lastName' type='text' />
                            </div>
                            <TextField label='Email' name='email' type='email' />
                            <div className='flex flex-row gap-8'>
                                <TextField label='Password' name='password' type='password' />
                                <TextField label='Confirm Password' name='confirmPassword' type='password' />
                            </div>

                            <ReCAPTCHA
                                sitekey={SITE_KEY}
                                size='invisible'
                                ref={reRef}
                            />
                            <CustomButton type='submit' name='Register'>Submit</CustomButton>
                            <p className='text-sm text-black self-center mt-3'>Already have an account? <span onClick={handleSignIn} className='text-Main cursor-pointer font-semibold underline'>SignIn</span></p>

                        </Form>
                    </>
                )}
            </Formik>
        </>
    )
}

export default Signup