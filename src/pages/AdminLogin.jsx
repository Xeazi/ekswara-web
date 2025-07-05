import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


function AdminLogin() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/admin/api/v1/login", data);

            localStorage.setItem("token", response.data.token);

            navigate("../admin/destinations/1/events"); 
        } catch (error) {
            console.error('Login Failed:', error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border border-green-700 p-8 rounded-md w-full max-w-sm shadow"
            >
              <h2 className="text-center text-xl font-bold text-blue-900 mb-1">UrbanRayaJakarta</h2>
              <h3 className="text-center text-green-700 text-lg font-semibold mb-6">Masuk</h3>

              <label className="text-sm font-medium text-gray-700 mb-1 block">username</label>
              <div className="relative mb-4">
                <input
                  type="text"
                  {...register("username", { required: true })}
                  placeholder="johndoe"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-gray-400 text-sm">📧</span>
                {errors.username && <p className="text-red-500 text-xs mt-1">Username is required</p>}
              </div>

              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <div className="relative mb-6">
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-gray-400 text-sm">👁️</span>
                {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded text-sm font-semibold hover:bg-green-800"
              >
                Masuk
              </button>
            </form>
        </div>
    );

}

export default AdminLogin;