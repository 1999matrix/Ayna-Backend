"use client"

import { useUser } from "@clerk/nextjs"
import { useAppStore } from "../../store/store"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import toast from 'react-hot-toast';



function RenameModal() {

    const { user } = useUser()
    const [input, setInput] = useState("")

    const [
        isRenameModalOpen, 
        setIsRenameModalOpen, 
        filename,
        fileId,
      ] = useAppStore(state => [
          state.isRenameModalOpen,
          state.setIsRenameModalOpen,
          state.filename,
          state.fileId,
        ])


    const renameFile = async () => {
        if (!user || !fileId) return; 

        const toastId = toast.loading("Renaming...")

        try {
            await updateDoc(doc(db, "users", user.id, "files", fileId), {
                filename: input,
            });
            toast.success("Renamed Successfully", {
                id: toastId,
            })
        } catch (error) {
            console.log(error)
            toast.error("Rename error!", {
                id: toastId,
            })
        }

        

        

        setInput("")
        setIsRenameModalOpen(false)
    }

  return (
    <Dialog
        open={isRenameModalOpen}
        onOpenChange={(isOpen) => {
            setIsRenameModalOpen(isOpen)
        }}
    >
    <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the file</DialogTitle>

          <Input 
            id="Link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                    renameFile();
                }
            }}
          /> 
        </DialogHeader>
        
        <div className="flex justify-end space-x-2 py-3">
            <Button
                    size="sm"
                    className="px-3"
                    variant={"ghost"}
                    onClick={() => {setIsRenameModalOpen(false)}}
                >
                <span className="sr-only">Cancel</span>
                <span>Cancel</span>
            </Button>

            <Button
                    type="submit"
                    size="sm"
                    className="px-3"
                    onClick={() => renameFile()}
                >
                <span className="sr-only">Rename</span>
                <span>Rename</span>
            </Button>
        </div>
    </DialogContent>
    </Dialog>
  )
}

export default RenameModal