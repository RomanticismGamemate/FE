import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import GlobalStyle from "./pages/GlobalStyles";
import Chat from "./pages/Chat";
import Chatroom from "./pages/Chatroom";
import Make from "./pages/Make";
import SignupLogin from "./pages/SignupLogin";
import ProfileUpdate from "./pages/ProfileUpdate";
import RoomDetail from "./pages/RoomDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import TabShell from "./components/TabShell";


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route element={<ProtectedRoute />}>
          {/* 홈/마이페이지: TabShell keep-alive + 슬라이드 (탭 클릭만) */}
          <Route element={<TabShell />}>
            <Route path="/home" element={<></>} />
            <Route path="/profile" element={<></>} />
          </Route>
          <Route path="/roomdetail" element={<RoomDetail />} />
          <Route path="/roomdetail/:roomId" element={<RoomDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatroom/:roomId" element={<Chatroom />} />
          <Route path="/make" element={<Make />} />
          <Route path="/profile/update" element={<ProfileUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
