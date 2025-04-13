import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { ImagePlus, X, Camera, Image } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PropertyPhotosProps {
  form: UseFormReturn<any>;
}

interface PropertyPhotosErrors {
  photos?: { message?: string };
}

export function PropertyPhotos({ form }: PropertyPhotosProps) {
  const { register, setValue, watch, formState: { errors } } = form;
  const photosErrors = (errors.propertyPhotos || {}) as PropertyPhotosErrors;
  
  // Mock photos for demo purposes
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"
  ]);
  
  // In a real implementation, this would upload to a server
  const handleAddPhoto = () => {
    // Mock adding a new photo
    const newPhoto = "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80";
    const updatedPhotos = [...photos, newPhoto];
    
    setPhotos(updatedPhotos);
    setValue("propertyPhotos.photos", updatedPhotos, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };
  
  // Remove a photo by index
  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    
    setPhotos(updatedPhotos);
    setValue("propertyPhotos.photos", updatedPhotos, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Property Photos</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Add photos to showcase your property to interested individuals.
        </p>
      </div>

      <div className="space-y-6">
        {/* Photo upload area */}
        <div 
          className="border-2 border-dashed rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
          onClick={handleAddPhoto}
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
            <ImagePlus className="h-8 w-8 text-primary/80" />
          </div>
          
          <h3 className="text-lg font-medium mb-2">Add Photos</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your photos here or click to browse your files
          </p>
          
          <div className="flex justify-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <Camera className="mr-2 h-4 w-4" />
              Upload Photos
            </button>
          </div>
          
          <input
            type="file"
            multiple
            accept="image/*"
            className="sr-only"
            onChange={() => {}} // In a real implementation, would handle file upload
          />
          
          <p className="text-xs text-muted-foreground mt-4">
            Recommended format: JPG, PNG. Maximum size: 5 MB per image.
          </p>
        </div>
        
        {/* Display uploaded photos */}
        {photos.length > 0 && (
          <div className="space-y-4 mt-8">
            <h3 className="text-lg font-medium">Uploaded Photos ({photos.length})</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="group relative aspect-square rounded-md overflow-hidden border">
                  <img 
                    src={photo}
                    alt={`Property photo ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePhoto(index);
                    }}
                    className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2">
                      Main Photo
                    </div>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={handleAddPhoto}
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-md aspect-square hover:border-gray-400 transition-colors"
              >
                <Image className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-600">Add</span>
              </button>
            </div>
            
            {photosErrors.photos && (
              <p className="text-sm text-red-500 mt-2">
                {photosErrors.photos.message}
              </p>
            )}
            
            <p className="text-sm text-muted-foreground mt-2">
              You can add up to 25 photos. The first photo will be the main image.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 