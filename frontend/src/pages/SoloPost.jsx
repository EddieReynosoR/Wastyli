import { getSoloPost } from '../api/posts';
import { Link, useParams } from 'react-router-dom';
import { useQuery} from '@tanstack/react-query'
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import Like from '../components/Like';
import Comments from '../components/Comments';


const SoloPost = () => {
    const { id } = useParams()

    const { data: post , isLoading, isError, error } = useQuery({
        queryKey: ['soloPost', id], 
        queryFn: () => getSoloPost(id)
    })
  
    if(isLoading) return <Loader/>
    if(isError) return toast.error(error.message)
  
    return (
  
  <>
          <div className="">
            <div className="">
  
              <img className="" src={`http://127.0.0.1:8000${post.avatar}`} />
              <div>
                <div className="">
  
                  <p className="">
                    <Link to={`${post.user}`}>
                    {post.user}
                    </Link>
                  </p>
  
                  <span className="">
                    @{post.user}
                  </span>
  
                  <span className="">
            {new Date(post.created_at).toDateString().slice(4)}
                  </span>
  
                </div>
  
                <div className="">
                  {post.content}
                </div>
  
                  <img src={post.image} />
  
                <div className="">
                  <div className="">
             
  
                  </div>
  
                  
  
  
                  <div className="">
  
                    <Like t={post}/>
                    <p>
                      {post.likes_count}
                    </p>
                  </div>
  
  
                </div>
              </div>
  
            </div>
          </div>
  
        <Comments post={post}/>

    </>
    )
}

export default SoloPost