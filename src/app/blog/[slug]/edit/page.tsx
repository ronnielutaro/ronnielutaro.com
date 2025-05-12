import { notFound } from 'next/navigation';

export default function EditPostPage() {
  if (process.env.NODE_ENV === 'production') {
    // Trigger a 404 response in production
    notFound();
  }

  return (
    <div className="w-full h-full">
      <p className="text-left py-4 text-gray-600">
        Use the editor below to modify the content of your blog post.
      </p>
    </div>
  );
}
