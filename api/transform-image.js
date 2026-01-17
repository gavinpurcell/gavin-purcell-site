// Vercel Serverless Function for Image Transformation
// This keeps the API key secure on the server-side

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, imageBase64 } = req.body;

    if (!prompt || !imageBase64) {
      return res.status(400).json({ error: 'Missing prompt or image data' });
    }

    // Get API key from environment variable (server-side only)
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error('GOOGLE_API_KEY not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Call Google's Gemini API
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent',
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: prompt
              },
              {
                inline_data: {
                  mime_type: 'image/png',
                  data: imageBase64
                }
              }
            ]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google API Error:', errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || 'Style transfer failed'
      });
    }

    const data = await response.json();

    // Extract the generated image
    if (data.candidates && data.candidates[0]?.content?.parts) {
      const imagePart = data.candidates[0].content.parts.find(
        part => part.inlineData || part.inline_data
      );

      if (imagePart) {
        const imageData = imagePart.inlineData || imagePart.inline_data;
        if (imageData && imageData.data) {
          return res.status(200).json({
            success: true,
            imageData: imageData.data,
            mimeType: imageData.mimeType || imageData.mime_type || 'image/png'
          });
        }
      }
    }

    return res.status(500).json({ error: 'No image generated' });

  } catch (error) {
    console.error('Transform Image Error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to transform image'
    });
  }
}
