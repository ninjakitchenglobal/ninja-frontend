import { supabase } from '../supabaseClient';

/**
 * Uploads a file to a public Supabase storage bucket and returns the public URL.
 * @param {File} file - The file object from an input field.
 * @param {string} bucket - The name of your public bucket (e.g., 'avatars').
 * @returns {Promise<string|null>} - The public URL of the uploaded image or null on error.
 */
export const uploadAndGetPublicUrl = async (file: File, bucket = 'ninja-img') => {
  try {
    // 1. Create a unique file path (e.g., "1715839200000-my-image.png")
    // This prevents overwriting files with the same name.
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    // 2. Upload the file
    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // 3. Get the Public URL
    // Since the bucket is public, this does not require a network request/await
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error: any) {
    console.error('Error uploading image:', error.message);
    return null;
  }
};
