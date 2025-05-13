import PostList from './post-list';
import { Post } from '../app/get-posts';

interface RelatedPostsProps {
  currentPostSlug: string;
  currentPostKeywords: string[];
  posts: Post[];
  viewCountWeight?: number; // 0 to 1, where 0 means ignore view count, 1 means heavily weight view count
  maxPosts?: number; // Maximum number of posts to return
  maxNewsletterPosts?: number; // Maximum number of newsletter posts to include
}

// Helper function to check if a post is a newsletter post
function isNewsletterPost(post: Post): boolean {
  // Check if the title matches the date format YYYY-MM-DD
  return /^\d{4}-\d{2}-\d{2}$/.test(post.title);
}

export default function RelatedPosts({
  currentPostSlug,
  currentPostKeywords,
  posts,
  viewCountWeight = 0.3, // Default to 30% weight on view count
  maxPosts = 4, // Default to 4 posts
  maxNewsletterPosts = 1, // Default to maximum 1 newsletter post
}: RelatedPostsProps) {
  // Filter out the current post from the list
  const otherPosts = posts.filter((post) => post.slug !== currentPostSlug);

  // Calculate relevance scores for each post
  const postsWithScores = otherPosts.map((post) => {
    // Calculate keyword match score (0 to 1)
    const keywordMatches = post.keywords.filter((keyword) =>
      currentPostKeywords.includes(keyword),
    ).length;
    const maxPossibleMatches = Math.max(
      post.keywords.length,
      currentPostKeywords.length,
    );
    const keywordScore =
      maxPossibleMatches > 0 ? keywordMatches / maxPossibleMatches : 0;

    // Calculate normalized view count score (0 to 1)
    const postDate = new Date(post.date);
    const now = new Date();
    const daysSincePost = Math.max(
      1,
      Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)),
    );
    const viewsPerDay = post.views / daysSincePost;

    // Get max views per day across all posts for normalization
    const maxViewsPerDay = Math.max(
      ...otherPosts.map((p) => {
        const pDate = new Date(p.date);
        const pDaysSincePost = Math.max(
          1,
          Math.floor((now.getTime() - pDate.getTime()) / (1000 * 60 * 60 * 24)),
        );
        return p.views / pDaysSincePost;
      }),
    );

    const viewScore = maxViewsPerDay > 0 ? viewsPerDay / maxViewsPerDay : 0;

    // Combine scores with weights
    const combinedScore =
      (1 - viewCountWeight) * keywordScore + viewCountWeight * viewScore;

    return {
      post,
      score: combinedScore,
      isNewsletter: isNewsletterPost(post),
    };
  });

  // Sort by combined score
  const sortedPosts = postsWithScores.sort((a, b) => b.score - a.score);

  // Select posts while respecting the newsletter post limit
  const recommendedPosts = [];
  let newsletterCount = 0;

  for (const item of sortedPosts) {
    if (recommendedPosts.length >= maxPosts) break;

    if (item.isNewsletter) {
      if (newsletterCount < maxNewsletterPosts) {
        recommendedPosts.push(item.post);
        newsletterCount++;
      }
    } else {
      recommendedPosts.push(item.post);
    }
  }

  if (recommendedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">Recommended For You:</h1>
      <PostList posts={recommendedPosts} />
    </div>
  );
}

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
