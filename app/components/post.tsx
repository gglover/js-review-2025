import { Link, useNavigate } from '@tanstack/react-router'
import { Heart } from 'lucide-react'
import { Avatar, AvatarImage } from '~/components/shadcn-ui/avatar'
import { Button } from './shadcn-ui/button'

export function Post() {
  const navigate = useNavigate()

  const post = {
    id: 'fjDFjqwen',
    content: 'Wow, I thought that was the case!',
    author: '@damien',
    authorAvatar: 'https://github.com/gglover.png',
    likeCount: 1023,
    commentCount: 34,
    timestamp: new Date(),
  }

  const handlePostClick = (event) => {
    navigate({ to: `/posts/${post.id}` })
  }

  return (
    <div
      onClick={handlePostClick}
      className="flex w-[500px] cursor-pointer gap-4 rounded-md border-1 border-b-gray-200 p-4 hover:bg-gray-100"
    >
      <Link onClick={(e) => e.stopPropagation()} to={`/profile/${post.author}`}>
        <Avatar>
          <AvatarImage src={post.authorAvatar} />
        </Avatar>
      </Link>
      <div>
        <Link
          onClick={(e) => e.stopPropagation()}
          to={`/profile/${post.author}`}
        >
          <p className="text-gray-30 text-sm hover:underline">{post.author}</p>
        </Link>
        <p>{post.content}</p>
        <div>
          <Button size="sm" variant="outline">
            <Heart size={5} />
          </Button>
        </div>
      </div>
    </div>
  )
}
