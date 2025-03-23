import { Outlet } from "react-router-dom";

function SelfRegistrationLayout() {
  return (
    <div className="contents flex-col h-full">
        <h1 className="text-center">SelfRegistration Layout</h1>

        <div className="flex flex-col flex-1">
            <Outlet />   
        </div>
    </div>
  );
}

export default SelfRegistrationLayout;
