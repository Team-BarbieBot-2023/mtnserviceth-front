import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: "",
                        status: "A",
                    }),
                });

                if (response.ok) {
                    return true; // ถ้าการสร้างผู้ใช้สำเร็จ
                } else {
                    // แสดงข้อผิดพลาดและ return false ถ้าการสร้างผู้ใช้ไม่สำเร็จ
                    const errorData = await response.json();
                    console.error('Failed to create user:', response.statusText, errorData);
                    return false;
                }
            } catch (error) {
                console.error('Error during signIn callback:', error);
                return false; // return false ถ้ามีข้อผิดพลาดระหว่างการ signIn
            }
        },
        async jwt({ token, trigger, session }) {
            if (trigger === 'signIn' || trigger === 'update') {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/checkrole/${token.sub}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    token.role = data[0].role || "";
                    token._id = data[0].id || "";
                    token.status = data[0].status || "";
                } else {
                    console.error("Failed to fetch role");
                    token.role = ""; // กำหนด role เป็นค่าว่างถ้าดึงข้อมูลไม่ได้
                }
            }

            // กรณีที่ session มี role ให้ใช้ role ใน session
            if (trigger === 'update' && session?.role) {
                token.role = session.role;
            }

            return token;
        },
        async session({ session, token }) {
            // เพิ่ม role ให้ session user
            session.user.id = token.sub;
            session.user.role = token.role || "";
            session.user._id = token._id || "";
            session.user.status = token.status || "";
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin', // หน้าสำหรับการ signIn
        error: '/auth/error', // หน้าสำหรับแสดงข้อผิดพลาด
    },
};

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
