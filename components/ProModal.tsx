'use client'

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useProModal } from "@/hooks/useProModal"

export default function ProModal() {
  const proModel = useProModal()
  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                <div className="flex items-center gap-x-2 font-bold py-1">
                  Upgrade to Genius
                  <Badge className="uppercase text-sm py-1" variant='premium'>pro</Badge>
                </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
