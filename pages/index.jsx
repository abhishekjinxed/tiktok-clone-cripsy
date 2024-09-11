import { useEffect, useState } from 'react';
import PostList from 'components/PostList';

const Home = () => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://old.reddit.com/r/funny/.json');
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        const videos = [];

        if (data && data.data && data.data.children) {
          data.data.children.map((p) => { 
            const im = p.data;

            if (im?.secure_media?.reddit_video?.fallback_url) {
              videos.push({ 
                id: im.id,
                title: im.title || '',
                comments: im.num_comments || 0,
                likes: im.ups || 0,
                mp4: im.secure_media.reddit_video.fallback_url,
                source: im.link || '',
                nsfw: im.over_18 || false,
                shares: 19,
                author: "@SameeraMankani",
                text: "this is default text",
                album: {
                  title: `${im.author} - Original Music`,
                  Cover: '/images/user.jpeg'
                },
                avatar: '/images/user.jpeg'
              });
            }
          });
        }

        setVideo(videos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main>
      <PostList video={video} />
    </main>
  );
}

export default Home;
