import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Books from './pages/Books';
import Feedback from './pages/Feedback';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import ReturnPolicy from './pages/ReturnPolicy';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import AdminRoute from './components/AdminRoute';


import AdminDashboard from './pages/admin/AdminDashboard';
import ManageBooks from './pages/admin/ManageBooks';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import ContactMessages from './pages/admin/ContactMessages';
import ManageFeedback from './pages/admin/ManageFeedback';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminRoute />}>
                  <Route element={<AdminDashboard />}>
                    <Route index element={
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
                        <p className="text-gray-600">Welcome to the Admin Dashboard. Select an option from the sidebar to manage your store.</p>
                      </div>
                    } />
                    <Route path="books" element={<ManageBooks />} />
                    <Route path="orders" element={<ManageOrders />} />
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="messages" element={<ContactMessages />} />
                    <Route path="feedback" element={<ManageFeedback />} />
                  </Route>
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
