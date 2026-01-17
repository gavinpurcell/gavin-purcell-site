// Vercel Serverless Function for Prompt Generation
// This keeps the API key secure on the server-side

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { uniqueId, selectedExamples } = req.body;

    if (!uniqueId || !selectedExamples) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Get API key from environment variable (server-side only)
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error('GOOGLE_API_KEY not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Call Google's Gemini API
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent',
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `[Request ${uniqueId}]

Generate a complete transformation prompt. Start with "Transform this portrait" and describe ONE recognizable artistic style. Keep it under 15 words total. Make it completely different from these examples:

${selectedExamples}

Generate one UNIQUE complete style now:`
            }]
          }],
          generationConfig: {
            temperature: 1.8,
            maxOutputTokens: 500,
            topP: 0.98,
            topK: 64
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google API Error:', errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || 'Failed to generate prompt'
      });
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      let generatedPrompt = data.candidates[0].content.parts[0].text.trim();

      // Remove any quotes that might be wrapping the prompt
      generatedPrompt = generatedPrompt.replace(/^["']|["']$/g, '');

      if (generatedPrompt.length < 10) {
        return res.status(500).json({ error: 'Generated prompt too short' });
      }

      return res.status(200).json({
        success: true,
        prompt: generatedPrompt
      });
    }

    return res.status(500).json({ error: 'No prompt generated' });

  } catch (error) {
    console.error('Generate Prompt Error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate prompt'
    });
  }
}
