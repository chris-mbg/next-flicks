import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="bg-slate-200 text-slate-900 p-4 flex justify-between items-center">
      <span className="text-2xl font-bold">NextFlicks</span>
      <nav>
        <ul className="flex gap-8 items-center">
          <li>
            <Link href="/" className="uppercase text-sm hover:text-orange-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/search" className="uppercase text-sm hover:text-orange-600">
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
