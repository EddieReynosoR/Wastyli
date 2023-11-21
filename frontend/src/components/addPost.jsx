import { addPost } from "../api/posts"
import { useFormik } from "formik" 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import { useState } from "react";


const AddPost = () => {

    const queryClient = useQueryClient()

    const avatar = localStorage.getItem("avatar")

    const addPostMutation = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            queryClient.invalidateQueries('posts')
            toast.success('Post added')
        },
        onError: () => {
            toast.error('Something went wrong')
        }
    })


    const formik = useFormik({
        initialValues: {
            content:'',
            image: '',
        },
        onSubmit: (values, { resetForm }) => {
            const {content, image} = values
            const formData = new FormData()

            formData.append('content', content)
            if(image){
                formData.append('image', image)
            }
            addPostMutation.mutate(formData)
            resetForm({values: initialValues})
        }
    })

    if(addPostMutation.isLoading) return <Loader/>


    return (
        <div
      className="">
      <form onSubmit={formik.handleSubmit} >
        <div className=''>

          <img src={`http://127.0.0.1:8000${avatar}`} className='' />

          <input 
            type="text" name="content" onChange={formik.handleChange} value={formik.values.content} 
            className='' placeholder="Comparte tu aporte..." />

        </div>

        <div className=''>

            <div>
              <label htmlFor="file-input">

                {!formik.values.image && 

                  <p>No imagen</p>
                }

              </label>

              <input 
                className="hidden"
                type="file" name="image" onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} 
                id="file-input"/>

          </div>

        </div>

        <div className="">

          {formik.values.image && <SeeImage file={formik.values.image} />}

        </div>

        <div className="">

          <button type='submit' className="">
            Publicar
          </button>

        </div>
      </form>

    </div>
    )
}

export default AddPost


const SeeImage = ({ file }) => {

    const [preview, setPreview] = useState({});
  
    if(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result)
      };
  
      const handleClose = () => {
        setPreview('')
      }
  
      return (
        <div className="">
  
          <div className="">
            <button className="" onClick={handleClose}>
                Quitar
            </button>
  
          </div>
  
          <img src={preview} width={350} height={350}  />
        </div>
      )
    }
  }