import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IGPoster = () => {
  const [message, setMessage] = useState('');
  const [prompt, setPrompt] = useState(''); // State for the prompt
  const [loading, setLoading] = useState(false); // State for loading

  const promptsArray = [
    "Sameera went hiking in the mountains.",
    "Sameera cooked a new recipe for dinner.",
    "Sameera visited a local art gallery.",
    "Sameera volunteered at a community center.",
    "Sameera went for a long bike ride in the park.",
    "Sameera tried yoga for the first time.",
    "Sameera organized a game night with friends.",
    "Sameera attended a live music concert.",
    "Sameera started a new book and loved it.",
    "Sameera went to the beach and built sandcastles.",
    "Sameera had a picnic in the park with friends.",
    "Sameera explored a new city for the weekend.",
    "Sameera learned to play a musical instrument.",
    "Sameera took a painting class and created art.",
    "Sameera participated in a charity run.",
    "Sameera attended a cooking workshop.",
    "Sameera hosted a movie marathon at home.",
    "Sameera joined a dance class and had fun.",
    "Sameera spent a day at a spa for relaxation.",
    "Sameera went to a farmer's market and bought fresh produce.",
    "Sameera tried out a new coffee shop in town.",
    "Sameera took a road trip with friends.",
    "Sameera went apple picking in the fall.",
    "Sameera spent time gardening and planting flowers.",
    "Sameera attended a local festival or fair.",
    "Sameera went bowling with friends for fun.",
    "Sameera participated in a community clean-up event.",
    "Sameera did a DIY project at home.",
    "Sameera watched a documentary and learned something new.",
    "Sameera tried out a new hairstyle or makeup look.",
    "Sameera went to a poetry reading or open mic night.",
    "Sameera took a pottery class and made a vase.",
    "Sameera went on a weekend camping trip.",
    "Sameera practiced meditation for mindfulness.",
    "Sameera started a journal to document her thoughts.",
    "Sameera went roller skating with friends.",
    "Sameera baked cookies and shared them with neighbors.",
    "Sameera attended a workshop on personal development.",
    "Sameera explored nature trails and went birdwatching.",
    "Sameera visited a zoo or aquarium.",
    "Sameera made a scrapbook of her favorite memories.",
    "Sameera took a photography walk around the city.",
    "Sameera hosted a potluck dinner with friends.",
    "Sameera went to a trivia night at a local bar.",
    "Sameera started an online course to learn something new.",
    "Sameera went for a scenic drive in the countryside.",
    "Sameera created a vision board for her goals.",
    "Sameera spent a day volunteering at an animal shelter.",
    "Sameera attended a sports event with friends.",
    "Sameera tried out a new workout routine.",
    "Sameera went to a wine tasting event.",
    "Sameera visited a historic site or museum.",
    "Sameera had a cozy night in with her favorite movies.",
    "Sameera joined a book club to discuss literature.",
    "Sameera practiced mindfulness with nature walks.",
    "Sameera explored local shops and boutiques.",
    "Sameera tried out a new restaurant in town.",
    "Sameera took a scenic hike with beautiful views.",
    "Sameera spent time with family doing a board game night.",
    "Sameera created a blog to share her experiences.",
    "Sameera went to an escape room with friends.",
    "Sameera visited a botanical garden for inspiration.",
    "Sameera attended a cultural festival in her area.",
    "Sameera enjoyed a sunset picnic on the beach.",
    "Sameera made handmade gifts for her friends.",
    "Sameera explored nearby hiking trails.",
    "Sameera went horseback riding for the first time.",
    "Sameera joined a yoga retreat for relaxation.",
    "Sameera visited a local farm and learned about agriculture.",
    "Sameera tried painting outside en plein air.",
    "Sameera created a playlist of her favorite songs.",
    "Sameera participated in a community theater production.",
    "Sameera tried out stand-up comedy at an open mic night.",
    "Sameera made a time capsule to open in the future.",
    "Sameera learned a new dance routine online.",
    "Sameera spent a weekend in a cabin in the woods.",
    "Sameera organized a charity event for a cause she cares about.",
    "Sameera went to a cultural or historical tour.",
    "Sameera practiced public speaking at a local group.",
    "Sameera explored the nightlife in her city.",
    "Sameera spent a day at a theme park.",
    "Sameera wrote letters to friends and family.",
    "Sameera attended a workshop on a topic of interest.",
    "Sameera explored the beauty of her local neighborhood.",
    "Sameera made a bucket list of things to do this year.",
    "Sameera hosted a crafting party with friends.",
    "Sameera learned about gardening and started her own herb garden.",
    "Sameera made homemade jam with fresh fruits.",
    "Sameera visited a trampoline park for fun.",
    "Sameera created a meal plan for healthy eating.",
    "Sameera attended a motivational seminar.",
    "Sameera tried indoor rock climbing for adventure.",
    "Sameera explored the art scene in her city."
];


  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * promptsArray.length);
    setPrompt(promptsArray[randomIndex]);
  }, []);

  // Function to fetch the image from Hugging Face API
  const fetchImageFromHuggingFace = async (prompt) => {
    try {
      const data = { inputs: prompt };
      const token = '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'; // Replace with your Hugging Face token

      // Make a request to the Hugging Face API for image generation
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/abhiraoo/aimodel',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'arraybuffer', // We expect binary data (image)
        }
      );

      return Buffer.from(response.data).toString('base64'); 
    } catch (error) {
      console.error(`Error fetching image from Hugging Face: ${error.message}`);
      return null;
    }
  };

  // Function to handle the button click and trigger the server-side logic
  const handlePost = async () => {

    setLoading(true); // Start loading when posting starts
    setMessage('');   // Clear previous messages

    try {
     // You can customize the prompt dynamically
      const imageBuffer = await fetchImageFromHuggingFace(prompt); // Fetch the image buffer from Hugging Face

      if (!imageBuffer) {
        setMessage('Failed to generate image.');
        setLoading(false); // Stop loading when request completes
        return;
      }

      // Send the image buffer and caption to your server
      const payload = {
        imageBuffer, // Pass the generated image buffer
        caption: prompt+' #aimodel #sameeramankani', // Customize your caption
      };

      // Call the API route
      const response = await axios.post('/api/postMeme', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setMessage(response.data.message);
        
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }finally {
      setLoading(false); // Stop loading when request completes
    }
  };

  return (
    <div>
      <h1   style={{ marginBottom: '10px', padding: '8px', width: '100%',color: 'black' }}>IG Poster</h1>

       {/* Textbox for entering the prompt */}
       <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />
 {/* Button to post the meme */}
 <button onClick={handlePost} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Post to IG(Sameera)
      </button>
     {/* Show loading or message */}
     {loading ? (
        <p style={{ marginBottom: '10px', padding: '8px', width: '100%',color: 'black' }}>Loading...</p>
      ) : (
        message && <p style={{ marginBottom: '10px', padding: '8px', width: '100%',color: 'black' }}>{message}</p>
      )}
    </div>
  );
};

export default IGPoster;
