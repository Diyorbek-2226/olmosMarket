import { useNavigate } from "react-router-dom"
import { ChevronLeft } from 'lucide-react'

export default function BackLink({ to, title }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(to)}
      className=" text-xl group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent text-indigo-800 hover:text-accent-foreground"
    >

      {title || 'Back'}
    </button>
  )
}

