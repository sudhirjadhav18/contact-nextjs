import "./globals.css";
import "./layout.css";
import Image from 'next/image';
import logo_icon from './assets/images/logo.svg';
import profile_icon from './assets/images/profile.svg';
import search_icon from './assets/images/search.svg';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="layout-header">
          <div className="layout-header__logo">
            <Image
              src={logo_icon}
              alt="Company Logo"
              width={34}
              priority
            />
          </div>
          <h1 className="layout-header__text">Contact Management</h1>
          <div className="layout-header__search">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image 
                  src={search_icon} 
                  alt="Search" 
                  width={20} 
                  height={20} 
                  className="text-gray-500"
                />
              </div>
              <input 
                type="text" 
                placeholder="Search" 
                className="layout-header__search-input pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="layout-header__profile">
          <Image
              src={profile_icon}
              alt="Profile"
              width={34}
              priority
            />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
