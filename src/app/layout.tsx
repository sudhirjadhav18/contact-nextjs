import "./globals.css";
import "./layout.css";
import Image from 'next/image';
import logo_icon from './assets/images/logo.svg';
import profile_icon from './assets/images/profile.svg';

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
            <input type="text" placeholder="Search" className="layout-header__search-input" />
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
