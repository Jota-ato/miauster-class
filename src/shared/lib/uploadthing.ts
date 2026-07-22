import { OurFileRouter } from "@/app/api/uploadthing/core"
import { generateUploadDropzone, generateReactHelpers } from "@uploadthing/react"

export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
export const { uploadFiles } = generateReactHelpers<OurFileRouter>()