import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiPhotoAlbum } from "react-icons/bi";

export const sidebarData = [
  { title: "Dashboard", path: "", icon: <RxDashboard /> },
  { title: "User", path: "/admin/users", icon: <FiUsers /> },
  { title: "Products", path: "/admin/products", icon: <HiOutlineDocumentText /> },
  { title: "Photos", path: "", icon: <BiPhotoAlbum /> },
];
