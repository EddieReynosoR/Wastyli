import {
    AiOutlineMessage,
    AiFillEdit
  } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { getUserPosts, editPost, deletePost } from "../api/posts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "./Loader";
// import EditPost from "./EditPost";
import { useState } from "react";
import Like from "./Like";
import EditPost from "./EditPost";


  
  const MyPosts = ({ user, myUser, posts }) => {
  
    const queryClient = useQueryClient()
    const [isEditing, setIsEditing] = useState(false)
    const userId = localStorage.getItem('user_id')
    //console.log(posts)
  
    const deletePostMutation = useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
        queryClient.invalidateQueries(["posts", user.username])
        toast.success("Se borro el post")
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", user.username],
    queryFn: () => getUserPosts(user.username),
    })
  
      console.log(data, user)
  
    if(deletePostMutation.isLoading) return <Loader/>
    if (isLoading) return <Loader/>
    if (isError) return toast.error(error.message)
  
    return (
      <>
      {data.map && data.map(t => (
    <div key={t.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3">
  
        <img className="h-11 w-11 rounded-full" src={`http://127.0.0.1:8000${t.avatar}`} />
  
  
        <div>
          <div className="flex flex-row items-center gap-2">
  
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {t.user}
            </p>
  
  
            <span className="text-neutral-500 text-sm">
              {new Date(t.created_at).toDateString().slice(4)}
            </span>
  
          </div>
  
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{t.user}
            </span>
  
          <div className="text-white mt-1 text-start">
            {t.content}
          </div>
  
            <img src={`http://127.0.0.1:8000${t.image}`}/>
  
          <div className="flex flex-row items-center mt-3 gap-10">
  
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              
              <p>{t.parent}</p>
            </div>
  
            
  
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
              <Like t={t} user={userId} />
              <p>
                {t.likes_count}
              </p>
            </div>
  
            {myUser === user.username && (
              <>
                <div 
                  className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                  <BsFillTrashFill  
                          onClick={() => deletePostMutation.mutate(t.id)}
                          size={20} />
                </div>
  
                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-yellow-300">
                    <AiFillEdit 
                          onClick={() => setIsEditing(true)}
                          size={25} />
                </div>
  
        {isEditing && (
        <EditPost post={t} close={() => setIsEditing(false)} />
          )}
              </> 
            )}
          </div>
        </div>
      </div>
    </div>
  
      ))}
      </>
    )
  }
  
  export default MyPosts