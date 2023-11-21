import { addComment } from "../api/posts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Loader from "./Loader"
import { useFormik } from "formik";

const AddComment = ({ post }) => {

  const queryClient = useQueryClient()
  const avatar = localStorage.getItem('avatar')

  const addCommmentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries('comments')
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const iniV = () => ({
    body: ''
  })

  const formik = useFormik({

    initialValues: iniV(),

    onSubmit: (values, { resetForm }) => {

      addCommmentMutation.mutate({ ...values, id: post.id })

      resetForm()
    }
  })

  if (addCommmentMutation.isLoading) return <Loader />

  return (
    <div
      className="">

      <form onSubmit={formik.handleSubmit} >
        <div className=''>

          <img src={`http://127.0.0.1:8000${avatar}`} className='' />

          <input 
            type="text" name="body" onChange={formik.handleChange} value={formik.values.body} 
            className='' placeholder="Add a reply..." />


        </div>

        <div className="">

          <button type='submit' className="">
            Reply
          </button>

        </div>
      </form>

    </div>

  )
}

export default AddComment