import { Outlet } from "react-router-dom";

function LoginLayout() {
  return (
    <div className="contents flex-col h-full bg-gray-extra-light">
        <h1 className="text-center bg-inherit">Login Layout</h1>

        <div className="flex flex-col flex-1">
            <Outlet />   
        </div>
    </div>
  );
}

export default LoginLayout;
