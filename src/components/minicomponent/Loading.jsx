import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <>
      <div className="absolute top-0 left-0 h-[100vh] w-[100vw] bg-black opacity-30"></div>
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50">
        <Loader2 size={100} className="animate-spin" />
      </div>
    </>
  );
};

export default Loading;
