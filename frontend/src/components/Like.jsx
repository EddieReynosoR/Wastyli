import { AiFillHeart } from 'react-icons/ai'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { like } from '../api/posts'

const Like = ({ t, user  }) => {

  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: like,
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const found = t.likes.some((key) => {
    if(key == user){
      return true
    } else {
      return false
    }
  })


  return (
    <AiFillHeart 
      onClick={() => likeMutation.mutate(t.id)}
      { ...t.iliked || found ? {color: 'red'} : {color: 'black'} }
      size={20} />
  )
}


export default Like