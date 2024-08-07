import PostList from 'components/PostList'

const Home = (props) => {


const video = []; 


   const getPosts =props.posts.data.children.map((p)=>
        { 
          const im=p.data
                  
          if(im.secure_media?.reddit_video?.fallback_url!=undefined)
            video.push({ 
                        id : im.id,
                        title: im.title,
                        comments:im.num_comments,
                        likes:im.ups,
                        mp4: im.secure_media?.reddit_video?.fallback_url,
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
 var posts
try {
    // Your fetching code here

    //+
    //Sareebeauties
//Unexpected
  const tags='Unexpected+BollyBlindsNGossip+TeenActressPhotos+Sareebeauties'
  const res = await fetch('https://www.reddit.com/r/'+tags+'/.json',  
  {
    method: 'GET',
    // headers: new Headers({
    //   "Authorization":"Client-ID b744a48b8b78bf9"
    // })
  }
  );
  posts = await res.json();
} catch (error) {
    console.error("Error fetching data:", error);
}
  return {
    props: { posts } // props will be passed to the page
  };
}
export default Home
