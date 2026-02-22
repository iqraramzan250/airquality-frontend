import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  GitCompare,
  Settings,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/trends", label: "Trends", icon: TrendingUp },
    { path: "/comparison", label: "Comparison", icon: GitCompare },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border-r border-white/20 dark:border-gray-700/20 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Air Quality
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Real-Time Monitor
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "text-gray-600 dark:text-gray-300 hover:bg-white/5 hover:text-blue-400"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 dark:border-gray-700/10">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              © 2026 Air Quality Monitor
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
