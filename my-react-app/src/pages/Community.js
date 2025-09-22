import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useEffect, useState } from 'react';
// import { collection, query, getDocs, addDoc, updateDoc, doc, orderBy, where, serverTimestamp } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { CommunityPost, CommunityComment } from '@/types';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { toast } from 'sonner';
// import { format } from 'date-fns';
// import { Plus, Heart, MessageCircle, Share2, HelpCircle, Lightbulb, Camera, Award, Search, Filter } from 'lucide-react';
// interface PostFormData {
//   title: string;
//   content: string;
//   category: 'question' | 'tip' | 'showcase' | 'problem';
//   tags: string;
// }
// interface CommentFormData {
//   content: string;
// }
// export default function Community() {
//   const { currentUser } = useAuth();
//   const [posts, setPosts] = useState<CommunityPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingPost, setIsAddingPost] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredPosts, setFilteredPosts] = useState<CommunityPost[]>([]);
//   const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<PostFormData>();
//   // Sample community posts
//   const samplePosts: CommunityPost[] = [
//     {
//       id: '1',
//       userId: 'user1',
//       authorName: 'GardenMaster',
//       title: 'How to deal with aphids on tomatoes?',
//       content: 'I\'ve noticed small green insects clustering on my tomato plants. They seem to be affecting the new growth. What\'s the best organic way to handle this situation?',
//       category: 'question',
//       tags: ['tomatoes', 'pests', 'organic', 'aphids'],
//       likes: 12,
//       comments: [
//         {
//           id: 'c1',
//           userId: 'user2',
//           authorName: 'OrganicGuru',
//           content: 'Try spraying with a mixture of water and mild dish soap. Works great for aphids!',
//           createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
//         },
//         {
//           id: 'c2',
//           userId: 'user3',
//           authorName: 'NaturalGardener',
//           content: 'Ladybugs are natural predators of aphids. You can buy them online or encourage them with diverse plantings.',
//           createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
//         }
//       ],
//       createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
//     },
//     {
//       id: '2',
//       userId: 'user2',
//       authorName: 'OrganicGuru',
//       title: 'My Secret to Perfect Compost',
//       content: 'After years of experimenting, I\'ve found the perfect compost recipe: 3 parts brown materials (leaves, paper) to 1 part green materials (kitchen scraps, grass clippings). Turn weekly and keep it as moist as a wrung-out sponge. Ready in 3-4 months!',
//       category: 'tip',
//       tags: ['composting', 'organic', 'soil', 'tips'],
//       likes: 45,
//       comments: [
//         {
//           id: 'c3',
//           userId: 'user1',
//           authorName: 'GardenMaster',
//           content: 'Great tip! How do you handle the smell issue?',
//           createdAt: new Date(Date.now() - 30 * 60 * 1000)
//         }
//       ],
//       createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
//     },
//     {
//       id: '3',
//       userId: 'user4',
//       authorName: 'VeggieLover',
//       title: 'This Year\'s Harvest Results!',
//       content: 'Just finished harvesting my summer vegetables. Got 50 lbs of tomatoes, 20 lbs of peppers, and countless herbs from my 4x8 raised bed. So proud of this year\'s results!',
//       imageUrl: '/api/placeholder/400/300',
//       category: 'showcase',
//       tags: ['harvest', 'vegetables', 'success', 'raised-beds'],
//       likes: 78,
//       comments: [
//         {
//           id: 'c4',
//           userId: 'user5',
//           authorName: 'NewGardener',
//           content: 'Wow! That\'s amazing yield. What varieties did you grow?',
//           createdAt: new Date(Date.now() - 45 * 60 * 1000)
//         },
//         {
//           id: 'c5',
//           userId: 'user2',
//           authorName: 'OrganicGuru',
//           content: 'Impressive! Did you use any special fertilizers?',
//           createdAt: new Date(Date.now() - 20 * 60 * 1000)
//         }
//       ],
//       createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000)
//     },
//     {
//       id: '4',
//       userId: 'user5',
//       authorName: 'NewGardener',
//       title: 'Help! My basil leaves are turning yellow',
//       content: 'I\'m a beginner gardener and my basil plant\'s leaves are turning yellow from the bottom up. I water it every day and it gets morning sun. What am I doing wrong?',
//       category: 'problem',
//       tags: ['basil', 'herbs', 'yellowing', 'beginner'],
//       likes: 8,
//       comments: [
//         {
//           id: 'c6',
//           userId: 'user2',
//           authorName: 'OrganicGuru',
//           content: 'Sounds like overwatering. Basil prefers to dry out between waterings. Try watering only when the top inch of soil is dry.',
//           createdAt: new Date(Date.now() - 15 * 60 * 1000)
//         }
//       ],
//       createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
//     }
//   ];
//   useEffect(() => {
//     if (!currentUser) return;
//     const fetchPosts = async () => {
//       try {
//         // In a real app, this would fetch from Firestore
//         setPosts(samplePosts);
//         setFilteredPosts(samplePosts);
//       } catch (error) {
//         console.error('Error fetching community posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, [currentUser]);
//   useEffect(() => {
//     let filtered = posts;
//     if (searchTerm) {
//       filtered = filtered.filter(post =>
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(post => post.category === selectedCategory);
//     }
//     setFilteredPosts(filtered);
//   }, [searchTerm, selectedCategory, posts]);
//   const onSubmit = async (data: PostFormData) => {
//     if (!currentUser) return;
//     setIsAddingPost(true);
//     try {
//       const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
//       const postData = {
//         userId: currentUser.id,
//         authorName: currentUser.displayName || currentUser.email || 'Anonymous',
//         title: data.title,
//         content: data.content,
//         category: data.category,
//         tags: tagsArray,
//         likes: 0,
//         comments: [],
//         createdAt: serverTimestamp()
//       };
//       // In a real app, this would save to Firestore
//       const newPost: CommunityPost = {
//         id: Date.now().toString(),
//         ...postData,
//         createdAt: new Date()
//       } as CommunityPost;
//       setPosts([newPost, ...posts]);
//       setFilteredPosts([newPost, ...filteredPosts]);
//       reset();
//       toast.success('Post shared with the community!');
//     } catch (error) {
//       console.error('Error creating post:', error);
//       toast.error('Failed to share post');
//     } finally {
//       setIsAddingPost(false);
//     }
//   };
//   const likePost = async (postId: string) => {
//     try {
//       const updatedPosts = posts.map(post => {
//         if (post.id === postId) {
//           return { ...post, likes: post.likes + 1 };
//         }
//         return post;
//       });
//       setPosts(updatedPosts);
//       setFilteredPosts(updatedPosts.filter(post => 
//         selectedCategory === 'all' || post.category === selectedCategory
//       ));
//       toast.success('Post liked!');
//     } catch (error) {
//       console.error('Error liking post:', error);
//       toast.error('Failed to like post');
//     }
//   };
//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case 'question': return <HelpCircle className="h-4 w-4 text-blue-500" />;
//       case 'tip': return <Lightbulb className="h-4 w-4 text-yellow-500" />;
//       case 'showcase': return <Award className="h-4 w-4 text-green-500" />;
//       case 'problem': return <MessageCircle className="h-4 w-4 text-red-500" />;
//       default: return <MessageCircle className="h-4 w-4 text-gray-500" />;
//     }
//   };
//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case 'question': return 'bg-blue-100 text-blue-800';
//       case 'tip': return 'bg-yellow-100 text-yellow-800';
//       case 'showcase': return 'bg-green-100 text-green-800';
//       case 'problem': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading community...</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Garden Community</h1>
//           <p className="text-muted-foreground">
//             Share knowledge, ask questions, and connect with fellow gardeners.
//           </p>
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Share Post
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[600px]">
//             <DialogHeader>
//               <DialogTitle>Share with Community</DialogTitle>
//               <DialogDescription>
//                 Ask a question, share a tip, or showcase your garden success.
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="category">Post Type *</Label>
//                 <Select onValueChange={(value) => setValue('category', value as 'question' | 'tip' | 'showcase' | 'problem')}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="What are you sharing?" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="question">Question - Ask for help</SelectItem>
//                     <SelectItem value="tip">Tip - Share knowledge</SelectItem>
//                     <SelectItem value="showcase">Showcase - Show off results</SelectItem>
//                     <SelectItem value="problem">Problem - Need troubleshooting</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.category && (
//                   <p className="text-sm text-red-500">Please select a post type</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="title">Title *</Label>
//                 <Input
//                   id="title"
//                   placeholder="Give your post a descriptive title..."
//                   {...register('title', { required: 'Title is required' })}
//                 />
//                 {errors.title && (
//                   <p className="text-sm text-red-500">{errors.title.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="content">Content *</Label>
//                 <Textarea
//                   id="content"
//                   placeholder="Share your thoughts, questions, or experiences..."
//                   rows={6}
//                   {...register('content', { required: 'Content is required' })}
//                 />
//                 {errors.content && (
//                   <p className="text-sm text-red-500">{errors.content.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="tags">Tags (comma-separated)</Label>
//                 <Input
//                   id="tags"
//                   placeholder="e.g., tomatoes, organic, pests, beginners"
//                   {...register('tags')}
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Add relevant tags to help others find your post
//                 </p>
//               </div>
//               <div className="flex space-x-2">
//                 <Button type="submit" disabled={isAddingPost} className="flex-1">
//                   {isAddingPost ? 'Sharing...' : 'Share Post'}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//       {/* Search and Filter */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search posts by title, content, or tags..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//         <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//           <SelectTrigger className="w-full sm:w-48">
//             <SelectValue placeholder="Filter by category" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Posts</SelectItem>
//             <SelectItem value="question">Questions</SelectItem>
//             <SelectItem value="tip">Tips</SelectItem>
//             <SelectItem value="showcase">Showcases</SelectItem>
//             <SelectItem value="problem">Problems</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       {/* Community Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-blue-600">
//               {posts.filter(p => p.category === 'question').length}
//             </div>
//             <p className="text-sm text-muted-foreground">Questions</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-yellow-600">
//               {posts.filter(p => p.category === 'tip').length}
//             </div>
//             <p className="text-sm text-muted-foreground">Tips Shared</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-green-600">
//               {posts.filter(p => p.category === 'showcase').length}
//             </div>
//             <p className="text-sm text-muted-foreground">Showcases</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-purple-600">
//               {posts.reduce((sum, p) => sum + p.likes, 0)}
//             </div>
//             <p className="text-sm text-muted-foreground">Total Likes</p>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Posts Feed */}
//       <div className="space-y-4">
//         {filteredPosts.length === 0 ? (
//           <div className="text-center py-12">
//             <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
//             <p className="text-muted-foreground">
//               {searchTerm || selectedCategory !== 'all' 
//                 ? 'Try adjusting your search or filters.'
//                 : 'Be the first to share with the community!'
//               }
//             </p>
//           </div>
//         ) : (
//           filteredPosts.map((post) => (
//             <Card key={post.id}>
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center space-x-3">
//                     <Avatar>
//                       <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.authorName}`} />
//                       <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-medium">{post.authorName}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {format(post.createdAt, 'MMM d, yyyy • h:mm a')}
//                       </p>
//                     </div>
//                   </div>
//                   <Badge className={getCategoryColor(post.category)}>
//                     <span className="flex items-center">
//                       {getCategoryIcon(post.category)}
//                       <span className="ml-1 capitalize">{post.category}</span>
//                     </span>
//                   </Badge>
//                 </div>
//                 <CardTitle className="text-xl">{post.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground mb-4 leading-relaxed">
//                   {post.content}
//                 </p>
//                 {post.imageUrl && (
//                   <div className="mb-4">
//                     <img 
//                       src={post.imageUrl} 
//                       alt="Post image" 
//                       className="rounded-lg max-h-64 w-full object-cover"
//                     />
//                   </div>
//                 )}
//                 {post.tags.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {post.tags.map((tag, index) => (
//                       <Badge key={index} variant="outline" className="text-xs">
//                         #{tag}
//                       </Badge>
//                     ))}
//                   </div>
//                 )}
//                 <div className="flex items-center justify-between pt-4 border-t">
//                   <div className="flex items-center space-x-4">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => likePost(post.id)}
//                       className="text-muted-foreground hover:text-red-500"
//                     >
//                       <Heart className="h-4 w-4 mr-1" />
//                       {post.likes}
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-muted-foreground"
//                     >
//                       <MessageCircle className="h-4 w-4 mr-1" />
//                       {post.comments.length}
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-muted-foreground"
//                     >
//                       <Share2 className="h-4 w-4 mr-1" />
//                       Share
//                     </Button>
//                   </div>
//                 </div>
//                 {/* Comments Section */}
//                 {post.comments.length > 0 && (
//                   <div className="mt-4 pt-4 border-t space-y-3">
//                     <h4 className="font-medium text-sm">Comments</h4>
//                     {post.comments.map((comment) => (
//                       <div key={comment.id} className="flex space-x-3">
//                         <Avatar className="h-6 w-6">
//                           <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.authorName}`} />
//                           <AvatarFallback className="text-xs">{comment.authorName.charAt(0)}</AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1">
//                           <div className="bg-gray-50 rounded-lg p-3">
//                             <p className="font-medium text-sm">{comment.authorName}</p>
//                             <p className="text-sm text-muted-foreground">{comment.content}</p>
//                           </div>
//                           <p className="text-xs text-muted-foreground mt-1">
//                             {format(comment.createdAt, 'MMM d, h:mm a')}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { toast } from 'sonner';
// import { Plus, Heart, MessageCircle, Share2, HelpCircle, Lightbulb, Award, Search } from 'lucide-react';
// interface CommunityPost {
//   id: string;
//   userId: string;
//   authorName: string;
//   title: string;
//   content: string;
//   category: 'question' | 'tip' | 'showcase' | 'problem';
//   tags: string[];
//   likes: number;
//   comments: CommunityComment[];
//   imageUrl?: string;
//   createdAt: Date;
// }
// interface CommunityComment {
//   id: string;
//   userId: string;
//   authorName: string;
//   content: string;
//   createdAt: Date;
// }
// interface PostFormData {
//   title: string;
//   content: string;
//   category: 'question' | 'tip' | 'showcase' | 'problem';
//   tags: string;
// }
// export default function Community() {
//   const { currentUser } = useAuth();
//   const [posts, setPosts] = useState<CommunityPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingPost, setIsAddingPost] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredPosts, setFilteredPosts] = useState<CommunityPost[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   // Form state
//   const [formData, setFormData] = useState<PostFormData>({
//     title: '',
//     content: '',
//     category: 'question',
//     tags: ''
//   });
//   // Sample community posts
//   const samplePosts: CommunityPost[] = [
//     {
//       id: '1',
//       userId: 'user1',
//       authorName: 'GardenMaster',
//       title: 'How to deal with aphids on tomatoes?',
//       content: 'I\'ve noticed small green insects clustering on my tomato plants. They seem to be affecting the new growth. What\'s the best organic way to handle this situation?',
//       category: 'question',
//       tags: ['tomatoes', 'pests', 'organic', 'aphids'],
//       likes: 12,
//       comments: [
//         {
//           id: 'c1',
//           userId: 'user2',
//           authorName: 'OrganicGuru',
//           content: 'Try spraying with a mixture of water and mild dish soap. Works great for aphids!',
//           createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
//         },
//         {
//           id: 'c2',
//           userId: 'user3',
//           authorName: 'NaturalGardener',
//           content: 'Ladybugs are natural predators of aphids. You can buy them online or encourage them with diverse plantings.',
//           createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
//         }
//       ],
//       createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
//     },
//     {
//       id: '2',
//       userId: 'user2',
//       authorName: 'OrganicGuru',
//       title: 'My Secret to Perfect Compost',
//       content: 'After years of experimenting, I\'ve found the perfect compost recipe: 3 parts brown materials (leaves, paper) to 1 part green materials (kitchen scraps, grass clippings). Turn weekly and keep it as moist as a wrung-out sponge. Ready in 3-4 months!',
//       category: 'tip',
//       tags: ['composting', 'organic', 'soil', 'tips'],
//       likes: 45,
//       comments: [
//         {
//           id: 'c3',
//           userId: 'user1',
//           authorName: 'GardenMaster',
//           content: 'Great tip! How do you handle the smell issue?',
//           createdAt: new Date(Date.now() - 30 * 60 * 1000)
//         }
//       ],
//       createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
//     },
//     {
//       id: '3',
//       userId: 'user4',
//       authorName: 'VeggieLover',
//       title: 'This Year\'s Harvest Results!',
//       content: 'Just finished harvesting my summer vegetables. Got 50 lbs of tomatoes, 20 lbs of peppers, and countless herbs from my 4x8 raised bed. So proud of this year\'s results!',
//       category: 'showcase',
//       tags: ['harvest', 'vegetables', 'success', 'raised-beds'],
//       likes: 78,
//       comments: [
//         {
//           id: 'c4',
//           userId: 'user5',
//           authorName: 'NewGardener',
//           content: 'Wow! That\'s amazing yield. What varieties did you grow?',
//           createdAt: new Date(Date.now() - 45 * 60 * 1000)
//         },
//         {
//           id: 'c5',
//           userId: 'user2',
//           authorName: 'OrganicGuru',
//           content: 'Impressive! Did you use any special fertilizers?',
//           createdAt: new Date(Date.now() - 20 * 60 * 1000)
//         }
//       ],
//       createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000)
//     },
//     {
//       id: '4',
//       userId: 'user5',
//       authorName: 'NewGardener',
//       title: 'Help! My basil leaves are turning yellow',
//       content: 'I\'m a beginner gardener and my basil plant\'s leaves are turning yellow from the bottom up. I water it every day and it gets morning sun. What am I doing wrong?',
//       category: 'problem',
//       tags: ['basil', 'herbs', 'yellowing', 'beginner'],
//       likes: 8,
//       comments: [
//         {
//           id: 'c6',
//           userId: 'user2',
//           authorName: 'OrganicGuru',
//           content: 'Sounds like overwatering. Basil prefers to dry out between waterings. Try watering only when the top inch of soil is dry.',
//           createdAt: new Date(Date.now() - 15 * 60 * 1000)
//         }
//       ],
//       createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
//     }
//   ];
//   useEffect(() => {
//     if (!currentUser) return;
//     const fetchPosts = async () => {
//       try {
//         // Using sample data instead of Firebase for now
//         setPosts(samplePosts);
//         setFilteredPosts(samplePosts);
//       } catch (error) {
//         console.error('Error fetching community posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, [currentUser]);
//   useEffect(() => {
//     let filtered = posts;
//     if (searchTerm) {
//       filtered = filtered.filter(post =>
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(post => post.category === selectedCategory);
//     }
//     setFilteredPosts(filtered);
//   }, [searchTerm, selectedCategory, posts]);
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!currentUser) return;
//     if (!formData.title || !formData.content) {
//       toast.error('Please fill in all required fields');
//       return;
//     }
//     setIsAddingPost(true);
//     try {
//       const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
//       const newPost: CommunityPost = {
//         id: Date.now().toString(),
//         userId: currentUser.uid,
//         authorName: currentUser.displayName || currentUser.email || 'Anonymous',
//         title: formData.title,
//         content: formData.content,
//         category: formData.category,
//         tags: tagsArray,
//         likes: 0,
//         comments: [],
//         createdAt: new Date()
//       };
//       setPosts([newPost, ...posts]);
//       setFilteredPosts([newPost, ...filteredPosts]);
//       // Reset form
//       setFormData({
//         title: '',
//         content: '',
//         category: 'question',
//         tags: ''
//       });
//       setIsDialogOpen(false);
//       toast.success('Post shared with the community!');
//     } catch (error) {
//       console.error('Error creating post:', error);
//       toast.error('Failed to share post');
//     } finally {
//       setIsAddingPost(false);
//     }
//   };
//   const likePost = async (postId: string) => {
//     try {
//       const updatedPosts = posts.map(post => {
//         if (post.id === postId) {
//           return { ...post, likes: post.likes + 1 };
//         }
//         return post;
//       });
//       setPosts(updatedPosts);
//       setFilteredPosts(updatedPosts.filter(post => 
//         selectedCategory === 'all' || post.category === selectedCategory
//       ));
//       toast.success('Post liked!');
//     } catch (error) {
//       console.error('Error liking post:', error);
//       toast.error('Failed to like post');
//     }
//   };
//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case 'question': return <HelpCircle className="h-4 w-4 text-blue-500" />;
//       case 'tip': return <Lightbulb className="h-4 w-4 text-yellow-500" />;
//       case 'showcase': return <Award className="h-4 w-4 text-green-500" />;
//       case 'problem': return <MessageCircle className="h-4 w-4 text-red-500" />;
//       default: return <MessageCircle className="h-4 w-4 text-gray-500" />;
//     }
//   };
//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case 'question': return 'bg-blue-100 text-blue-800';
//       case 'tip': return 'bg-yellow-100 text-yellow-800';
//       case 'showcase': return 'bg-green-100 text-green-800';
//       case 'problem': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };
//   const formatDate = (date: Date) => {
//     const now = new Date();
//     const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
//     if (diffInHours < 1) {
//       const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
//       return `${diffInMinutes} minutes ago`;
//     } else if (diffInHours < 24) {
//       return `${diffInHours} hours ago`;
//     } else {
//       return date.toLocaleDateString();
//     }
//   };
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading community...</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Garden Community</h1>
//           <p className="text-muted-foreground">
//             Share knowledge, ask questions, and connect with fellow gardeners.
//           </p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4 " />
//               Share Post
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[600px] bg-white">
//             <DialogHeader >
//               <DialogTitle>Share with Community</DialogTitle>
//               <DialogDescription>
//                 Ask a question, share a tip, or showcase your garden success.
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-4 ">
//               <div className="space-y-2">
//                 <Label htmlFor="category">Post Type *</Label>
//                 <Select 
//                   value={formData.category} 
//                   onValueChange={(value) => setFormData({...formData, category: value as 'question' | 'tip' | 'showcase' | 'problem'})}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="What are you sharing?" />
//                   </SelectTrigger>
//                   <SelectContent className='bg-black text-white'>
//                     <SelectItem value="question">Question - Ask for help</SelectItem>
//                     <SelectItem value="tip">Tip - Share knowledge</SelectItem>
//                     <SelectItem value="showcase">Showcase - Show off results</SelectItem>
//                     <SelectItem value="problem">Problem - Need troubleshooting</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="title">Title *</Label>
//                 <Input
//                   id="title"
//                   placeholder="Give your post a descriptive title..."
//                   value={formData.title}
//                   onChange={(e) => setFormData({...formData, title: e.target.value})}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="content">Content *</Label>
//                 <Textarea
//                   id="content"
//                   placeholder="Share your thoughts, questions, or experiences..."
//                   rows={6}
//                   value={formData.content}
//                   onChange={(e) => setFormData({...formData, content: e.target.value})}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="tags">Tags (comma-separated)</Label>
//                 <Input
//                   id="tags"
//                   placeholder="e.g., tomatoes, organic, pests, beginners"
//                   value={formData.tags}
//                   onChange={(e) => setFormData({...formData, tags: e.target.value})}
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Add relevant tags to help others find your post
//                 </p>
//               </div>
//               <div className="flex space-x-2">
//                 <Button type="submit" disabled={isAddingPost} className="flex-1">
//                   {isAddingPost ? 'Sharing...' : 'Share Post'}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//       {/* Search and Filter */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search posts by title, content, or tags..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//         <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//           <SelectTrigger className="w-full sm:w-48">
//             <SelectValue placeholder="Filter by category" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Posts</SelectItem>
//             <SelectItem value="question">Questions</SelectItem>
//             <SelectItem value="tip">Tips</SelectItem>
//             <SelectItem value="showcase">Showcases</SelectItem>
//             <SelectItem value="problem">Problems</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       {/* Community Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-blue-600">
//               {posts.filter(p => p.category === 'question').length}
//             </div>
//             <p className="text-sm text-muted-foreground">Questions</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-yellow-600">
//               {posts.filter(p => p.category === 'tip').length}
//             </div>
//             <p className="text-sm text-muted-foreground">Tips Shared</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-green-600">
//               {posts.filter(p => p.category === 'showcase').length}
//             </div>
//             <p className="text-sm text-muted-foreground">Showcases</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-purple-600">
//               {posts.reduce((sum, p) => sum + p.likes, 0)}
//             </div>
//             <p className="text-sm text-muted-foreground">Total Likes</p>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Posts Feed */}
//       <div className="space-y-4">
//         {filteredPosts.length === 0 ? (
//           <div className="text-center py-12">
//             <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
//             <p className="text-muted-foreground">
//               {searchTerm || selectedCategory !== 'all' 
//                 ? 'Try adjusting your search or filters.'
//                 : 'Be the first to share with the community!'
//               }
//             </p>
//           </div>
//         ) : (
//           filteredPosts.map((post) => (
//             <Card key={post.id}>
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center space-x-3">
//                     <Avatar>
//                       <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.authorName}`} />
//                       <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-medium">{post.authorName}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {formatDate(post.createdAt)}
//                       </p>
//                     </div>
//                   </div>
//                   <Badge className={getCategoryColor(post.category)}>
//                     <span className="flex items-center">
//                       {getCategoryIcon(post.category)}
//                       <span className="ml-1 capitalize">{post.category}</span>
//                     </span>
//                   </Badge>
//                 </div>
//                 <CardTitle className="text-xl">{post.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground mb-4 leading-relaxed">
//                   {post.content}
//                 </p>
//                 {post.imageUrl && (
//                   <div className="mb-4">
//                     <img 
//                       src={post.imageUrl} 
//                       alt="Post image" 
//                       className="rounded-lg max-h-64 w-full object-cover"
//                     />
//                   </div>
//                 )}
//                 {post.tags.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {post.tags.map((tag, index) => (
//                       <Badge key={index} variant="outline" className="text-xs">
//                         #{tag}
//                       </Badge>
//                     ))}
//                   </div>
//                 )}
//                 <div className="flex items-center justify-between pt-4 border-t">
//                   <div className="flex items-center space-x-4">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => likePost(post.id)}
//                       className="text-muted-foreground hover:text-red-500"
//                     >
//                       <Heart className="h-4 w-4 mr-1" />
//                       {post.likes}
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-muted-foreground"
//                     >
//                       <MessageCircle className="h-4 w-4 mr-1" />
//                       {post.comments.length}
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-muted-foreground"
//                     >
//                       <Share2 className="h-4 w-4 mr-1" />
//                       Share
//                     </Button>
//                   </div>
//                 </div>
//                 {/* Comments Section */}
//                 {post.comments.length > 0 && (
//                   <div className="mt-4 pt-4 border-t space-y-3">
//                     <h4 className="font-medium text-sm">Comments</h4>
//                     {post.comments.map((comment) => (
//                       <div key={comment.id} className="flex space-x-3">
//                         <Avatar className="h-6 w-6">
//                           <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.authorName}`} />
//                           <AvatarFallback className="text-xs">{comment.authorName.charAt(0)}</AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1">
//                           <div className="bg-gray-50 rounded-lg p-3">
//                             <p className="font-medium text-sm">{comment.authorName}</p>
//                             <p className="text-sm text-muted-foreground">{comment.content}</p>
//                           </div>
//                           <p className="text-xs text-muted-foreground mt-1">
//                             {formatDate(comment.createdAt)}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Heart, MessageCircle, Share2, HelpCircle, Lightbulb, Award, Search } from 'lucide-react';
export default function Community() {
    const { currentUser } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'question',
        tags: ''
    });
    // Sample community posts
    const samplePosts = [
        {
            id: '1',
            userId: 'user1',
            authorName: 'GardenMaster',
            title: 'How to deal with aphids on tomatoes?',
            content: 'I\'ve noticed small green insects clustering on my tomato plants. They seem to be affecting the new growth. What\'s the best organic way to handle this situation?',
            category: 'question',
            tags: ['tomatoes', 'pests', 'organic', 'aphids'],
            likes: 12,
            comments: [
                {
                    id: 'c1',
                    userId: 'user2',
                    authorName: 'OrganicGuru',
                    content: 'Try spraying with a mixture of water and mild dish soap. Works great for aphids!',
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
                },
                {
                    id: 'c2',
                    userId: 'user3',
                    authorName: 'NaturalGardener',
                    content: 'Ladybugs are natural predators of aphids. You can buy them online or encourage them with diverse plantings.',
                    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
                }
            ],
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
        },
        {
            id: '2',
            userId: 'user2',
            authorName: 'OrganicGuru',
            title: 'My Secret to Perfect Compost',
            content: 'After years of experimenting, I\'ve found the perfect compost recipe: 3 parts brown materials (leaves, paper) to 1 part green materials (kitchen scraps, grass clippings). Turn weekly and keep it as moist as a wrung-out sponge. Ready in 3-4 months!',
            category: 'tip',
            tags: ['composting', 'organic', 'soil', 'tips'],
            likes: 45,
            comments: [
                {
                    id: 'c3',
                    userId: 'user1',
                    authorName: 'GardenMaster',
                    content: 'Great tip! How do you handle the smell issue?',
                    createdAt: new Date(Date.now() - 30 * 60 * 1000)
                }
            ],
            createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
        },
        {
            id: '3',
            userId: 'user4',
            authorName: 'VeggieLover',
            title: 'This Year\'s Harvest Results!',
            content: 'Just finished harvesting my summer vegetables. Got 50 lbs of tomatoes, 20 lbs of peppers, and countless herbs from my 4x8 raised bed. So proud of this year\'s results!',
            category: 'showcase',
            tags: ['harvest', 'vegetables', 'success', 'raised-beds'],
            likes: 78,
            comments: [
                {
                    id: 'c4',
                    userId: 'user5',
                    authorName: 'NewGardener',
                    content: 'Wow! That\'s amazing yield. What varieties did you grow?',
                    createdAt: new Date(Date.now() - 45 * 60 * 1000)
                },
                {
                    id: 'c5',
                    userId: 'user2',
                    authorName: 'OrganicGuru',
                    content: 'Impressive! Did you use any special fertilizers?',
                    createdAt: new Date(Date.now() - 20 * 60 * 1000)
                }
            ],
            createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000)
        },
        {
            id: '4',
            userId: 'user5',
            authorName: 'NewGardener',
            title: 'Help! My basil leaves are turning yellow',
            content: 'I\'m a beginner gardener and my basil plant\'s leaves are turning yellow from the bottom up. I water it every day and it gets morning sun. What am I doing wrong?',
            category: 'problem',
            tags: ['basil', 'herbs', 'yellowing', 'beginner'],
            likes: 8,
            comments: [
                {
                    id: 'c6',
                    userId: 'user2',
                    authorName: 'OrganicGuru',
                    content: 'Sounds like overwatering. Basil prefers to dry out between waterings. Try watering only when the top inch of soil is dry.',
                    createdAt: new Date(Date.now() - 15 * 60 * 1000)
                }
            ],
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
        }
    ];
    useEffect(() => {
        if (!currentUser)
            return;
        const fetchPosts = async () => {
            try {
                // Using sample data instead of Firebase for now
                setPosts(samplePosts);
                setFilteredPosts(samplePosts);
            }
            catch (error) {
                console.error('Error fetching community posts:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [currentUser]);
    useEffect(() => {
        let filtered = posts;
        if (searchTerm) {
            filtered = filtered.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
        }
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => post.category === selectedCategory);
        }
        setFilteredPosts(filtered);
    }, [searchTerm, selectedCategory, posts]);
    const showToast = (message, type = 'success') => {
        // Simple alert for now since sonner might not be properly configured
        alert(message);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser)
            return;
        if (!formData.title || !formData.content) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        setIsAddingPost(true);
        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            const newPost = {
                id: Date.now().toString(),
                userId: currentUser.uid,
                authorName: currentUser.displayName || currentUser.email || 'Anonymous',
                title: formData.title,
                content: formData.content,
                category: formData.category,
                tags: tagsArray,
                likes: 0,
                comments: [],
                createdAt: new Date()
            };
            setPosts([newPost, ...posts]);
            setFilteredPosts([newPost, ...filteredPosts]);
            // Reset form
            setFormData({
                title: '',
                content: '',
                category: 'question',
                tags: ''
            });
            setIsDialogOpen(false);
            showToast('Post shared with the community!');
        }
        catch (error) {
            console.error('Error creating post:', error);
            showToast('Failed to share post', 'error');
        }
        finally {
            setIsAddingPost(false);
        }
    };
    const likePost = async (postId) => {
        try {
            const updatedPosts = posts.map(post => {
                if (post.id === postId) {
                    return { ...post, likes: post.likes + 1 };
                }
                return post;
            });
            setPosts(updatedPosts);
            setFilteredPosts(updatedPosts.filter(post => selectedCategory === 'all' || post.category === selectedCategory));
            showToast('Post liked!');
        }
        catch (error) {
            console.error('Error liking post:', error);
            showToast('Failed to like post', 'error');
        }
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'question': return _jsx(HelpCircle, { className: "h-4 w-4 text-blue-500" });
            case 'tip': return _jsx(Lightbulb, { className: "h-4 w-4 text-yellow-500" });
            case 'showcase': return _jsx(Award, { className: "h-4 w-4 text-green-500" });
            case 'problem': return _jsx(MessageCircle, { className: "h-4 w-4 text-red-500" });
            default: return _jsx(MessageCircle, { className: "h-4 w-4 text-gray-500" });
        }
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case 'question': return 'bg-blue-100 text-blue-800';
            case 'tip': return 'bg-yellow-100 text-yellow-800';
            case 'showcase': return 'bg-green-100 text-green-800';
            case 'problem': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const formatDate = (date) => {
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        if (diffInHours < 1) {
            const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
            return `${diffInMinutes} minutes ago`;
        }
        else if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        }
        else {
            return date.toLocaleDateString();
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto" }), _jsx("p", { className: "mt-2 text-muted-foreground", children: "Loading community..." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Garden Community" }), _jsx("p", { className: "text-muted-foreground", children: "Share knowledge, ask questions, and connect with fellow gardeners." })] }), _jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-green-600 hover:bg-green-700 text-white", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Share Post"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[600px] bg-white", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Share with Community" }), _jsx(DialogDescription, { children: "Ask a question, share a tip, or showcase your garden success." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "category", children: "Post Type *" }), _jsxs(Select, { value: formData.category, onValueChange: (value) => setFormData({ ...formData, category: value }), children: [_jsx(SelectTrigger, { className: "bg-white", children: _jsx(SelectValue, { placeholder: "What are you sharing?" }) }), _jsxs(SelectContent, { className: "bg-white border border-gray-200", children: [_jsx(SelectItem, { value: "question", children: "Question - Ask for help" }), _jsx(SelectItem, { value: "tip", children: "Tip - Share knowledge" }), _jsx(SelectItem, { value: "showcase", children: "Showcase - Show off results" }), _jsx(SelectItem, { value: "problem", children: "Problem - Need troubleshooting" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", children: "Title *" }), _jsx(Input, { id: "title", placeholder: "Give your post a descriptive title...", value: formData.title, onChange: (e) => setFormData({ ...formData, title: e.target.value }), className: "bg-white" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "content", children: "Content *" }), _jsx(Textarea, { id: "content", placeholder: "Share your thoughts, questions, or experiences...", rows: 6, value: formData.content, onChange: (e) => setFormData({ ...formData, content: e.target.value }), className: "bg-white" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "tags", children: "Tags (comma-separated)" }), _jsx(Input, { id: "tags", placeholder: "e.g., tomatoes, organic, pests, beginners", value: formData.tags, onChange: (e) => setFormData({ ...formData, tags: e.target.value }), className: "bg-white" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Add relevant tags to help others find your post" })] }), _jsx("div", { className: "flex space-x-2", children: _jsx(Button, { type: "submit", disabled: isAddingPost, className: "flex-1 bg-green-600 hover:bg-green-700 text-white", children: isAddingPost ? 'Sharing...' : 'Share Post' }) })] })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search posts by title, content, or tags...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10 bg-white" })] }), _jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [_jsx(SelectTrigger, { className: "w-full sm:w-48 bg-white", children: _jsx(SelectValue, { placeholder: "Filter by category" }) }), _jsxs(SelectContent, { className: "bg-white", children: [_jsx(SelectItem, { value: "all", children: "All Posts" }), _jsx(SelectItem, { value: "question", children: "Questions" }), _jsx(SelectItem, { value: "tip", children: "Tips" }), _jsx(SelectItem, { value: "showcase", children: "Showcases" }), _jsx(SelectItem, { value: "problem", children: "Problems" })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsx(Card, { className: "bg-white", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: posts.filter(p => p.category === 'question').length }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Questions" })] }) }), _jsx(Card, { className: "bg-white", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-600", children: posts.filter(p => p.category === 'tip').length }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Tips Shared" })] }) }), _jsx(Card, { className: "bg-white", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: posts.filter(p => p.category === 'showcase').length }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Showcases" })] }) }), _jsx(Card, { className: "bg-white", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: posts.reduce((sum, p) => sum + p.likes, 0) }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Total Likes" })] }) })] }), _jsx("div", { className: "space-y-4", children: filteredPosts.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(MessageCircle, { className: "mx-auto h-12 w-12 text-gray-400 mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No posts found" }), _jsx("p", { className: "text-muted-foreground", children: searchTerm || selectedCategory !== 'all'
                                ? 'Try adjusting your search or filters.'
                                : 'Be the first to share with the community!' })] })) : (filteredPosts.map((post) => (_jsxs(Card, { className: "bg-white", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: `https://api.dicebear.com/7.x/initials/svg?seed=${post.authorName}` }), _jsx(AvatarFallback, { children: post.authorName.charAt(0) })] }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: post.authorName }), _jsx("p", { className: "text-sm text-muted-foreground", children: formatDate(post.createdAt) })] })] }), _jsx(Badge, { className: getCategoryColor(post.category), children: _jsxs("span", { className: "flex items-center", children: [getCategoryIcon(post.category), _jsx("span", { className: "ml-1 capitalize", children: post.category })] }) })] }), _jsx(CardTitle, { className: "text-xl", children: post.title })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-muted-foreground mb-4 leading-relaxed", children: post.content }), post.imageUrl && (_jsx("div", { className: "mb-4", children: _jsx("img", { src: post.imageUrl, alt: "Post image", className: "rounded-lg max-h-64 w-full object-cover" }) })), post.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: post.tags.map((tag, index) => (_jsxs(Badge, { variant: "outline", className: "text-xs", children: ["#", tag] }, index))) })), _jsx("div", { className: "flex items-center justify-between pt-4 border-t", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => likePost(post.id), className: "text-muted-foreground hover:text-red-500 bg-transparent", children: [_jsx(Heart, { className: "h-4 w-4 mr-1" }), post.likes] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-muted-foreground bg-transparent", children: [_jsx(MessageCircle, { className: "h-4 w-4 mr-1" }), post.comments.length] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-muted-foreground bg-transparent", children: [_jsx(Share2, { className: "h-4 w-4 mr-1" }), "Share"] })] }) }), post.comments.length > 0 && (_jsxs("div", { className: "mt-4 pt-4 border-t space-y-3", children: [_jsx("h4", { className: "font-medium text-sm", children: "Comments" }), post.comments.map((comment) => (_jsxs("div", { className: "flex space-x-3", children: [_jsxs(Avatar, { className: "h-6 w-6", children: [_jsx(AvatarImage, { src: `https://api.dicebear.com/7.x/initials/svg?seed=${comment.authorName}` }), _jsx(AvatarFallback, { className: "text-xs", children: comment.authorName.charAt(0) })] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "bg-gray-50 rounded-lg p-3", children: [_jsx("p", { className: "font-medium text-sm", children: comment.authorName }), _jsx("p", { className: "text-sm text-muted-foreground", children: comment.content })] }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: formatDate(comment.createdAt) })] })] }, comment.id)))] }))] })] }, post.id)))) })] }));
}
