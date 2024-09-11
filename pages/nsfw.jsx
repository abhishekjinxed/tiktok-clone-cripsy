import { useState, useEffect } from 'react';
import PostList from 'components/PostList';

const Nsfw = () => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const tags='indian_nsfw+tiktokporn+indianbabe+nsfw+NSFW_GIF+iWantToFuckHer+pornvids+celebnsfw+gonewild'
        const res = await fetch(`https://old.reddit.com/r/${tags}/.json`);
        const posts = await res.json();

        const videoData = posts.data.children.map((p) => {
          const im = p.data;

          if (im.preview?.reddit_video_preview?.fallback_url != null) {
            return {
              id: im.id,
              title: im.title,
              comments: im.num_comments,
              likes: im.ups,
              mp4: im.preview?.reddit_video_preview?.fallback_url,
              source: im.link,
              nsfw: im.nsfw,
              shares: 19,
              author: im.subreddit,
              text: 'this is default text',
              album: { title: `${im.author} - Original Music`, Cover: '/images/user1.jpeg' },
              avatar: '/images/user1.jpeg',
            };
          }
          return null;
        }).filter(Boolean); // Filter out any null values

        setVideo(videoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <PostList video={video} />
    </main>
  );
};

export default Nsfw;
