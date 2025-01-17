import './globals.css'
import './layout.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="layout__header">
          <h1 className="layout__header-text">Contact Management</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
