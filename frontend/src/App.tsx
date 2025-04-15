import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import router from "./routes";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;