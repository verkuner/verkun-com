import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NewsArticle from "@/components/NewsArticle";
import { posts, getPost } from "@/lib/data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "News | 北京凡鲲智能科技有限公司" };
  return {
    title: `${post.title.zh} | 北京凡鲲智能科技有限公司`,
    description: post.excerpt.zh,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <NewsArticle post={post} />;
}
