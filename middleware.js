import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // ถ้าไม่มี token แสดงว่าผู้ใช้ยังไม่ได้ล็อกอิน ให้ไปหน้า login
  if (!token) {
    if (req.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // ถ้าผู้ใช้ล็อกอินแล้ว และพยายามเข้าถึงหน้า login ให้ redirect ไปหน้าอื่น
  if (token && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // ดึง role ของผู้ใช้จาก token
  const userRole = token.role;

  // ถ้าผู้ใช้ไม่มี role แต่พยายามเข้าถึงหน้าอื่นที่ไม่ใช่ /role ให้ redirect ไปหน้าเลือก role
  if (!userRole && req.nextUrl.pathname !== '/role') {
    return NextResponse.redirect(new URL('/role', req.url));
  }

  // ถ้าผู้ใช้มี role อยู่แล้ว แต่พยายามเข้าถึงหน้า /role ให้ redirect ไปหน้าอื่น
  if (userRole && req.nextUrl.pathname === '/role') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // ถ้าผู้ใช้เป็น admin และไม่อยู่ที่หน้า /admin ให้ redirect ไปหน้า admin
  if (userRole === 'admin' && req.nextUrl.pathname !== '/admin') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // ถ้า role เป็น user หรืออื่นๆ ให้สามารถเข้าถึงหน้าอื่นๆ ได้ตามปกติ
  return NextResponse.next();
}

// matcher กำหนด route ที่จะใช้ middleware
export const config = {
  matcher: ['/', '/login', '/admin', '/role', '/technician/register'],
};
