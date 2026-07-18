/**
 * Nén ảnh phía Client sử dụng HTML5 Canvas
 * Giúp giảm kích thước ảnh chụp từ điện thoại (thường 5MB - 10MB) xuống ~150KB - 200KB
 * trước khi upload lên Firebase Storage, tăng tốc độ tải lên gấp 30-40 lần.
 */
export function compressImage(file: File, maxWidth = 1024, quality = 0.7): Promise<File> {
  return new Promise((resolve, reject) => {
    // Nếu không phải là định dạng ảnh, bỏ qua nén
    if (!file.type.startsWith("image/")) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Tính toán tỉ lệ nén theo chiều rộng tối đa
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(file);
        }

        // Vẽ ảnh lên canvas đã thay đổi kích thước
        ctx.drawImage(img, 0, 0, width, height);

        // Chuyển canvas thành Blob định dạng JPEG với chất lượng được thiết lập
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Tạo một file mới từ Blob nén
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file); // Fallback về file gốc nếu có lỗi
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
