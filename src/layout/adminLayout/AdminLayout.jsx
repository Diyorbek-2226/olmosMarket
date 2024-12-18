import { Outlet } from 'react-router-dom'
import { Sidebar } from '../sidebar/Sidebar'

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

