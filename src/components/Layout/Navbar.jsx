import { Menu, X } from "lucide-react";

const Navbar = ({ onMenuClick, isSidebarOpen }) => {
  return (
    <nav className="sticky top-0 z-30 bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border-b border-white/20 dark:border-gray-700/20">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>

        <div className="flex-1 lg:ml-0 ml-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Air Quality Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
