export default function Loading() {
  return (
    <div className="h-screen bg-black/15 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <div className="w-20 h-20 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-transparent border-l-transparent border-red-500"></div>
    </div>
  );
}
