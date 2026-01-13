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
  // Use a more robust way to get env vars that works in all Next.js environments
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    console.error("Cloudinary Configuration Missing:", { cloudName, uploadPreset });
    return {
      secure_url: "",
      public_id: "",
      width: 0,
      height: 0,
      format: "",
      error: "Cloudinary configuration is missing. Please check your .env file."
    };
  }

  const formData = new FormData();
  // Important: append upload_preset BEFORE the file in some environments
  formData.append("upload_preset", uploadPreset);
  formData.append("file", file);
  // Optional: only append folder if it doesn't cause issues with unsigned uploads
  // formData.append("folder", "platinum-tickets/events");
  
  console.log("Cloudinary Upload Attempt:", {
    cloudName,
    uploadPreset,
    fileName: file.name,
    fileType: file.type
  });
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Cloudinary Error Response:", data);
      throw new Error(data.error?.message || `Upload failed: ${response.statusText}`);
    }
    
    
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
