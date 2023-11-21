import { Link, useParams } from "react-router-dom"
import {
    AiOutlineArrowLeft,
    AiOutlineCloseCircle
  } from "react-icons/ai";

  import { IoMdCalendar } from "react-icons/io";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { userProfile } from "../api/users"
import Loader from "../components/Loader"
import MyPosts from '../components/myPosts';
import { getUserPosts } from "../api/posts";
import { useState } from "react";
import EditProfile from "../components/EditProfile";

const UserProfile = () => {

    const { username } = useParams()
    const myUser = localStorage.getItem('username')

    const [isEditing, setIsEditing] = useState(false)

    const {data:user, isLoading: loadingUser, isError: isErrorUser, error: errorUser } = useQuery({
        queryKey: ['user', username],
        queryFn: () => userProfile(username),
    })

    const { data: posts, isLoading: loadingPosts, isError: isErrorPosts, error: errorPosts } = useQuery({
        queryFn: () => getUserPosts(username),
        queryKey: ['user_posts']
      })

    if (loadingUser) return <Loader/>
    if (isErrorUser) return <div>Error: {errorUser.message}</div>

    if (loadingUser ) return <Loader/>
    if (isErrorUser ) return toast.error('Error')

    return (
        <>
                {isEditing && (
            <EditProfile user={user} close={() => setIsEditing(false)} />
                )}
            <div className="border-b-[1px] border-neutral-800 p-5">
                <div className="flex flex-row items-start gap-3">
                <div>

                    <div className="flex flex-row items-center gap-2">
                    <Link to={'/'}>
                        <AiOutlineArrowLeft
                        size={20}
                        className="mr-4 hover:text-slate-200 text-slate-500 cursor-pointer"
                        />
                    </Link>
                    <p className="text-white font-semibold text-xl">
                        {user.username}
                    </p>

                    <p className="text-white font-semibold text-xl">
                        {user.bio}
                    </p>
                    </div>
                </div>
                </div>
            </div>

            <img
          src={user.avatar}
          className="w-40 h-40 ml-3 object-cover border-8 border-black -mt-20 shadow-2xl rounded-full" />

            <div>

            {myUser === username ? (

            <button 
                onClick={() => setIsEditing(true)}
                className="">
                Edit 
            </button>

            ) : (

                <>
                
                </>

            )}

            </div>

            <p className="text-start ml-4 mt-4 text-xl font-bold ">
        {user.name}
      </p>

      <div className="text-white text-start ml-4">

        <span className="text-neutral-500 hidden md:block">
          @{user.username}
        </span>

        <div className="flex gap-3 w-full p-2 text-neutral-500 ">
          <IoMdCalendar className="mt-1 mb-3" size={20} />
          Joined {' '}
          {new Date(user.date_joined).toDateString().slice(4)}
        </div>

        </div>

            <MyPosts user={user} posts={posts} myUser={myUser}/>
        </>
        
    )
}

export default UserProfile