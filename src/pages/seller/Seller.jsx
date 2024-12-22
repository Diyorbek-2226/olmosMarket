import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { deleteSeller, getAll } from '../../service/api/seller';
export default function Seller() {
  const [sellers, setSellers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const sellersPerPage = 10;
  async function FetchAll() {
    try {
      const res = await getAll();
      setSellers(res.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false); 
    }
  }
  useEffect(()=>{
FetchAll()
  },[])
  const handleDelete =(id) => {
       deleteSeller(id);
      toast.success('Seller deleted successfully');
  };
useEffect((id)=>{
  deleteSeller(id)
},[])
  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = sellers.slice(indexOfFirstSeller, indexOfLastSeller);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Sotuvchilar haqida malumot</h1>
      <div className="bg-indigo-50 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-indigo-200">
            <thead className="bg-indigo-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Avatar</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">F.I.Sh</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Username</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Do'kon</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Holati</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-indigo-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    </div>
                  </td>
                </tr>
              ) : currentSellers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    Sotuvchilar mavjud emas
                  </td>
                </tr>
              ) : (
                currentSellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-indigo-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={seller.userImage} alt={seller.fullname} />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{seller.fullname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.shopName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        seller.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {seller.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(`/admin/sellers/view/${seller.id}`)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        aria-label="View seller"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/sellers/edit/${seller.id}`)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        aria-label="Edit seller"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(seller.id)}
                        className="text-red-600 hover:text-red-900"
                        aria-label="Delete seller"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <button
          className="mb-2 sm:mb-0 px-4 py-2 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-5 w-5 inline-block mr-1" />
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {Math.ceil(sellers.length / sellersPerPage)}
        </span>
        <button
          className="mt-2 sm:mt-0 px-4 py-2 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastSeller >= sellers.length}
        >
          Next
          <ChevronRight className="h-5 w-5 inline-block ml-1" />
        </button>
      </div>
    </div>
  );
}

