import { IgApiClient } from 'instagram-private-api';




export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const accounts = [
    { ig_uname: 'masti.malai', ig_pass: 'Asaprocky@92' },
    { ig_uname: 'sameera.mankani', ig_pass: 'Asaprocky@92' }
  ];

  //const ig_uname = 'masti.malai'; // Replace with your Instagram username
  //const ig_pass = 'Asaprocky@92'; // Replace with your Instagram password
  const ig = new IgApiClient();
  const { ig_uname, ig_pass } = accounts[Math.floor(Math.random() * accounts.length)];
  ig.state.generateDevice(ig_uname);

  try {
    // Logging into Instagram server-side
    const auth = await ig.account.login(ig_uname, ig_pass);
    if (!auth.pk) {
      return res.status(401).json({ success: false, message: 'Instagram login failed' });
    }


    const jpegBuffer = Buffer.from(req.body.imageBuffer, 'base64');

    // const jpegBuffer = await sharp(imageBuffer)
    //   .jpeg({ quality: 90 }) // Ensure it's in JPEG format and high quality
    //   .toBuffer();

      //const image = await Jimp.read(imageBuffer);

    // Convert the image to JPEG format with 90% quality
    //const jpegBuffer = await image.quality(90).getBufferAsync(Jimp.MIME_JPEG);

    // Post a photo (you can replace this logic to do whatever you need, like posting memes)
    // Example: post a photo or story to Instagram here
    // const photoResult = await ig.publish.photo({
    //   file: jpegBuffer, // assuming you're sending an image buffer from the client
    //   caption: req.body.caption,
    // });

    // const storyResult = await ig.publish.story({
    //   file: jpegBuffer, // Reuse the same image buffer for the story
    // });

    //return res.status(200).json({ success: true, result });


    const postType = Math.random() < 0.5 ? 'photo' : 'story';
    
    let result;

    if (postType === 'photo') {
      // Post a photo
      result = await ig.publish.photo({
        file: jpegBuffer, // assuming you're sending an image buffer from the client
        caption: req.body.caption,
      });
      return res.status(200).json({ success: true, message: 'photo posted successfully to '+ ig_uname, result });
    } else {
      // Post a story
      result = await ig.publish.story({
        file: jpegBuffer, // Reuse the same image buffer for the story
      });
      return res.status(200).json({ success: true, message: 'story posted successfully to '+ ig_uname, result });
    }


    // return res.status(200).json({ 
    //   success: true, 
    //   message: 'Photo and story posted successfully!', 
    //   photoResult,
    //   storyResult,
    // });

  } catch (error) {
    console.error(`Instagram Posting Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
}
