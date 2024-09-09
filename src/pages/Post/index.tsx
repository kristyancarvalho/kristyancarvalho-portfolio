import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, Post } from '@/firebase/firestore';
import { Skeleton } from '@/components/Skeleton';
import Breadcrumbs from '@/components/Breadcrumb';
import { Helmet } from 'react-helmet-async';

interface PostPageProps {
    theme: 'light' | 'dark';
}

export function PostPage({ theme }: PostPageProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                setLoading(true);
                try {
                    const fetchedPost = await getPost(id);
                    setPost(fetchedPost);
                } catch (error) {
                    console.error("Error fetching post:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPost();
    }, [id]);

    const PostSkeleton = () => (
        <>
            <Skeleton className="w-full h-48 md:h-64 rounded-lg mb-4 md:mb-8" />
            <Skeleton className="w-3/4 h-8 md:h-10 mb-2 md:mb-4" />
            <Skeleton className="w-full h-4 md:h-6 mb-4 md:mb-8" />
            <Skeleton className="w-full h-32 md:h-40" />
        </>
    );

    const breadcrumbItems = [
        { label: 'Posts', href: '/posts' },
        { label: post?.title || 'Carregando...', href: '#' },
    ];

    const postUrl = post ? `https://kristyancarvalho.vercel.app/post/${post.id}` : '';

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-zinc-200/50 text-black'}`}>
            <Helmet>
                <title>{post ? post.title : 'Carregando...'}</title>
                <meta name="description" content={post ? post.description : ''} />
                <meta property="og:title" content={post ? post.title : ''} />
                <meta property="og:description" content={post ? post.description : ''} />
                <meta property="og:image" content={post ? post.coverImage : ''} />
                <meta property="og:url" content={postUrl} />
                <meta property="og:type" content="article" />
                <link rel="canonical" href={postUrl} />
            </Helmet>
            <div className="container mx-auto my-4 md:my-12 py-4 md:py-8 min-[320px]:px-2 min-[320px]:my-16">
                <div className="min-h-screen flex items-center justify-center lg:p-4 md:p-8">
                    <main className={`w-full h-full ${theme === 'dark' ? 'bg-black' : 'bg-white'} rounded-lg shadow-lg p-3 md:px-8 lg:px-16 py-4 md:py-8 overflow-auto`}>
                        <Breadcrumbs items={breadcrumbItems} theme={theme} />
                        {loading ? (
                            <PostSkeleton />
                        ) : post ? (
                            <>
                                <img src={post.coverImage} alt={post.title} className="w-full h-48 md:h-64 object-cover rounded-lg mb-4 md:mb-8" />
                                <h1 className={`text-2xl md:text-4xl ${theme === 'dark' ? 'text-white' : 'text-black'} font-bold mb-2 md:mb-4`}>{post.title}</h1>
                                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} min-[320px]:mb-12 mb-4 md:mb-8 text-sm md:text-base`}>{post.description}</p>
                                <div 
                                    className={`${theme === 'dark' ? 'text-white' : 'text-black'} post-content text-sm md:text-base`} 
                                    dangerouslySetInnerHTML={{ __html: post.content }} 
                                />
                            </>
                        ) : (
                            <div>Post não encontrado.</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}