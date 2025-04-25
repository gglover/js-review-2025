import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Avatar, AvatarImage } from '~/components/shadcn-ui/avatar'
import { Button } from '~/components/shadcn-ui/button'

// Route that serves html for "Home" component.
export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
})

function PostComponent() {
  const { postId } = Route.useParams()

  const post = {
    id: 'fjDFjqwen',
    content:
      'Wow, I thought that was the case! Here we have a big ass post. Very long.',
    author: '@damien',
    authorAvatar: 'https://github.com/gglover.png',
    timestamp: new Date(),
  }

  const formattedPostTime = post.timestamp.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={post.authorAvatar} />
        </Avatar>
        <p className="text-gray-30 flex-grow text-lg hover:underline">
          {post.author}
        </p>
        <Button>
          <Plus />
          Follow
        </Button>
      </div>
      <p>{post.content}</p>
      <p className="text-xs text-gray-500">{formattedPostTime}</p>
    </div>
  )
}
