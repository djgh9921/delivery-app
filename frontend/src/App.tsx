import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
      <div>
        <header className="bg-white shadow p-4 flex justify-between max-w-7xl mx-auto">
          <nav className="flex gap-4">
            <Link to="/" className="text-black font-semibold">Restaurant</Link>
            <Link to="/cart" className="text-black font-semibold">Shopping Cart</Link>
          </nav>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
  )
}