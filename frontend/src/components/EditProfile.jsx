import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import { updateProfile } from "../api/users"
import toast from "react-hot-toast"

import {AiOutlineCloseCircle} from "react-icons/ai";

const EditProfile = ({user, close}) => {

    const queryClient = useQueryClient()

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user', user.username]})
            toast.success('Perfil actualizado')
            close()
        },
        onError: (error) => {
            toast.error(error.message)
            close()
        }
    })


    const formik = useFormik({
        initialValues: {
            name: user.name,
            bio: user.bio,
            avatar: user.avatar,
        },
        onSubmit: (values) => {
            const { name, bio, avatar } = values
            const formData = new FormData()

                formData.append('name', name)
                formData.append('bio', bio)         


                if(avatar !== formik.initialValues.avatar)
                {
                    formData.append('avatar', avatar)
                }

            updateProfileMutation.mutate(formData)
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
                    Edit Profile
                    </h2>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <input 
                    id='bio' name='bio'
                    onChange={formik.handleChange} value={formik.values.bio}
                    placeholder='About you'
                    className=""
                    />

                    <input placeholder='Your Name'
                    id='name' name='name'
                    onChange={formik.handleChange} value={formik.values.name}
                    className=""
                    />

                    <input 
                    className=""
                    type="file" name="avatar" onChange={(event) => formik.setFieldValue("avatar", event.currentTarget.files[0])} 
                    />

                    

                    <button type='submit' className="">
                    Save Changes
                    </button>

                </form>

                <div className="">
                    <div className="">
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default EditProfile