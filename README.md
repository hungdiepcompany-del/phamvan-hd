# PHẠM VĂN MEDIA

Website dịch vụ **PHẠM VĂN MEDIA** — quay phim, chụp ảnh và dựng video, triển khai trên Firebase Hosting + Firestore.

> *Ghi lại những khoảnh khắc đáng nhớ*

## Tính năng chính

- Giao diện cinematic responsive cho desktop, tablet và điện thoại.
- Form yêu cầu báo giá 3 bước, dự toán tự động và lưu vào Firestore.
- Trang quản trị với 3 khu vực riêng:
  - **OWNER CONTROL** — quản lý quyền Owner/Admin.
  - **DESIGN SYSTEM** — quản lý nội dung và typography theo từng vị trí độc lập.
  - **Yêu cầu khách hàng** — quản lý yêu cầu, trạng thái, chi phí và in phiếu xác nhận.
- DESIGN SYSTEM hiện có **72 vùng nội dung độc lập**; mỗi vùng có thể chỉnh text, font, cỡ desktop/mobile, weight, line-height, letter-spacing, italic và uppercase.
- Tự động phát hiện font trong `public/fonts/` khi build; không cần Firebase Storage hay Blaze.
- Firebase Authentication bằng Google cho khu vực quản trị.

## Công nghệ

- React 19
- TypeScript
- Vite
- Firebase Hosting
- Cloud Firestore
- Firebase Authentication
- Lucide React

## Chạy local

Yêu cầu Node.js 22+ và npm.

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Deploy Firebase

Trên Windows có thể chạy trực tiếp:

```text
DEPLOY.cmd
```

Hoặc PowerShell:

```powershell
./DEPLOY.ps1
```

Deploy script sẽ build trước. Nếu build thất bại thì quá trình deploy dừng lại.

Website production:

- https://phamvan-hd.web.app
- Admin: https://phamvan-hd.web.app/#admin

## Quản lý font — Spark mode

Không cần Firebase Storage/Blaze. Chép font hợp lệ mà bạn có quyền sử dụng vào:

```text
public/fonts/
```

Các định dạng được nhận diện:

```text
.ttf
.otf
.woff
.woff2
```

Khi chạy build, script:

```text
scripts/generate-font-manifest.mjs
```

tự quét thư mục và sinh:

```text
public/fonts/fonts.json
```

Sau khi deploy, font sẽ tự xuất hiện trong **Admin → DESIGN SYSTEM** với nhãn `Hosting tự động`.

> File font nhị phân không nhất thiết được lưu trong repository. Chỉ commit những font có giấy phép cho phép phân phối lại.

## Cấu trúc chính

```text
src/
  App.tsx
  main.tsx
  index.css
  r6.css
public/
  assets/
  fonts/
scripts/
  generate-font-manifest.mjs
firebase.json
firestore.rules
DEPLOY.cmd
DEPLOY.ps1
```

## Dữ liệu

- Yêu cầu khách hàng: `quoteRequests`
- Phân quyền quản trị: `admins`
- Typography: `siteSettings/typography`
- Nội dung giao diện: `siteSettings/content`
- Danh mục font URL bổ sung: `fontCatalog`

Không commit service-account key, credential hoặc secret vào repository.

## Bản quyền

© 2026 **Phạm Văn Hùng / PHẠM VĂN MEDIA**. All rights reserved.

Mã nguồn và tài sản thương hiệu trong repository này không mặc nhiên cấp quyền tái sử dụng thương mại, sao chép hoặc phân phối lại nếu chưa có sự cho phép của chủ sở hữu.
