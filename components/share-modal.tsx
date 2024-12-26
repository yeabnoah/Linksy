"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Copy } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  itemCount: number
}

export function ShareModal({ isOpen, onClose, itemCount }: ShareModalProps) {
  const [isSharing, setIsSharing] = useState(true)
  const [isCopied, setIsCopied] = useState(false)

  const handleStopSharing = () => {
    setIsSharing(false)
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText("https://secondbrain.app/share/xyz")
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 animate-in">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">
                Share Your Second Brain
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Share your entire collection of notes, documents, tweets and videos with others. 
                They&apos;ll be able to import your content into their own Second Brain.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {isSharing && (
            <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
              Some Contents are being shared
            </div>
          )}
          
          <div className="flex gap-3">
            <Button 
              variant="destructive" 
              className="flex-1 font-medium"
              onClick={handleStopSharing}
            >
              Stop Sharing
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 font-medium"
              onClick={handleCopyLink}
            >
              <Copy className="w-4 h-4 mr-2" />
              {isCopied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} will be shared
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

