# 🏥 MediBook Pro - نظام الحجز الطبي المتكامل

منصة حجز واستشارات طبية عربية جاهزة للعمل محليا وعلى Render.

## ✨ المميزات

- خرائط تفاعلية مع أيقونات مخصصة لكل نوع خدمة.
- حجز مواعيد دكتور وعيادة وصيدلية ومراجعة التوافر والوقت.
- صفحة عرض تفاصيل العيادة مع روابط التواصل الاجتماعي.
- إدارة بيانات المرضى وسجلهم الطبي.
- صلاحيات متعددة: سوبر يوزر طبيب مريض.
- واجهة متجاوبة للحاسوب والهاتف.
- نظام مرن يمكن العيادات من تعديل الصور والخلفيات والإعلانات.

## 🧩 هيكل المشروع

- `backend/`: خادم Node.js + Express + MongoDB
- `frontend/`: واجهة React + Leaflet
- `render.yaml`: إعداد نشر جاهز لـ Render
- `.env.example`: إعدادات متغيرات البيئة العامة
- `frontend/.env.example`: إعدادات واجهة React

## 📋 المتطلبات

- Node.js (v18 أو أحدث)
- MongoDB أو MongoDB Atlas
- npm أو yarn

## 🔧 التشغيل محليا

### 1. إعداد backend
```powershell
cd C:\Users\alila\MediBook-Pro\backend
npm install
copy ..\.env.example .env
```

### 2. تحرير متغيرات البيئة في `backend/.env`
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/medibook?retryWrites=true&w=majority
JWT_SECRET=ChangeThisSecret
CLIENT_URL=http://localhost:5173
```

### 3. تشغيل backend
```powershell
npm run dev
```

### 4. إعداد frontend
```powershell
cd ..\frontend
npm install
copy .env.example .env
```

### 5. تشغيل frontend
```powershell
npm run dev
```

### 6. فتح الموقع
افتح `http://localhost:5173`

## 🧪 بيانات تجريبية
لتوليد بيانات جاهزة للتجربة:
```powershell
cd C:\Users\alila\MediBook-Pro\backend
npm run seed
```

## ☁️ النشر على Render

### إعداد خدمة backend
- Environment: `Node`
- Branch: `main`
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance Type: `Free`

### إعداد خدمة frontend
- Type: `Static Site`
- Branch: `main`
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

### متغيرات البيئة اللازمة
#### backend
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL` = رابط الواجهة بعد نشرها

#### frontend
- `VITE_API_BASE_URL` = `https://<YOUR_BACKEND_SERVICE>.onrender.com/api`

## 📌 ملاحظات

- `render.yaml` معد الآن للعمل مع `backend` و `frontend` من مجلدات منفصلة.
- تأكد من ضبط `Root Directory` لكل خدمة في Render.
- بعد نشر الـ backend ضع رابط الخدمة في `VITE_API_BASE_URL` للواجهة.
- إذا تغير رابط backend حدث قيمة `VITE_API_BASE_URL` وأعد نشر الواجهة.
