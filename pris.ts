import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

// บังคับให้โหลด .env จากโฟลเดอร์นอกสุด
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  datasource: {
    // ดึงค่า DATABASE_URL มาใช้ตรงๆ
    url: process.env.DATABASE_URL,
  },
});