import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcards";
import { Spinner } from "../components/Spinner";
import { useblogs } from "../hooks/useblog";

export const Blogs = () => {
    const { loading, blogs } = useblogs()

    const formatDate = (dateString?: string) => {
        if (!dateString) return new Date().toLocaleDateString();
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Appbar />
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 p-10 shadow-xl shadow-slate-200/70">
                    <div className="mx-auto max-w-4xl space-y-6 text-center">
                        <span className="text-xs uppercase tracking-[0.32em] text-sky-600">
                            Verified stories only
                        </span>
                        <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                            Welcome to <span className="text-slate-900">StoryBook</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
                            Discover beautifully crafted stories with cover art, a clean reading layout, and fast access to every published post.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <a
                            href="/publish"
                            className="inline-flex justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Publish your story
                        </a>
                        <a
                            href="/"
                            className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                        >
                            Home
                        </a>
                    </div>
                </section>

                <section className="mt-12">
                    {loading ? (
                        <div className="flex min-h-[40vh] items-center justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {blogs.map((post) => (
                                <Blogcard
                                    key={post.id}
                                    id={post.id}
                                    title={post.title}
                                    content={post.content}
                                    image={post.image}
                                    authorname={post.author.name}
                                    publishedDate={formatDate(post.createdAt)}
                                    topic={post.title.split(" ").slice(0, 2).join(" ")}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}
