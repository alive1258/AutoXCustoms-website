export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Server-side tracking with Klaviyo integration",
    excerpt: "Learn how to implement server-side tracking with Klaviyo for better analytics.",
    content: "Full blog content here...",
    image: "/images/blog.png",
    author: {
      name: "Jonny Lundy",
      avatar: "/images/Avatar.png"
    },
    date: "Oct 3, 2025",
    readTime: "5 min read",
    category: "Analytics",
    tags: ["Klaviyo", "Tracking", "Server-side"]
  },
  {
    id: 2,
    title: "Improving React Performance with Code Splitting",
    excerpt: "Boost your React app performance with effective code splitting strategies.",
    content: "Full blog content here...",
    image: "/images/blog.png",
    author: {
      name: "Sarah Chen",
      avatar: "/images/Avatar.png"
    },
    date: "Sep 28, 2025",
    readTime: "7 min read",
    category: "Performance",
    tags: ["React", "Performance", "Code Splitting"]
  },
  // Add more blog posts...
];