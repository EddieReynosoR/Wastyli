import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginReq, googleLogin, userList } from "../api/users"
import { Formik, Field, Form} from "formik"
import { Link, useLocation, useNavigate, NavLink} from "react-router-dom"
import { BsTwitter } from "react-icons/bs"
import Loader from "../components/Loader"
import {GoogleLogin, useGoogleLogin} from '@react-oauth/google'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import queryString from "query-string"
import { gapi } from "gapi-script"
import { jwtDecode } from 'jwt-decode';




const LoginPage = () => {

  const clientId = "185644267417-697ga4etap0ar70do8dii994ubush7n2.apps.googleusercontent.com"


    const navigate = useNavigate()
    const queryClient = useQueryClient()


    const userLists = userList()

    


    useEffect(()=>{
      const start = () => {
        gapi.auth2.init({
          clientId: clientId
        })
      }
      gapi.load("client:auth2", start)
    }, [])

    const loginMutation = useMutation({
        mutationFn: loginReq,
        onSuccess: () => {
            queryClient.invalidateQueries("tweets")
            navigate("/")
            console.log("loginMutation success")
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const googleMutation = useMutation({
      mutationFn: googleLogin,
      onSuccess: () => {
          navigate("/")
          console.log("loginMutation success")
      },
      onError: (error) => {
          console.error(error)
      }
  })
    

  const userLogin = localStorage.getItem('user_id')


    const onSuccess = (res) => {
      console.log(res.credential)
      console.log(jwtDecode(res.credential))
      
      let email = jwtDecode(res.credential).email
      let name = jwtDecode(res.credential).name

      console.log(userLists)


      let password = prompt("Pon una contraseña")

      let data = {
        email: email,
        username: name,
        password: password
      }

      console.log(data)

      // googleMutation.mutate(data)

    }

    const onFailure = () => {
      console.log("Something went wrong")
    }


    if(loginMutation.isPending) return <Loader/>

    if (userLogin === null){
    return (
      
        <div className="">
      <div className=''>
        <div className="">
          <div >
            <h2 className="">
              Login in 

            </h2>
          </div>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values) => {
              console.log(values)
              loginMutation.mutate(values)
            }}
          >
            <Form>
              <Field id='email' name='email' placeholder='Email'
                className=""
              />

              <Field type='password' id='password' name='password' placeholder='*******' 
                className=""
              />
              <button type='submit' className="">
                Login
              </button>

            </Form>
          </Formik>

          <div className="">
            <div className="">
              <Link to={'/register'}>
                Don't have an account?
                <span className=''>
                  Sign up here!
                </span>
              </Link>

              <div>
                <GoogleLogin
                clientId={clientId}
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy={"single_host_policy"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
          }
          else{
            return(
              <div>
                Ya iniciaste sesion
                <br/>
                <NavLink className="button" to="/">
                    OK
                </NavLink>
              </div>
            )
          }
}

export default LoginPage