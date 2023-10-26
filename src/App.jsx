import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Admin/Users/Users";
import Products from "./pages/Admin/Products/Products";
import ProductsAll from "./pages/ProductsAll/ProductsAll";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

import Loading from "./components/Loading/Loading";

import ProtectedRoutes from "./routes/ProtectedRoutes";

import { checkAuthState } from "./features/auth/authSlice";

function App() {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(checkAuthState());
	}, [dispatch]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Routes>
					<Route path="/" element={<ProductsAll />} />
					<Route path="/products" element={<ProductsAll />} />
					<Route path="/products/:productId" element={<ProductDetail />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/profile"
						element={
							<ProtectedRoutes>
								<Profile />
							</ProtectedRoutes>
						}
					/>
					<Route
						path="/admin"
						element={
							<ProtectedRoutes>
								<Admin />
							</ProtectedRoutes>
						}
					>
						<Route path="users" element={<Users />} />
						<Route path="products" element={<Products />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			)}
			<ToastContainer />
		</>
	);
}

export default App;
