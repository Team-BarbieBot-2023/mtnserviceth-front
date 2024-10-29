import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// กำหนด mapping role กับหน้าที่สามารถเข้าถึงได้
const rolePages = {
  A: ['/', '/admin/dashboard', '/admin/technicians', '/admin/reports'],
  T: ['/', '/technician/register', '/technician/schedule', '/technician/edit-profile'],
  U: ['/'],
};

// หน้าที่ไม่อนุญาตให้ role เข้าไป
const restrictedPages = {
  U: ['/admin', '/technician', '/technician/register'],
};

// ฟังก์ชันตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงหน้าหรือไม่
const isPageRestricted = (role, pathname) => {
  const restricted = restrictedPages[role] || [];
  return restricted.includes(pathname);
};

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // ถ้าไม่มี token แสดงว่าผู้ใช้ยังไม่ได้ล็อกอิน ให้ไปหน้า login
  if (!token) {
    if (req.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // ตรวจสอบ status ของผู้ใช้
  const userStatus = token.status;
  console.log(userStatus)
  // ถ้า status ไม่ใช่ 'A' ให้ redirect ไปหน้า impervious
  if (userStatus !== 'A') {
    return NextResponse.redirect(new URL('/impervious', req.url));
  }

  // ดึง role ของผู้ใช้จาก token
  const userRole = token.role;
  // ถ้า role ไม่มีในระบบ ให้ redirect ไปหน้าเลือก role
  if (!userRole && req.nextUrl.pathname !== '/role') {
    return NextResponse.redirect(new URL('/role', req.url));
  }

  // ถ้า role เป็น user แต่พยายามเข้าถึงหน้าที่ถูกจำกัดสิทธิ์
  if (isPageRestricted(userRole, req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // ถ้าผู้ใช้ล็อกอินแล้ว และพยายามเข้าถึงหน้า login ให้ redirect ไปหน้าอื่น
  if (req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // ตรวจสอบว่า role สามารถเข้าถึงหน้าที่กำหนดได้หรือไม่
  const allowedPages = rolePages[userRole] || [];
  if (allowedPages.length && !allowedPages.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(allowedPages[0], req.url));
  }

  // ให้ผ่านไปยังหน้าอื่นๆ ได้ถ้าทุกอย่างถูกต้อง
  return NextResponse.next();
}

// matcher กำหนด route ที่จะใช้ middleware
export const config = {
  matcher: ['/', '/login', '/admin', '/role', '/technician/register', '/impervious', '/user', '/technician'],
};
