import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getComments, deleteComment } from "../api/posts"
import Loader from "./Loader"
import toast from "react-hot-toast"
import AddComment from "./AddComment"
import { Link } from "react-router-dom"
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import EditComment from "./EditComment"
import { useState } from "react"

const Comments = ({ post }) => {
    const queryClient = useQueryClient()
    const [show, setShow] = useState(false)

    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => getComments(post.id)
    })

    console.log(post.id)
    console.log(data)

    const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
        queryClient.invalidateQueries("comments")
        toast.success("Comment deleted")
    },
    onError: (error) => {
        toast.error(error.message)
    }
    })


    if (isLoading) return <Loader />
    if (isError) return toast.error(error.message)

    return (

    <>
    
        <AddComment post={post}/>
        {data.map(c => (
        <div key={c.id} className="">
            <div className="">

            <img className="" src={`http://127.0.0.1:8000${c.avatar}`} />
            <div>
                <div className="">

                <p className="">
                    <Link to={`/${c.user}`}>
                    {c.user}
                    </Link>
                </p>

                <span className="">
                    @{c.user}
                </span>

                <span className="">
                    {new Date(c.created_at).toDateString().slice(4)}
                </span>

                </div>

                <div className="">
                {c.body}
                </div>

                <div className=''>
                <div 
                    className="">
                    <BsFillTrashFill  
                    onClick={() => deleteCommentMutation.mutate(c.id)}
                    size={20} />
                </div>

                <div className="">
                    <AiFillEdit 
                    onClick={() => setShow(true)}
                        size={25} />
                    {show && <EditComment c={c} close={() => setShow(false)} />}
                </div>
                </div> 

            </div>
            </div>
        </div>
        ))}
    </>

    )
}

export default Comments