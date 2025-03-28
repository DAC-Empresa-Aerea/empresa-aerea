import { Suspense } from "react";



const Loadable = (Component: any) => {
    return (props: any) => (
        <Suspense fallback={<div className="flex justify-center items-center h-screen ">Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;

<div className="flex justify-center items-center min-h-[200px]">
<div className="flex space-x-2">
  <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
  <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
  <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
</div>
</div>