import React, { useState } from 'react';

const SameeraMankani = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [promtimageSrc, setpromptImageSrc] = useState(null);
  const [query1, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [tags, setTags] = useState([]);
  const [promptimage, setPromptImage] = useState([]);
  const [currentTagIndex, setCurrentTagIndex] = useState(0); // Track the current tag index

  async function query(data) {

    console.log("feafa ",data)
    setLoading2(true);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/abhiraoo/aimodel",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("Error fetching data:", error);
    } finally {
      setLoading2(false);
    }
  }

    const handleClick =  async () => {
      setLoading(true);
      if (!query) {
        // Handle empty query case if needed
        setLoading(false);
        return;
      }
  
      const formattedQuery = query1.trim().replace(/\s+/g, '+');

     
      if (!tags || tags.length === 0) {
        try {
          
            const params = new URLSearchParams({
              q: formattedQuery,
            });

          // Fetch tags and wait for the response
            const response = await fetch(`/api/scrape?${params.toString()}`);
            const data = await response.json();
         // console.log("feafea", data)
          setTags(data.tags);
          setPromptImage(data.imageUrl)
         // console.log('image:', promptimage);

          // Start with the first tag as soon as they are available
          if (data.tags.length > 0) {
            setCurrentTagIndex(0);
            setpromptImageSrc(data.imageUrl[0])
            //await query({ inputs: data.tags[0] });
          }
        } catch (error) {
          console.error('Failed to fetch tags:', error);
          console.log('Failed to fetch tags:', error);
        }
      } else {
        // Move to the next tag
        const nextIndex = (currentTagIndex + 1) % tags.length;
        setCurrentTagIndex(nextIndex);
        //console.log(tags[nextIndex]);
        setpromptImageSrc(promptimage[nextIndex])
        //await query({ inputs: tags[nextIndex] });
      }
    
      setLoading(false); // This ensures the loading state ends quickly, not waiting for the fetch to complete
    };


    const handleGenerateClick =  async () => {
      setLoading2(true);
      //const nextIndex = (currentTagIndex + 1) % tags.length;
        await query({ inputs: tags[currentTagIndex] });
        setLoading2(false);
    
   
    };

    const handleInputChange = (e) => {
      setQuery(e.target.value);
      setTags([]); // Clear tags when query changes
    };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={query1}
        onChange={handleInputChange}
        placeholder="Enter your search query"
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          width: '300px',
          marginRight: '10px',
        }}
      />
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s ease',
        }}
      >
        {loading ? 'Generating Prompt...' : 'Generate Prompt'}
      </button>
      <button
        onClick={handleGenerateClick}
        disabled={loading2}
        style={{
          backgroundColor: loading2 ? '#fecfcc' : '#b60000',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: loading2 ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          marginLeft: '10px',
          transition: 'background-color 0.3s ease',
        }}
      >
        {loading2 ? 'Generating image...' : 'Generate Image'}
      </button>
    </div>

    {promtimageSrc && (
      <div
        style={{
          color: 'black',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#4A90E2',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          Current Tag: {tags[currentTagIndex]}
        </p>
        <h3
          style={{
            fontSize: '24px',
            color: '#333',
            marginTop: '20px',
            marginBottom: '15px',
            textAlign: 'center',
          }}
        >
          Generated Image:
        </h3>
        <img
          src={promtimageSrc}
          alt="Generated by Prompt Hero"
          style={{
            height: '100px',
            width: '120px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            objectFit: 'fill',
            margin: '0 auto',
            display: 'block',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
        />

        {imageSrc && (
          <img
            src={imageSrc}
            alt="Generated by AI"
            style={{
              height: '100px',
              width: '120px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              objectFit: 'fill',
              margin: '0 auto',
              display: 'block',
              marginTop: '10px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            }}
          />
        )}

        <a
          href={imageSrc}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '10px',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            fontWeight: 'bold',
            textDecoration: 'none',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Open Generated Image URL
        </a>
      </div>
    )}
  </div>
  );
};

export default SameeraMankani;
