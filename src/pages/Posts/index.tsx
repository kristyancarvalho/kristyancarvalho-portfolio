import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import { Skeleton } from "@/components/Skeleton";
import { getPosts, Post } from "@/firebase/firestore";
import { Eye } from 'lucide-react';
import CustomTabs from '@/components/CustomTabs';

interface PostsPageProps {
    theme: 'light' | 'dark';
}

const CACHE_KEY = 'cachedPosts';
const CACHE_VERSION_KEY = 'postsVersion';
const CACHE_EXPIRATION = 1000 * 60 * 60;

type SortType = 'recent' | 'relevant';

export function PostsPage({ theme }: PostsPageProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState<SortType>('recent');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const cachedData = localStorage.getItem(CACHE_KEY);
                const cachedVersion = localStorage.getItem(CACHE_VERSION_KEY);
                const currentVersion = Date.now().toString();
                
                if (cachedData && cachedVersion === currentVersion) {
                    const { posts: cachedPosts, timestamp } = JSON.parse(cachedData);
                    if (Date.now() - timestamp < CACHE_EXPIRATION) {
                        setPosts(cachedPosts.map((post: Post) => ({
                            ...post,
                            createdAt: new Date(post.createdAt)
                        })));
                        setLoading(false);
                        return;
                    }
                }

                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts);

                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    posts: fetchedPosts,
                    timestamp: Date.now()
                }));
                localStorage.setItem(CACHE_VERSION_KEY, currentVersion);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredAndSortedPosts = posts
        .filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortType === 'recent') {
                return b.createdAt.getTime() - a.createdAt.getTime();
            } else {
                return (b.views || 0) - (a.views || 0);
            }
        });
    
    const mostViewedPost = filteredAndSortedPosts.length > 0 && sortType === 'recent'
        ? filteredAndSortedPosts.reduce((prev, current) => 
            (prev.views || 0) > (current.views || 0) ? prev : current
          )
        : null;


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
            <main className={`container mx-auto px-4 pb-8 lg:py-32 min-[320px]:py-24 flex-grow`}>
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
                 
                 <div className="flex justify-start mt-4 mb-2 w-full">
                    <CustomTabs
                        value={sortType}
                        onValueChange={(value) => setSortType(value as SortType)}
                        theme={theme}
                    />
                </div>

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
                            filteredAndSortedPosts.map((post) => (
                                <motion.div key={post.id} variants={itemVariants}>
                                    <Link to={`/post/${post.id}`} className="block">
                                        <div className={`relative ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'} rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
                                            {post.id === mostViewedPost?.id && (
                                                <div className="absolute top-2 right-2 z-10">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${theme === 'dark' ? 'bg-violet-500 text-white' : 'bg-blue-100 text-violet-800'}`}>
                                                        Mais visto
                                                    </span>
                                                </div>
                                            )}
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
                                                <div className="flex justify-between items-center">
                                                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                                                        {formatDate(post.createdAt instanceof Date 
                                                            ? post.createdAt 
                                                            : new Date(post.createdAt))}
                                                    </p>
                                                    <div className={`flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        <span>{post.views || 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </div>
                {filteredAndSortedPosts.length === 0 && (
                    <motion.div 
                        className='flex flex-col items-center justify-center'
                    >
                        <p className="font-semibold text-gray-500 dark:text-gray-400">
                            Nenhum post encontrado
                        </p>
                        <span className='text-gray-500 dark:text-gray-400'>
                            Tente pesquisar por outros termos
                        </span>
                    </motion.div>
                )}
            </main>
        </div>
    );
}