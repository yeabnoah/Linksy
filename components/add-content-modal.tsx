"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Twitter, Video, FileText, LinkIcon, Hash } from 'lucide-react'

interface AddContentModalProps {
  isOpen: boolean
  onClose: () => void
}

const contentTypes = [
  { value: "tweet", label: "Tweet", icon: <Twitter className="w-4 h-4" /> },
  { value: "video", label: "Video", icon: <Video className="w-4 h-4" /> },
  { value: "document", label: "Document", icon: <FileText className="w-4 h-4" /> },
  { value: "link", label: "Link", icon: <LinkIcon className="w-4 h-4" /> },
  { value: "tag", label: "Tag", icon: <Hash className="w-4 h-4" /> },
]

export function AddContentModal({ isOpen, onClose }: AddContentModalProps) {
  const [contentType, setContentType] = useState<string>("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [link, setLink] = useState("")
  const [tags, setTags] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ contentType, title, content, link, tags: tags.split(",").map(tag => tag.trim()) })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">Add Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="type" className="text-sm font-medium">
              Content Type
            </Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem 
                    key={type.value} 
                    value={type.value}
                    className="font-medium"
                  >
                    <div className="flex items-center gap-2">
                      {type.icon}
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="content" className="text-sm font-medium">
              Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content"
              className="min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="link" className="text-sm font-medium">
              Link
            </Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://"
              type="url"
              className="w-full"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="tags" className="text-sm font-medium">
              Tags
            </Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas"
              className="w-full"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
          >
            Add Content
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

