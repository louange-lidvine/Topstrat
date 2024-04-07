"use client";
import { useRouter } from "next/navigation";

function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
      <h5 className="text-[25px]">Ooops! Page Not Found.</h5>
      <h1 className="text-[20px]">You Are Lost!</h1>
      <button
        onClick={() => router.back()}
        className="py-3 px-9 mt-5 border-[1px] bg-blue-default text-white rounded-lg"
      >
        Return
      </button>
    </div>
  );
}   

export default NotFoundPage;
