import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarImage } from '~/components/shadcn-ui/avatar'

// Route that serves html for "Home" component.
export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
})

function PostComponent() {
  const { postId } = Route.useParams()

  const post = {
    content: 'Wow, I thought that was the case!',
    author: '@damien',
    authorAvatar: 'https://github.com/gglover.png',
    timestamp: new Date(),
  }

  return (
    <div className="flex w-[400px] gap-4 rounded-md border-2 border-b-gray-500 bg-gray-900 p-4">
      <Avatar>
        <AvatarImage src={post.authorAvatar} />
      </Avatar>
      <div>
        <p className="text-sm text-gray-300">{post.author}</p>
        <p className="text-white">{post.content}</p>
      </div>
    </div>
  )
}
