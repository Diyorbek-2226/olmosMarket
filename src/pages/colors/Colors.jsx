import { Edit, Eye, Trash2 } from "lucide-react";
import { colorGetAll } from "../../service/api/color";
import { useEffect, useState } from "react";

export default function Colors() {
  const [color, setColor] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchColors() {
    try {
      const res = await colorGetAll();
      setColor(res.data);
    } catch (err) {
      alert("Xatolik yuz berdi: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div>
      <p className="text-xl font-mono  mt-2 mb-2">Ranglar </p>
      <table className="min-w-full divide-y divide-indigo-200">
        <thead className="bg-indigo-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider"
            >
              Rang Nomi
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider"
            >
              kodi
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider"
            >
              ko'rinishi
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider"
            >
              Amallar
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-indigo-100">
          {loading ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              </td>
            </tr>
          ) : color.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                Ranglar mavjud emas
              </td>
            </tr>
          ) : (
            color.map((colors) => (
              <tr
                key={colors.id}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {colors.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {colors.hex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center">
    <div
      className="w-6 h-6 rounded-full border border-gray-200"
      style={{ backgroundColor: colors.hex }}
      title={colors.hex}
    ></div>
  </div>

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => console.log("Ko'rish")}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    aria-label="View color"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => console.log("Tahrirlash")}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    aria-label="Edit color"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => console.log("O'chirish")}
                    className="text-red-600 hover:text-red-900"
                    aria-label="Delete color"
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
  );
}
