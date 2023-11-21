import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useFormik } from "formik";
import { editPost } from "../api/posts";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";

const EditPost = ({ post, close }) => {

  const queryClient = useQueryClient()

  const editPostMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts']})
      toast.success('Post updated')
      close()
    }, 
    onError: (error) => {
      toast.error(error.message)
      close()
    }
  })

  const formik = useFormik({
    initialValues: {
      content: post.content,
      image: post.image,
    },
    onSubmit: (values) => {
      const { content, image } = values
      const formData = new FormData()
      formData.append('content', content)
      formData.append('id', post.id)
      if(image !== formik.initialValues.image) {
        formData.append('image', image)
      }
      editPostMutation.mutate(formData)
    },
  })

  return (

    <div className="">
      <div className="">

        <button onClick={close}>
          <AiOutlineCloseCircle className="" />
        </button>

        <div className="">
          <div className=''>
            <div className="">

              <div >
                <h2 className="">
                  Edit Post
                </h2>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <input 
                  id='content' name='content'
                  onChange={formik.handleChange} value={formik.values.content}
                  placeholder='Content'
                  className=""
                />

                <input 
                  className=""
                  type="file" name="image" onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} 
                />

                <button type='submit' className="">
                  Save Changes
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EditPost