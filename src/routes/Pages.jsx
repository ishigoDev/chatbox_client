import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import ChatRoom from '../pages/ChatRoom/ChatRoom';

export function HomePage() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
export function LoginPage() {
  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
}
export function ChatPage() {
  return (
    <>
      <Header />
      <ChatRoom />
      <Footer />
    </>
  );
}
