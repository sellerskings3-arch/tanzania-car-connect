import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUploadCarImage, useDeleteCarImage } from '@/hooks/useCars';
import { Upload, X, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { CarImage } from '@/lib/supabase';

type ImageUploadProps = {
  carId: string;
  images: CarImage[];
};

export function ImageUpload({ carId, images }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const uploadMutation = useUploadCarImage();
  const deleteMutation = useDeleteCarImage();
  const queryClient = useQueryClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        await uploadMutation.mutateAsync({ file, carId });
      }
      queryClient.invalidateQueries({ queryKey: ['car', carId] });
      queryClient.invalidateQueries({ queryKey: ['admin-cars'] });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (imageId: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    await deleteMutation.mutateAsync({ imageId, imageUrl });
    queryClient.invalidateQueries({ queryKey: ['car', carId] });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Car Images</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Images
                </>
              )}
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {images.length === 0 ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
              <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No images uploaded yet</p>
              <p className="text-sm">Click the button above to upload images</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.image_url}
                    alt="Car"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(image.id, image.image_url)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
