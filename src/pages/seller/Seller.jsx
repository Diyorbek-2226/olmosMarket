import  { useState, useEffect } from 'react';
import { getAll, deleteSeller, updateSeller } from '../../service/api/seller';
import { NavLink } from 'react-router-dom';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function Seller() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const res = await getAll();
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError('Ma\'lumotlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    deleteSeller(id).then(res =>console.log(res)

    )

    
    const formData = new FormData();
    formData.append("fullName"," fullNameRef");
    formData.append("username","sadf");
    formData.append("password", "sadfg");
    formData.append("shopName", "fgerger");

    updateSeller(id ,formData)
    console.log(id);
    

    if (window.confirm('Haqiqatan ham ushbu sotuvchini o\'chirmoqchimisiz?')) {
      try {
        await deleteSeller(id);
        alert('Sotuvchi muvaffaqiyatli o\'chirildi!');
      } catch (err) {
        console.error(err);
        alert('Sotuvchini o\'chirishda xatolik yuz berdi.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Sotuvchilar royxati</h2>
          <NavLink 
            to="/admin/sellers/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Sotuvchi qo'shish
          </NavLink>
        </div>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y bg-gray-500 divide-gray-600">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    F.I.Sh
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dokon
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holati
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avatar
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions 
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((seller) => (
                  <tr key={seller.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
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
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        seller.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {seller.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img className="h-10 w-10 rounded-full object-cover" src={seller.userImage} alt={seller.fullname} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out"
                          aria-label={`View ${seller.fullname}'s details`}
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 transition duration-150 ease-in-out"
                          aria-label={`Edit ${seller.fullname}'s information`}
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(seller.id)}
                          className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                          aria-label={`Delete ${seller.fullname}`}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}
