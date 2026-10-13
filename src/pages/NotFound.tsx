import { Link } from "react-router-dom";
export default function NotFound() { return <main className="min-h-screen grid place-items-center text-center"><div><h1 className="text-4xl mb-4">Page not found</h1><Link to="/" className="text-primary underline">Return home</Link></div></main>; }
