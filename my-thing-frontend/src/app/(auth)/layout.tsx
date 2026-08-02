import { ReactNode } from "react";
import Image from "next/image";
import * as images from "../../../public/index";
export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#F7F7FB]">
            {/* Background Ellipse 3 */}
            <Image
                src={images.img1}
                alt=""
                priority
                className="hidden md:block fixed top-0 left-90 w-[200px] h-[200px] z-0"
            />

            {/* Background Ellipse 5 */}
            <Image
                src={images.img2}
                alt=""
                priority
                className="hidden md:block fixed bottom-15 right-90 w-[200px] h-[200px] z-0"
            />
            {/* Background Vector 2 */}
            <Image src={images.img3} 
            className="hidden md:block fixed bottom-0 -left-2 w-[50%] z-0 object-cover" 
            alt="" 
            priority
            />
            <main className="relative z-10 flex items-center justify-center">
                {children}
            </main>
        </div>


    );
}