'use server';

import { supabaseServerClient } from '../../lib/supabaseServerClient';
import { blogPostSchema } from '@/schemas/blogPost';
import { z } from 'zod';

export async function createBlogPost(formData: FormData) {
  // Extract form data
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    userEthAddress: formData.get('userEthAddress') as string,
  };

  // Validate with Zod
  try {
    blogPostSchema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error(err.errors.map((e) => e.message).join(', '));
    }
    throw err;
  }

  const { title, content, userEthAddress } = data;

  // Step 1: Check if the author exists
  let author;
  const { error: authorError } = await supabaseServerClient
    .from('authors')
    .select('id')
    .eq('eth_address', userEthAddress)
    .single();

  // Step 2: Create the author if they don't exist
  if (authorError) {
    const { data: newAuthor, error: newAuthorError } =
      await supabaseServerClient
        .from('authors')
        .insert({
          name: `Author ${userEthAddress.substring(0, 6)}`, // Default name
          eth_address: userEthAddress,
        })
        .select()
        .single();

    if (newAuthorError) {
      throw new Error('Failed to create author');
    }

    author = newAuthor;
  }

  // Step 3: Insert the blog post
  const { error: insertError } = await supabaseServerClient
    .from('blog_posts')
    .insert({
      title,
      content,
      author_id: author?.id,
    });

  if (insertError) {
    throw new Error('Failed to create blog post');
  }

  return { success: true };
}
