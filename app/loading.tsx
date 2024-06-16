import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Loader2 size={62} className="animate-spin" />
    </div>
  );
};

export default Loading;
