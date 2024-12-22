import React, { useEffect, useState } from 'react';
import { registerSeller, sellerGetId, updateSeller } from '../../../service/api/seller';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SellerForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        shopName: ''
    });
    const [mode, setMode] = useState('add');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { pathname } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const parts = pathname.split("/");
        const currentMode = parts[3];
        setMode(currentMode);

        if (currentMode !== 'add' && id) {
            fetchSellerData(id);
        }
    }, [pathname, id]);

    const fetchSellerData = async (sellerId) => {
        setLoading(true);
        try {
            const res = await sellerGetId(sellerId);
            setFormData({
                fullName: res.data.fullname,
                username: res.data.username,
                password: res.data.username,
                shopName: res.data.shopName
            });
        } catch (err) {
            toast.error("Sotuvchi ma'lumotlarini yuklashda xatolik yuz berdi");
            console.error("Error fetching seller:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (mode === 'add') {
                 registerSeller(formData);
                toast.success('Sotuvchi muvaffaqiyatli qoshildi!');
            } else if (mode === 'edit') {
             updateSeller(id, formData).then()
             .catch(err => {
                alert(err);
                console.log(err);
                
             });
            }
            navigate('/admin/sellers');
        } catch (err) {
            toast.error('Xatolik yuz berdi. Iltimos, qaytadan urinib koring.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'add': return 'Yangi sotuvchi qoshish';
            case 'edit': return 'Sotuvchi malumotlarini tahrirlash';
            case 'view': return 'Sotuvchi malumotlari';
            default: return 'Sotuvchi';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="relative bg-white shadow-lg rounded-3xl sm:p-10">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <button
                                onClick={() => navigate('/admin/sellers')}
                                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Orqaga
                            </button>
                            <h2 className="text-3xl font-bold text-gray-900">{getTitle()}</h2>
                            <div className="w-24"></div> {/* Spacer for alignment */}
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                        To'liq ism
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        readOnly={mode === 'view'}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        placeholder="To'liq ismni kiriting"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Foydalanuvchi nomi
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        readOnly={mode === 'view'}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        placeholder="Foydalanuvchi nomini kiriting"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Parol
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            readOnly={mode === 'view'}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="Parolni kiriting"
                                            required={mode === 'add'}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                        >
                                            {showPassword ? 
                                                <EyeOff className="h-5 w-5 text-gray-400" /> : 
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
                                        Do'kon nomi
                                    </label>
                                    <input
                                        type="text"
                                        id="shopName"
                                        name="shopName"
                                        value={formData.shopName}
                                        onChange={handleChange}
                                        readOnly={mode === 'view'}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        placeholder="Do'kon nomini kiriting"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/sellers')}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    Bekor qilish
                                </button>
                                {mode !== 'view' && (
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <Loader className="animate-spin h-5 w-5 mx-auto" />
                                        ) : mode === 'add' ? (
                                            'Sotuvchini qoshish'
                                        ) : (
                                            'Ozgarishlarni saqlash'
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

