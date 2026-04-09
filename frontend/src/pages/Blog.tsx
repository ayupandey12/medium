import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";
import { baseurl } from "../../config";
import type { Blogposttype } from "@ayushdevinfer1/medium-common";

export const Blog = () => {
    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<Blogposttype | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!id) return
        setLoading(true)

        const token = localStorage.getItem("token") ?? ""

        axios
            .get(`${baseurl}/api/v1/blog/${id}`, {
                headers: token ? { Authorization: token } : undefined
            })
            .then((response) => setPost(response.data))
            .catch(() => setError("Unable to load this story."))
            .finally(() => setLoading(false))
    }, [id])

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

    if (!post || error) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <Appbar />
                <main className="mx-auto max-w-5xl px-4 py-16 text-center">
                    <p className="text-lg font-semibold text-slate-900">{error || "Story not found."}</p>
                    <Link
                        to="/"
                        className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                    >
                        Back to discover
                    </Link>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Appbar />
            <main className="relative">
                <section className="relative min-h-[62vh]">
                    <div className="absolute inset-0">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover object-center transition duration-700"
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.20),_transparent_35%),linear-gradient(180deg,_rgba(15,23,42,0.78),_rgba(15,23,42,0.95))]" />
                    </div>

                    <div className="relative mx-auto flex min-h-[62vh] max-w-5xl flex-col justify-end px-6 pb-16 pt-24 sm:px-8">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/80">
                            {post.topic ?? "Featured story"}
                        </span>
                        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                            {post.title}
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200/85">
                            {post.content.slice(0, 180)}...
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-200/80">
                            <span className="rounded-full bg-white/10 px-3 py-1">{post.authorname}</span>
                            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-slate-200/70" />
                            <span>{post.publishedDate}</span>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white transition hover:border-sky-300 hover:bg-sky-500/10"
                                >
                                    ← Back to discover
                                </Link>
                                <span className="rounded-full bg-slate-900/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                                    {post.topic ?? "Blog"}
                                </span>
                            </div>

                            <div className="space-y-6">
                                <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Full story</p>
                                <div className="prose prose-slate max-w-none text-slate-100 prose-headings:text-white prose-p:text-slate-200">
                                    <div className="whitespace-pre-line">{post.content}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}