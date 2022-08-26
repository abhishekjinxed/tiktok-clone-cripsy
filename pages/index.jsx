import PostList from 'components/PostList'

const Nsfw = (props) => {


const video = []; 
  const getPosts =props.posts.data.map((im)=>
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
            author: "@midudev",
            text: "this is default text",
            album:{title:"sonido original - Miguel", Cover:'/images/disc-music.gif'},
            avatar:'/images/user.jpeg'
          
          });
}
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
  const res = await fetch('https://api.imgur.com/3/gallery/top',  
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
export default Nsfw
