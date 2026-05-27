import type { Category, Tag, Comment, Review } from '@/src/types';

export const categories: Category[] = [
  { id: '1', name: 'AI Agents', slug: 'ai-agents', color: '#0ea5e9', count: 48 },
  { id: '2', name: 'LLMs', slug: 'llms', color: '#10b981', count: 65 },
  { id: '3', name: 'Generative AI', slug: 'generative-ai', color: '#f59e0b', count: 72 },
  { id: '4', name: 'Robotics', slug: 'robotics', color: '#ef4444', count: 34 },
  { id: '5', name: 'Machine Learning', slug: 'machine-learning', color: '#8b5cf6', count: 89 },
  { id: '6', name: 'Computer Vision', slug: 'computer-vision', color: '#ec4899', count: 41 },
  { id: '7', name: 'Data Science', slug: 'data-science', color: '#14b8a6', count: 37 },
];

export const tags: Tag[] = [
  { id: '1', name: 'GPT-4', slug: 'gpt-4' },
  { id: '2', name: 'Claude', slug: 'claude' },
  { id: '3', name: 'Gemini', slug: 'gemini' },
  { id: '4', name: 'Llama', slug: 'llama' },
  { id: '5', name: 'Stable Diffusion', slug: 'stable-diffusion' },
  { id: '6', name: 'DALL-E', slug: 'dall-e' },
  { id: '7', name: 'Transformer', slug: 'transformer' },
  { id: '8', name: 'Neural Networks', slug: 'neural-networks' },
];

export const comments: Comment[] = [
  { id: '1', blogId: '1', parentId: null, author: { name: 'Alex Thompson', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100' }, content: 'Excellent comparison! The section on reasoning capabilities was particularly insightful.', likes: 24, createdAt: '2025-05-16T08:30:00Z', replies: [
    { id: '2', blogId: '1', parentId: '1', author: { name: 'Emma Davis', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100' }, content: 'Agreed! Claude tends to produce more idiomatic code in my testing.', likes: 12, createdAt: '2025-05-16T09:15:00Z', replies: [] },
  ] },
  { id: '3', blogId: '1', parentId: null, author: { name: 'Jennifer Liu', avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100' }, content: 'Great article! Would love to see a follow-up on multimodal capabilities.', likes: 18, createdAt: '2025-05-17T11:00:00Z', replies: [] },
];

export const reviews: Review[] = [
  { id: '1', blogId: '1', author: { name: 'Michael Chang', email: 'michael@example.com', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100' }, rating: 5, content: 'Incredibly thorough and well-researched. The benchmark breakdowns are especially useful.', createdAt: '2025-05-16T14:00:00Z', helpful: 45 },
  { id: '2', blogId: '1', author: { name: 'Sophie Martin', email: 'sophie@example.com', avatar: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=100' }, rating: 4, content: 'Very informative. Only giving 4 stars because I wish it covered more about safety features.', createdAt: '2025-05-17T09:30:00Z', helpful: 28 },
];
