import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateSeller } from '../../service/api/seller';

const SellerUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Refs for form fields
  const fullnameRef = useRef(null);
  const usernameRef = useRef(null);
  const shopNameRef = useRef(null);
  const statusRef = useRef(null);
  const userImageRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
       
     

    
        if (fullnameRef.current) fullnameRef.current.value = fullname;
        if (usernameRef.current) usernameRef.current.value = username;
        if (shopNameRef.current) shopNameRef.current.value = shopName;
        if (statusRef.current) statusRef.current.value = status;
      } catch (err) {
        setError("Sotuvchi ma'lumotlarini yuklashda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('fullname', fullnameRef.current.value);
    formData.append('username', usernameRef.current.value);
    formData.append('shopName', shopNameRef.current.value);
    formData.append('status', statusRef.current.value);
    if (userImageRef.current.files[0]) {
      formData.append('userImage', userImageRef.current.files[0]);
    }

    try {
      await updateSeller(id, formData);
      navigate('/admin/sellers'); // Redirect on success
    } catch (err) {
      setError("Sotuvchi ma'lumotlarini yangilashda xatolik yuz berdi");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sotuvchi ma'lumotlarini tahrirlash</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
            To'liq ism
          </label>
          <input
            type="text"
            id="fullname"
            ref={fullnameRef}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            ref={usernameRef}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
            Do'kon nomi
          </label>
          <input
            type="text"
            id="shopName"
            ref={shopNameRef}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Holati
          </label>
          <select
            id="status"
            ref={statusRef}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="ACTIVE">Faol</option>
            <option value="INACTIVE">Nofaol</option>
          </select>
        </div>

        <div>
          <label htmlFor="userImage" className="block text-sm font-medium text-gray-700">
            Foydalanuvchi rasmi
          </label>
          <input
            type="file"
            id="userImage"
            ref={userImageRef}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/sellers')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {submitting ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerUpdate;
