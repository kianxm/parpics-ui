import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadImage = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = url.split("/").pop() || "image";
  saveAs(blob, filename);
};

export const downloadAllImages = async (urls: string[]) => {
  const zip = new JSZip();

  await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split("/").pop() || "image";
      zip.file(filename, blob);
    })
  );

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, ".zip");
  });
};
