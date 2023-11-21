import { getPosts } from "../api/posts"
import { Link } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from "react"
import Loader from '../components/Loader'
import { toast } from 'react-hot-toast'
import AddPost from "../components/addPost"
import Like from "../components/Like"
// import {Like} from "../components/Like";

import './css/feed.css'

const Feed = () => {

    const { ref, inView } = useInView()

    const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        getNextPageParam: (lastPage) => lastPage.nextPageCursor
        
    })

    useEffect(()=>{
        if(inView){
            fetchNextPage()
        }
    }, [inView])

    if (isLoading) return <Loader/>

    if (isError) return toast.error(error.message)

    return(
        <div className="feed">
            <div>
                <div>

                    <div>
                        <div>
                            <p>
                                Home
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {data?.pages.map(page => (

                <div key={page.meta.page}>

                {page.data.map(t => (

                    <>
                    <div key={t.id} className="">
                        <div className="">

                        <img className="" src={`http://127.0.0.1:8000${t.avatar}`} />

                        <div>
                            <div className="">

                            <p className="">
                                <Link to={`${t.user}`}>
                                {t.user}
                                </Link>
                            </p>

                            <span className="">
                                @{t.user}
                            </span>

                            <span className="">
                                {new Date(t.created_at).toDateString().slice(4)}
                            </span>

                            </div>

                    <Link to={`post/${t.id}`}>

                            <div className="">
                            {t.content}
                            </div>
                                </Link>

                            <img src={t.image} />

                            <div className="">
                            <div className="">

                    <Link to={`post/${t.id}`}>

                                
                                </Link>

                                <p>
                                {t.parent}
                                </p>

                            </div>

                            


                            <div className="">

                                <Like t={t}/> 

                                <p>
                                {t.likes_count}
                                </p>
                            </div>


                            </div>
                        </div>

                        </div>
                    </div>

                        {!isLoading && data.pages.length === 0 && <p>No results</p>}
                        {!isLoading && data.pages.length  > 0 && hasNextPage && (
                        <div ref={ref} >
                            {isLoading || isFetchingNextPage ? <Loader/> : null}
                        </div>
                        )}
                    </>

                ))}
                </div>
                ))}
        </div>
    )
}

export default Feed