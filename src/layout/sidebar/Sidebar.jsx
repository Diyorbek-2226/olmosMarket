import { useState } from 'react'
import { LayoutDashboard, History, Star, Settings, ChevronDown, Database, BookOpen, Image, ChevronRight } from 'lucide-react'

const menuItems = [
  {
    title: 'Seller ',
    icon: LayoutDashboard,
    items: []
  },
  {
    title: 'Sotuvchilar',
    icon: Image,
    items: [
      { title: 'History', icon: History },
      { title: 'Starred', icon: Star },
      { title: 'Settings', icon: Settings }
    ]
  },
  {
    title: 'Models',
    icon: Database,
    items: []
  },
  {
    title: 'Documentation',
    icon: BookOpen,
    items: []
  },
  {
    title: 'Settings',
    icon: Settings,
    items: []
  }
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItem, setExpandedItem] = useState('Playground')

  return (
    <div 
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen bg-background border-r flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-background" />
            </div>
            {/* <div>
              <h2 className="font-semibold">Acme Inc</h2>
              <p className="text-xs text-muted-foreground">Enterprise</p>
            </div> */}
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-accent rounded-lg"
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => (
          <div key={item.title}>
            <button
              onClick={() => !isCollapsed && setExpandedItem(expandedItem === item.title ? null : item.title)}
              className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent hover:text-accent-foreground ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                {!isCollapsed && <span>{item.title}</span>}
              </div>
              {!isCollapsed && item.items.length > 0 && (
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${
                    expandedItem === item.title ? 'transform rotate-180' : ''
                  }`} 
                />
              )}
            </button>
            
            {!isCollapsed && expandedItem === item.title && item.items.length > 0 && (
              <div className="ml-6 mt-2 space-y-1">
                {item.items.map((subItem) => (
                  <button
                    key={subItem.title}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground text-sm"
                  >
                    <subItem.icon className="w-4 h-4" />
                    <span>{subItem.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              avatar
            </div>
            <div>
              <p className="font-medium">shadcn</p>
              <p className="text-xs text-muted-foreground">m@example.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

