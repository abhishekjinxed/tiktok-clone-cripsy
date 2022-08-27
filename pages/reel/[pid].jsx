import { useRouter } from 'next/router'
import PostList from '../../components/PostList'
import Head from 'next/head'

const Post = (reel) => {

  const tiktok=reel.posts.data
  const router = useRouter()
  const { pid } = router.query

 

  const video = []; 
   video.push ({
    mp4:tiktok.images[0].mp4,
    poster:tiktok.images[0].gifv,
    id:pid,
    title:tiktok.title,
    album:{
      title:tiktok.account_url +' - original',
      Cover:'/images/disc-music.gif'},
      avatar:'/images/user.jpeg'
    

  })
 
  return ( <div><Head>
      <title>Social Media Preview</title>
      <meta property="og:url" content={router.asPath}/>
      <meta property="og:type" content="website" />
      <meta property="fb:app_id" content="your fb id" />
      <meta property="og:title" content={tiktok.title} />
      <meta name="twitter:card" content={tiktok.title} />
      <meta
        property="og:description"
        content={tiktok.title}
      />
      <meta property="og:image" content={tiktok.images[0].gifv} />
    </Head>
  
  
    <PostList video={video} />
  </div>
  

  );
}

export default Post

export async function getServerSideProps(context) {
  // fetch the blog posts from the mock API
  const res = await fetch(`https://api.imgur.com/3/album/${context.params.pid}`,  //correct
  {
    method: 'GET',
    headers: new Headers({
      "Authorization":"Client-ID b744a48b8b78bf9"
    })}
  );
  const posts = await res.json();

  return {
    props: { posts } // props will be passed to the page
  };
}