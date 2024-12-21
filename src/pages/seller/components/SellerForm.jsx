import React, { useEffect, useRef, useState } from 'react';
import { registerSeller, sellerGetId } from '../../../service/api/seller';
import { useLocation, useParams } from 'react-router-dom';

export default function SellerForm() {
    const fullNameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const shopNameRef = useRef();
    const pathname = useLocation();
    const [path , setPath] = useState("");
    const [seller , setSeller] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const parts = pathname.pathname.split("/");
        const viewPart = parts[3];
        setPath(viewPart);
    }, [pathname]);
    
    useEffect(() => {
        if (path !== 'add') { 
            sellerGetId(id).then(res => {
                setSeller(res.data);
            }).catch(err => {
                console.error("Error fetching seller:", err);
            });
        }
    }, [path, id]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append("fullName", fullNameRef.current?.value);
        formData.append("username", usernameRef.current?.value);
        formData.append("password", passwordRef.current?.value);
        formData.append("shopName", shopNameRef.current?.value);

        try {
            const response = await registerSeller(formData);
            console.log(response);
            setSuccess('Sotuvchi muvaffaqiyatli qoshildi!');
            // Reset form fields
            e.target.reset();
        } catch (err) {
            setError('Xatolik yuz berdi. Iltimos, qaytadan urinib koring.',err);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        
                        <form className="divide-y divide-gray-200" onSubmit={handleSubmit}>
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex flex-col">
                                    <label className="leading-loose">Toliq ism</label>
  <input 
  type="text" 
  defaultValue={seller.fullname || ''} 
  ref={fullNameRef} 
  readOnly={path === 'view'} 
  className={`...`} 
  placeholder="To'liq ismingizni kiriting" 
  required 
/>
</div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Foydalanuvchi nomi</label>
                                    <input type="text" ref={usernameRef} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Foydalanuvchi nomini kiriting" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Parol</label>
                                    <input type="password" ref={passwordRef} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Parolni kiriting" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Dokon nomi</label>
                                    <input type="text" ref={shopNameRef} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Do'kon nomini kiriting" required />
                                </div>
                            </div>
                            <div className="pt-4 flex items-center space-x-4">
                                <button type="submit" disabled={loading} className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                                    {loading ? 'Yuklanmoqda...' : 'Sotuvchini qoshish'}
                                </button>
                            </div>
                        </form>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

