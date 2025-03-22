import { Outlet } from "react-router-dom";

function LoginLayout() {
  return (
    <div className="contents flex-col h-full">
        <h1 className="text-center">Login Layout</h1>

        <div className="flex flex-col flex-1">
            <Outlet />   
        </div>
    </div>
  );
}

export default LoginLayout;
