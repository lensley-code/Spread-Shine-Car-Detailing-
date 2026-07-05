import './styles/luz.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import OurWork from "./pages/OurWork.tsx";
import Faq from "./pages/Faq.tsx";
import Terms from "./pages/Terms.tsx";
import Privacy from "./pages/Privacy.tsx";
import Contact from "./pages/Contact.tsx";
import Book from "./pages/Book.tsx";
import BookingConfirmed from "./pages/BookingConfirmed.tsx";
import Guide from "./pages/Guide.tsx";
import GuideConfirmation from "./pages/GuideConfirmation.tsx";
import DownloadSpiritualBook from "./pages/DownloadSpiritualBook.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import AdminContact from "./pages/AdminContact.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide-confirmation" element={<GuideConfirmation />} />
          <Route path="/download/spiritual-book" element={<DownloadSpiritualBook />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/admin/contact" element={<AdminContact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
