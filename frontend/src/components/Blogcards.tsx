import { Link } from "react-router-dom"

interface blogcardtype {
    title: string
    content: string
    image: string
    authorname: string
    publishedDate: string
    id: string
    topic?: string
}

export const Blogcard = ({
    title,
    content,
    authorname,
    publishedDate,
    id,
    image,
    topic
}: blogcardtype) => {
    const label = topic ?? title.split(" ").slice(0, 2).join(" ")
    const excerpt = content.length > 120 ? `${content.slice(0, 120)}...` : content
    const readTime = Math.max(1, Math.ceil(content.split(" ").length / 180))

    return (
        <Link to={`/blog/${id}`} className="group">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.18)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_100px_rgba(14,165,233,0.2)]">
                <div className="absolute inset-0">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950/90" />
                </div>

                <div className="relative flex min-h-[320px] flex-col justify-between px-6 py-7">
                    <div className="space-y-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            {label}
                        </span>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-semibold leading-tight text-white transition duration-300 group-hover:text-sky-100">
                                {title}
                            </h2>
                            <p className="max-w-xl text-sm leading-6 text-slate-200/80">
                                {excerpt}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-200/80">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white shadow-inner shadow-black/10">
                                {authorname[0]?.toUpperCase() ?? "A"}
                            </div>
                            <div>
                                <p className="font-medium text-white">{authorname}</p>
                                <p className="text-xs text-slate-300">{publishedDate}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/80">
                                {readTime} min
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/80">
                                Read story
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}