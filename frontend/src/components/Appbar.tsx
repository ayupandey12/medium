import { Link } from "react-router-dom"
import { useContext } from "react"
import { Auth } from "../context/context"

export const Appbar = () => {
    const { loggedin } = useContext(Auth)
    const username = localStorage.getItem("username") ?? localStorage.getItem("name") ?? ""
    const initials = username ? username[0].toUpperCase() : "A"

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/70">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                <Link to="/" className="flex items-center gap-3">
                    <div className="rounded-full bg-slate-950 px-3 py-2 text-sm font-bold uppercase tracking-[0.24em] text-white shadow-lg shadow-slate-900/10">
                        StoryBook
                    </div>
                    <div className="hidden text-sm text-slate-500 md:block">Volume 2026</div>
                </Link>

                <nav className="flex items-center gap-3">
                    <Link to="/blogs" className="text-sm font-medium text-slate-700 transition hover:text-slate-950">
                        Stories
                    </Link>
                    <Link to="/publish" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                        Publish
                    </Link>
                    {loggedin ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                            {initials}
                        </div>
                    ) : (
                        <>
                            <Link to="/signin" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
                                Sign in
                            </Link>
                            <Link to="/signup" className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
                                Signup
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}