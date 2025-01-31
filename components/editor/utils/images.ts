type ImageUploadEvent = DragEvent & { target: { files?: FileList } | null };

const resize = (source: string): Promise<{ src: string; height: number; width: number }> => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const max = { width: 600, height: 600 };

  if (!context) {
    throw new Error("Couldn't create context");
  }

  const image = new Image();
  image.src = source;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const ratio = {
        width: max.width / image.width,
        height: max.height / image.height,
      };

      const scale = Math.min(ratio.width, ratio.height, 1);
      const width = Math.round(image.width * scale);
      const height = Math.round(image.height * scale);

      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);

      const src = canvas.toDataURL("image/webp", 0.75);
      resolve({ src, height, width });
    };

    image.onerror = reject;
  });
};

export async function uploadImage(this: any, e: ImageUploadEvent) {
  const files = [
    ...(e.dataTransfer ? e.dataTransfer.files : e.target?.files ?? []),
  ].filter(({ type }) => type.includes("image"));

  if (!files.length) {
    return;
  }

  const mimeTypeMatcher = /^(.+)\/(.+)$/;
  const promises = files.map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const match = mimeTypeMatcher.exec(file.type);
        const name = file.name;
        const type = match ? match[1] : file.type;
        const result = reader.result;

        if (!result) {
          resolve({});
          return;
        }

        const resized = type === "image" ? await resize(result.toString()) : {};

        const data = {
          name,
          type,
          src: result,
          ...resized,
        };

        resolve(data);
      };

      reader.onerror = (error) => reject(error);
      reader.onabort = () => reject("aborted");
      reader.readAsDataURL(file);
    });
  });

  return Promise.all(promises).then(
    (data) => this.onUploadResponse({ data }),
    (error) => this.onUploadError(error)
  );
}
