import { editComment } from "../api/posts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Formik, Field, Form } from 'formik'

const EditComment = ({ c, close }) => {

  const queryClient = useQueryClient()

  const editCommentMutation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries("comments")
      toast.success("Comment edited")
      close()
    },
    onError: (error) => {
      toast.error(error.message)
      close()
    }
  })

  return (

    <div className="">
      <div className="">
        <p className="">Edit Comment</p>

        <Formik
          initialValues={{
            body: c.body,
          }}
          onSubmit={(values) => {
            editCommentMutation.mutate({ id: c.id, body: values.body, post: c.post})}}
        >
          <Form>
            <Field name='body' id='body' className="" />

            <button type='submit'className="">
              Edit
            </button>
          </Form>
        </Formik>
      </div>
    </div>

  )
}

export default EditComment
