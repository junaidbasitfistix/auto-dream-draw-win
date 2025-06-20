
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CarDetail from "./pages/CarDetail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Winners from "./pages/Winners";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

// Admin Components
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCarList from "./pages/admin/CarList";
import AdminCarForm from "./pages/admin/CarForm";
import AdminRaffleList from "./pages/admin/RaffleList";
import AdminRaffleForm from "./pages/admin/RaffleForm";
import AdminRaffleDetail from "./pages/admin/RaffleDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/winners" element={<Winners />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="cars" element={<AdminCarList />} />
            <Route path="cars/new" element={<AdminCarForm />} />
            <Route path="cars/edit/:id" element={<AdminCarForm />} />
            <Route path="raffles" element={<AdminRaffleList />} />
            <Route path="raffles/new" element={<AdminRaffleForm />} />
            <Route path="raffles/edit/:id" element={<AdminRaffleForm />} />
            <Route path="raffles/detail/:id" element={<AdminRaffleDetail />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
