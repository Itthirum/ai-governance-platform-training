# AI Governance Analysis & Assessment Platform

ระบบวิเคราะห์และประเมินธรรมาภิบาลปัญญาประดิษฐ์ตามกรอบ ETDA AIGC, ISO/IEC 42001 และร่าง พ.ร.บ. ปัญญาประดิษฐ์

## เริ่มใช้งานผ่าน GitHub Codespaces (ไม่ต้องติดตั้งโปรแกรม)

1. คลิกปุ่ม **<> Code** (สีเขียว) → แท็บ **Codespaces** → **Create codespace on main**
   รอ 1–3 นาที ระบบจะรัน `npm install` และสร้างไฟล์ `.env` ให้อัตโนมัติ
2. สร้าง API Key ที่ [Google AI Studio](https://aistudio.google.com/apikey)
3. เปิดไฟล์ `.env` แล้วแทนค่า `ใส่_API_KEY_ของคุณที่นี่` ด้วย Key จริง → บันทึก (Ctrl+S)
4. เปิด Terminal (Ctrl+`) แล้วพิมพ์ `npm run dev`
5. หน้าต่าง Preview จะเปิดขึ้นด้านข้างอัตโนมัติ (หรือเปิดจากแท็บ **Ports** → พอร์ต 3000)

> ทางเลือก: ตั้ง `GEMINI_API_KEY` เป็น Codespaces secret ที่ github.com/settings/codespaces แทนการแก้ไฟล์ `.env`

## การแก้ไขและดูผล

| ไฟล์ที่แก้ | ผลหลังกด Save |
|---|---|
| `src/**` (หน้าจอ UI) | หน้าเว็บอัปเดตทันที (HMR) |
| `server.ts` (System Prompt / API) | เซิร์ฟเวอร์รีสตาร์ตอัตโนมัติ ต้องกดสั่งสร้างเอกสารใหม่บนหน้าเว็บจึงเห็นผล |
| `.env` | ต้องหยุด (Ctrl+C) แล้วรัน `npm run dev` ใหม่ |

## รันบนเครื่องตัวเอง

ต้องมี Node.js 20 ขึ้นไป: `npm install` → `cp .env.example .env` แล้วใส่ Key → `npm run dev` → เปิด http://localhost:3000
