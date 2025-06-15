import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { BrowserRouter,Route,Routes } from "react-router-dom"
import ScreenLoader from "./components/ScreenLoader";
const Landing = lazy(() => import("./pages/Landing"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const ReadmeGenerator = lazy(() => import("./pages/ReadmeGenerator"));



function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Suspense fallback= {<div className="w-full h-screen flex justify-center items-center"> <ScreenLoader/> </div>}>
         <Toaster position="top-center" />
          <Routes>
            
              <Route path="/" element={<Landing/>}/>
              <Route path="/dashboard" element={<DashBoard/>}/>
              <Route path="/generate-readme/:id" element={<ReadmeGenerator/>}/>

          </Routes>
         </Suspense>
      </BrowserRouter>
     
    </>
  )
}

export default App
