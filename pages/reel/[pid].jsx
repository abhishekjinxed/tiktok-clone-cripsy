import { useRouter } from 'next/router'
import PostList from '../../components/PostList'
import Head from 'next/head'

const Post = (reel) => {

  const tiktok=reel.posts.data
  const router = useRouter()
  const { pid } = router.query

 console.log(reel)

  const video = []; 
   video.push ({
    mp4:tiktok.images[0].mp4,
    poster:tiktok.images[0].gifv,
    id:pid,
    comments:tiktok.comment_count,
    likes:tiktok.ups,
    author: "@Alessandra",
    title:tiktok.title,
    album:{
      title:tiktok.account_url +' - original',
      Cover:'/images/disc-music.gif'},
      avatar:'/images/user.jpeg'
    

  })

  const getPosts =reel.posts2.data.map((im)=>
        { im.images?.map((vid,id)=>{          
if(vid.type==="video/mp4") 
          {video.push({ 
                      id : im.id,
                      title: im.title,
                      comments:im.comment_count,
                      likes:im.ups,
                      mp4: vid.mp4,
                      source:im.link,
                      nsfw:im.nsfw,
                      shares:'1.5k',
                      author: "@Alessandra",
                      text: "this is default text",
                      album:{title:im.account_url+" - original", Cover:'/images/disc-music.gif'},
                      avatar:'/images/user.jpeg'
                    
                    });
          }
           }); 
          });
 
  return ( <div><Head>
      <title>{tiktok.title} - Cripsy reels</title>
      <meta property="og:url" content={router.asPath}/>
      <meta property="og:type" content="website" />
      {/* <meta property="fb:app_id" content="your fb id" /> */}
      <meta property="og:title" content={tiktok.title} />
      <meta name="twitter:card" content={tiktok.title} />
      <meta
        property="og:description"
        content={tiktok.title}
      />
      <meta property="og:image" content='https://i.pinimg.com/originals/e7/a0/07/e7a007fa33cb91d939b0ad7174b0b22f.jpg' />
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

  const res2 = await fetch('https://api.imgur.com/3/gallery/hot',  //correct
  {
    method: 'GET',
    headers: new Headers({
      "Authorization":"Client-ID b744a48b8b78bf9"
    })}
  );
  const posts2 = await res2.json();


  return {
    props: { posts,posts2  } // props will be passed to the page
  };
}