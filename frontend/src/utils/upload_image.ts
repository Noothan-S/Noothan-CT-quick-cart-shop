import axios from "axios";

interface UploadResponse {
  success: boolean;
  urls: string[] | null;
  error: Error | null;
}

async function uploadImageToImgBb(files: File[]): Promise<UploadResponse> {
  const uploadPromises = files.map((file) => {
    const formData = new FormData();
    formData.append("image", file);

    return axios
      .post(
        `https://api.imgbb.com/1/upload?key=4b159d954d16c4775776e8c6e880b320`,
        formData
      )
      .then((response) => response.data.data.display_url)
      .catch((error) => {
        throw error;
      });
  });

  try {
    const urls = await Promise.all(uploadPromises);
    return {
      success: true,
      urls,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      urls: null,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}

export default uploadImageToImgBb;
