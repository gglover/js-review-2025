import { DialogTrigger } from '@radix-ui/react-dialog'
import { PenBoxIcon } from 'lucide-react'
import { ChangeEventHandler, useState } from 'react'
import { cn } from '~/lib/utils'
import { Avatar, AvatarImage } from './shadcn-ui/avatar'
import { Button } from './shadcn-ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './shadcn-ui/dialog'
import { Textarea } from './shadcn-ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './shadcn-ui/tooltip'

export function CreatePostButton() {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState('')
  const isContentTooLong = content.length >= 300

  const handlePostContentChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const nextValue = event.currentTarget.value
    setContent(event.currentTarget.value)
  }

  const handleOpenStateChange = (open: boolean) => {
    setOpen(open)
    setContent('')
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenStateChange}>
      <DialogTrigger>
        <Button>
          <PenBoxIcon />
          New Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={'https://github.com/gglover.png'} />
          </Avatar>
          <div className="flex-grow">
            <Textarea
              className="break-all"
              onChange={handlePostContentChange}
              placeholder="What's on your mind?"
            ></Textarea>
            <div className="mt-2 flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p
                      className={cn(
                        'text-xs text-gray-400',
                        isContentTooLong && 'font-bold text-red-400',
                      )}
                    >
                      {300 - content.length}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      Posts must be 300 characters or less.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex-grow" />
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button
                disabled={content.length === 0 || isContentTooLong}
                type="submit"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
