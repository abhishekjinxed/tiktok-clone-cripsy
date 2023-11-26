import PostList from 'components/PostList'

const Nsfw = (props) => {


const video = []; 


   const getPosts =props.posts.data.children.map((p)=>
        { 
          const im=p.data
                  
          if(im.preview?.reddit_video_preview?.fallback_url!=undefined)
            video.push({ 
                        id : im.id,
                        title: im.title,
                        comments:im.num_comments,
                        likes:im.ups,
                        mp4: im.preview?.reddit_video_preview?.fallback_url,
                        source:im.link,
                        nsfw:im.nsfw,
                        shares:19,
                        author: "@midudev",
                        text: "this is default text",
                        album:{title: im.author+" - Original Music", Cover:'/images/user.jpeg'},
                        avatar:'/images/user.jpeg'
                      
                      });

          });     
        
        
      
  return (
   
    <main>
     
    <PostList video={video} />
  </main>
      
   
  )
}
export async function getServerSideProps(context) {
  // fetch the blog posts from the mock API

  const tags='indian_nsfw+tiktokporn+indianbabe+nsfw+NSFW_GIF+iWantToFuckHer+pornvids+celebnsfw+gonewild'
  const res = await fetch('https://www.reddit.com/r/'+tags+'/.json',  
  {
    method: 'GET',
    // headers: new Headers({
    //   "Authorization":"Client-ID b744a48b8b78bf9"
    // })
  }
  );
  const posts = await res.json();

  return {
    props: { posts } // props will be passed to the page
  };
}
export default Nsfw
