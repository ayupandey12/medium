import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";
import { useblog } from "../hooks/useblog";

export const Blog = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { loading, blog } = useblog({ id: id ?? "" })

    useEffect(() => {
        if (!id) {
            navigate("/blogs")
        }
    }, [id, navigate])

    const formatDate = (dateString?: string) => {
        if (!dateString) return new Date().toLocaleDateString();
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Appbar />
                <div className="flex min-h-[70vh] items-center justify-center px-4">
                    <Spinner />
                </div>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <Appbar />
                <main className="mx-auto max-w-5xl px-4 py-16 text-center">
                    <p className="text-lg font-semibold text-slate-900">Story not found.</p>
                    <Link
                        to="/blogs"
                        className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                    >
                        Back to stories
                    </Link>
                </main>
            </div>
        )
    }

    const savedUsername =
        (localStorage.getItem("username") ?? localStorage.getItem("name") ?? "").toLowerCase()
    const isAdmin = localStorage.getItem("role") === "admin"
    const canEdit = isAdmin || savedUsername === blog.author.name.toLowerCase()

    const topicLabel = blog.title.split(" ").slice(0, 2).join(" ")

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Appbar />
            <main className="relative">
                <section className="relative min-h-[64vh]">
                    <div className="absolute inset-0">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="h-full w-full object-cover object-center transition duration-700"
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_32%),linear-gradient(180deg,_rgba(15,23,42,0.82),_rgba(15,23,42,0.98))]" />
                    </div>

                    <div className="relative mx-auto flex min-h-[64vh] max-w-5xl flex-col justify-end px-6 pb-16 pt-24 sm:px-8">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/80">
                            {topicLabel}
                        </span>

                        <div className="mt-5 flex flex-col gap-4 sm:max-w-3xl">
                            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                                {blog.title}
                            </h1>
                            <p className="text-base leading-8 text-slate-200/85">{blog.content.slice(0, 180)}...</p>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-200/80">
                            <span className="rounded-full bg-white/10 px-3 py-1">{blog.author.name}</span>
                            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-slate-200/70" />
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to="/blogs"
                                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white transition hover:border-sky-300 hover:bg-sky-500/15"
                            >
                                Back to stories
                            </Link>
                            {canEdit && (
                                <Link
                                    to={`/publish?edit=${blog.id}`}
                                    className="inline-flex items-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                                >
                                    Edit story
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-sm uppercase tracking-[0.28em] text-sky-300">Full story</span>
                            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                                {topicLabel}
                            </span>
                        </div>

                        <article className="prose prose-slate max-w-none text-slate-100 prose-headings:text-white prose-p:text-slate-200">
                            <div className="whitespace-pre-line">{blog.content}</div>
                        </article>
                    </div>
                </section>
            </main>
        </div>
    )
}

export const Blogbyid = Blog