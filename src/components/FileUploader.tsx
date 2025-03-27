
import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  accept?: string;
  className?: string;
}

const FileUploader = ({ 
  onFileUpload, 
  accept = ".mp3,audio/*", 
  className 
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndUpload(files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndUpload(files[0]);
    }
  };
  
  const validateAndUpload = (file: File) => {
    // Validate file type
    const fileType = file.type;
    if (!fileType.includes('audio')) {
      toast.error("Please upload an audio file");
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File is too large, please upload a file smaller than 10MB");
      return;
    }
    
    onFileUpload(file);
    toast.success(`Uploaded ${file.name}`);
  };
  
  return (
    <div 
      className={`${className} ${
        isDragging 
          ? "border-spotify border-dashed bg-spotify/5" 
          : "border-spotify-light border-dashed hover:border-spotify hover:bg-spotify/5"
      } border-2 rounded-lg p-4 text-center transition-all duration-200 cursor-pointer`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
        <Upload className="text-spotify mb-2" size={24} />
        <p className="text-sm text-spotify-white mb-1">
          Drag & drop your song here
        </p>
        <p className="text-xs text-spotify-text">
          or click to browse (MP3, max 10MB)
        </p>
      </label>
    </div>
  );
};

export default FileUploader;
