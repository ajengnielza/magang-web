
import { Navigate, Route, Routes } from "react-router";
import LayoutAplikasi from "./components/layout/LayoutAplikasi";
import Halaman404 from "./pages/Halaman404";
import HalamanDetailJurnal from "./pages/HalamanDetailJurnal";
import HalamanJurnal from "./pages/HalamanJurnal";
import HalamanLampiran from "./pages/HalamanLampiran";
import HalamanLogin from "./pages/HalamanLogin";
import HalamanProfil from "./pages/HalamanProfil";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<HalamanLogin />} />

      <Route element={<LayoutAplikasi />}>
        <Route index element={<Navigate to="/jurnal" replace />} />
        <Route path="jurnal" element={<HalamanJurnal />} />
        <Route path="jurnal/:id" element={<HalamanDetailJurnal />} />
        <Route
          path="jurnal/:id/lampiran/:nomor"
          element={<HalamanLampiran />}
        />
        <Route path="profil" element={<HalamanProfil />} />
        <Route path="*" element={<Halaman404 />} />
      </Route>
    </Routes>
  );
}
