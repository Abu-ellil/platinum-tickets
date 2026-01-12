// Cloudinary unsigned upload utility
// Configure these in your .env.local file:
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
// NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default";

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  error?: string;
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "platinum-tickets/events");
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      secure_url: "",
      public_id: "",
      width: 0,
      height: 0,
      format: "",
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

// Helper to generate optimized URL
export function getOptimizedImageUrl(publicId: string, width: number = 800): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},c_fill,q_auto,f_auto/${publicId}`;
}
