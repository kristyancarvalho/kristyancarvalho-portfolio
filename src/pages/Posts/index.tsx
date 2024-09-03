import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import { Skeleton } from "@/components/Skeleton";
import { getPosts, Post } from "@/firebase/firestore";

interface PostsPageProps {
    theme: 'light' | 'dark';
}

export function PostsPage({ theme }: PostsPageProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const PostSkeleton = () => (
        <div className={`${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'} rounded-lg overflow-hidden shadow-md`}>
            <Skeleton className="w-full h-48" />
            <div className="p-4">
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-1/4 h-4" />
            </div>
        </div>
    );

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className={`transition-colors duration-300 ease-in-out ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-200/50'} min-h-screen flex flex-col`}>
            <main className={`container mx-auto px-4 pb-8 pt-28 flex-grow`}>
            <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "just", duration: 0.5 }}
                    className="flex"
                >
                    <code className={`text-3xl px-2 py-1 mb-8 ${theme === 'dark' ? 'text-neutral-500 bg-neutral-800/50' : 'text-neutral-600 bg-neutral-300/50'} rounded-sm overflow-hidden`}>
                        /posts
                    </code>
                </motion.span>
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    placeholder="Pesquisar posts..."
                    theme={theme}
                />
                <div id="posts" className="py-6 w-full">
                    <motion.div 
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 min-[320px]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        
                        {loading ? (
                            [...Array(6)].map((_, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <PostSkeleton />
                                </motion.div>
                            ))
                        ) : (
                            filteredPosts.map((post) => (
                                <motion.div key={post.id} variants={itemVariants}>
                                    <Link to={`/post/${post.id}`} className="block">
                                        <div className={`${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'} rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
                                            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                                <img
                                                    src={post.coverImage} 
                                                    alt={`Capa de ${post.title}`} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-2 line-clamp-2`}>{post.title}</h2>
                                                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2 line-clamp-2`}>{post.description}</p>
                                                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>
                                                    {formatDate(post.createdAt instanceof Date 
                                                    ? post.createdAt 
                                                    : new Date(post.createdAt))}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}