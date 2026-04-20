import { useState } from "react";
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  Sun,
  Moon,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Truck,
  Files,
  LifeBuoy,
  type LucideIcon
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useMediaQuery } from "@/hooks/use-media-query";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Orders", icon: ShoppingCart },
  { label: "Products", icon: Package },
  { label: "Shipments", icon: Truck },
  { label: "Assets", icon: Files },
  { label: "Support", icon: LifeBuoy },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mobile = useMediaQuery("(max-width: 1024px)")

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 text-white">
      <div className="bg-revo-surface/85 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-[1440px] mx-auto px-5 h-12 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* Logo */}
            <a href="/" className="flex items-center gap-1.5 mr-2">
              <span className="text-lg font-extrabold tracking-tighter">REVO</span>
              <span className="text-[9px] font-medium opacity-60 hidden sm:block uppercase tracking-wider">
                Wholesale
              </span>
            </a>

            {/* Menu Button (Unified) */}
            <button
              onClick={() => setOpen(!open)}
              className={`p-1.5 rounded-lg transition-colors ${open ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-black/4"
                }`}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Desktop Menu - Animated */}
            <div className="hidden lg:flex items-center gap-1 overflow-hidden">
              {NAV_ITEMS.map((item, index) => (
                <NavItem
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  index={index}
                  visible={open}
                  mobile={mobile}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            <IconButton>
              <Search size={16} />
            </IconButton>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-[52px] h-[26px] rounded-full border border-revo-border flex items-center px-1 bg-revo-surface hover:bg-black/4 transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${isDark ? "translate-x-6 bg-revo-accent text-white" : "translate-x-0 bg-black text-white"
                  }`}
              >
                {isDark ? <Moon size={12} /> : <Sun size={12} />}
              </div>
            </button>

            <IconButton>
              <Bell size={16} />
            </IconButton>

            {/* User */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-black/4 cursor-pointer transition-colors">
              <div className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                <User size={12} />
              </div>
              <span className="text-xs font-medium hidden sm:block">Fazly Alahi</span>
            </div>

          </div>
        </div>

        {/* MOBILE MENU - Animated Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[400px] border-b border-revo-border bg-revo-surface" : "max-h-0"
            }`}
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item, index) => (
              <NavItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                index={index}
                visible={open}
                mobile
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

/* Reusable Components */
interface NavItemProps {
  label: string;
  icon: LucideIcon;
  index: number;
  visible: boolean;
  mobile: boolean;
}
const NavItem = ({ label, icon: Icon, index, visible, mobile }: NavItemProps) => (
  <a
    href="#"
    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ease-out hover:bg-black/4 group ${visible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-4 pointer-events-none"
      } ${mobile ? "w-full" : ""}`}
    style={{
      transitionDelay: visible ? `${index * 50}ms` : "0ms",
    }}
  >
    <Icon size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
    <span>{label}</span>
  </a>
);

interface IconButtonProps {
  children: React.ReactNode;
}
const IconButton = ({ children }: IconButtonProps) => (
  <button className="p-2 rounded-lg hover:bg-black/4 transition-colors">
    {children}
  </button>
);