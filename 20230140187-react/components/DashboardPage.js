import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg text-center">
                <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
                    🎉 Selamat Datang!
                </h1>
                <p className="text-gray-700 mb-8">
                    Anda berhasil login ke Dashboard. Gunakan navigasi ini untuk mulai menjelajah sistem.
                </p>
                <button
                    onClick={handleLogout}
                    className="py-2 px-6 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;
