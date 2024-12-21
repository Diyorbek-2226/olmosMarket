import React, { useState, useEffect } from 'react';
import { getAll, deleteSeller, updateSeller } from '../../service/api/seller';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, Plus, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Seller() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const res = await getAll();
      setSellers(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
      toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatan ham ushbu sotuvchini o'chirmoqchimisiz?")) {
      try {
        await deleteSeller(id);
        setSellers(sellers.filter(seller => seller.id !== id));
        toast.success("Sotuvchi muvaffaqiyatli o'chirildi!");
      } catch (err) {
        console.error(err);
        toast.error("Sotuvchini o'chirishda xatolik yuz berdi.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Sotuvchilar ro'yxati</h2>
        <button
          onClick={() => navigate('/admin/sellers/add')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Sotuvchi qo'shish
        </button>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['F.I.Sh', 'Username', 'Do\'kon', 'Holati', 'Avatar', 'Amallar'].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {sellers.length > 0 ? (
    sellers.map((seller) => (
      <tr
        key={seller.id}
        className="hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
        onClick={() => navigate(`/admin/sellers/${seller.id}`)}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{seller.fullname}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{seller.username}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{seller.shopName}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              seller.status === 'ACTIVE'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {seller.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={seller.userImage || '/placeholder.svg?height=40&width=40'}
            alt={seller.fullname}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click
                navigate(`/admin/sellers/${seller.id}`);
              }}
              className="text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out"
              aria-label={`View ${seller.fullname}'s details`}
            >
              <Eye size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click
                navigate(`/admin/sellers/${seller.id}`);
              }}
              className="text-green-600 hover:text-green-900 transition duration-150 ease-in-out"
              aria-label={`Edit ${seller.fullname}'s information`}
            >
              <Edit size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click
                handleDelete(seller.id);
              }}
              className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
              aria-label={`Delete ${seller.fullname}`}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center py-4 text-gray-500">
        Ma'lumot yo'q
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}

