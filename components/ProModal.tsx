'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useProModal } from "@/hooks/useProModal"

export default function ProModal() {
  const proModel = useProModal()
  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center">
              Upgrade to Genius
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
