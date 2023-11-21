import { useMutation} from "@tanstack/react-query"
import { registerReq, googleLogin } from "../api/users"
import { Formik, Field, Form} from "formik"
import { Link, useLocation, useNavigate} from "react-router-dom"
import Loader from "../components/Loader"

const Register = () => {

    const navigate = useNavigate()

    const registerMutation = useMutation({
        mutationFn: registerReq,
        onSuccess: () => {
            navigate("/")
            console.log("registerMutation success")
        },
        onError: (error) => {
            console.error(error)
        }
    })


    if(registerMutation.isPending) return <Loader/>
    return(
        <div className="">
      <div className=''>
        <div className="">
          <div >
            <h2 className="">
              Register in Wastyli

            </h2>
          </div>
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
            }}
            onSubmit={(values) => {
              registerMutation.mutate(values)
            }}
          >
            <Form>
              <Field id='email' name='email' placeholder='Email'
                className=""
              />

            <Field id='username' name='username' placeholder='Username'
                className=""
              />

              <Field type='password' id='password' name='password' placeholder='*******' 
                className=""
              />
              <button type='submit' className="">
                Register
              </button>

            </Form>
          </Formik>

          <div className="">
            <div className="">
              <Link to={'/login'}>
                Have an account?
                <span className=''>
                  Sign in here!
                </span>
              </Link>

              
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Register