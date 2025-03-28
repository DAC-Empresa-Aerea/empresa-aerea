import { Suspense } from "react";



const Loadable = (Component: any) => {
    return (props: any) => (
        <Suspense fallback={<div className="flex justify-center items-center h-screen ">Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;