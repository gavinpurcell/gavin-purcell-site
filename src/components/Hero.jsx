import { useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  const [stylePrompt, setStylePrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [styledImage, setStyledImage] = useState(null);
  const [error, setError] = useState(null);

  const quickStyles = [
    { id: 'picasso', name: 'Cubist', prompt: 'Transform this portrait in the style of Picasso cubism, with geometric shapes and multiple perspectives', color: '#E65C2A' },
    { id: 'vangogh', name: 'Impressionist', prompt: 'Transform this portrait in the style of Van Gogh with bold brushstrokes and vibrant swirling colors', color: '#F4A261' },
    { id: 'warhol', name: 'Pop Art', prompt: 'Transform this portrait in the style of Andy Warhol pop art with bold colors and high contrast', color: '#E76F51' },
    { id: 'random', name: 'Random', prompt: null, color: '#2A9D8F' },
  ];

  const generateRandomPrompt = async () => {
    setIsGeneratingPrompt(true);
    setError(null);
    setStylePrompt(''); // Clear previous prompt

    try {
      // Use unique timestamp to prevent caching
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

      // Randomize everything to ensure variety
      const allExamples = [
        'Transform this portrait in Van Gogh\'s style with bold brushstrokes',
        'Transform this portrait as a 1950s vintage movie poster',
        'Transform this portrait into anime style with vibrant colors',
        'Transform this portrait as a charcoal sketch with dramatic shadows',
        'Transform this portrait in Warhol pop art style',
        'Transform this portrait as stained glass window art',
        'Transform this portrait in Monet\'s impressionist garden style',
        'Transform this portrait as a Renaissance oil painting',
        'Transform this portrait into pixel art retro gaming style',
        'Transform this portrait as art nouveau decorative poster',
        'Transform this portrait in Picasso\'s cubist geometric style',
        'Transform this portrait as 1920s art deco elegance'
      ];

      // Shuffle and pick random 4 examples
      const shuffled = [...allExamples].sort(() => Math.random() - 0.5);
      const selectedExamples = shuffled.slice(0, 4).join('\n');

      // Call our secure serverless function instead of calling Google directly
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uniqueId,
          selectedExamples
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to generate prompt');
      }

      const data = await response.json();
      console.log('Prompt generation response:', data);

      if (data.success && data.prompt) {
        console.log('Generated prompt:', data.prompt);
        setStylePrompt(data.prompt);
        return data.prompt;
      } else {
        throw new Error('No prompt generated');
      }
    } catch (err) {
      console.error('Prompt generation error:', err);
      setError(err.message || 'Failed to generate random style');
      return null;
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const handleQuickStyle = async (style) => {
    setSelectedStyle(style.id);

    if (style.id === 'random') {
      // Generate a random prompt using Gemini
      const prompt = await generateRandomPrompt();
      if (prompt) {
        setStylePrompt(prompt);
      }
    } else {
      setStylePrompt(style.prompt);
    }
  };

  const convertImageToBase64 = async (imagePath) => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Remove the data URL prefix to get just the base64 string
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      throw new Error('Failed to load image');
    }
  };

  const handleStyleTransfer = async () => {
    if (!stylePrompt && !selectedStyle) {
      setError('Please select a style or enter a prompt');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Convert the photo to base64
      const imageBase64 = await convertImageToBase64('/gavin-photo.png');

      // Call our secure serverless function instead of calling Google directly
      const response = await fetch('/api/transform-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: stylePrompt || 'Transform this portrait in an artistic style',
          imageBase64
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Style transfer failed');
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success && data.imageData) {
        // Convert base64 to data URL for display
        const mimeType = data.mimeType || 'image/png';
        const imageDataUrl = `data:${mimeType};base64,${data.imageData}`;
        setStyledImage(imageDataUrl);
      } else {
        throw new Error('No image generated');
      }
    } catch (err) {
      console.error('Style transfer error:', err);
      setError(err.message || 'Failed to generate styled image');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-title">
            Hi, I'm
            <span className="hero-title-name"> Gavin Purcell</span>
          </h1>

          <p className="hero-description">
            Media executive, creator, and storyteller. I've spent two decades building
            content that connects with people, from <strong>The Tonight Show</strong> to
            digital media powerhouses to my own AI start-up. Now I help others understand how AI is reshaping
            our industry, as the co-host of <strong>AI For Humans</strong>.
          </p>

          <div className="hero-actions">
            <a href="#about" className="btn btn-large">
              Learn More About Me
            </a>
            <a href="#consulting" className="btn btn-large btn-secondary">
              Work Together
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="photo-card">
            <div className="photo-container">
              <img
                src={styledImage || '/gavin-photo.png'}
                alt="Gavin Purcell"
                className="photo-main"
              />
              {isProcessing && (
                <div className="processing-overlay">
                  <div className="processing-spinner"></div>
                  <p>Transforming with AI...</p>
                </div>
              )}
            </div>

            <div className="style-transfer-ui">
              <h3 className="style-ui-title">Transform Me with AI</h3>
              <p className="style-ui-description">
                Pick a style or write your own prompt and see AI in action
              </p>

              <div className="quick-styles">
                {quickStyles.map((style) => (
                  <button
                    key={style.id}
                    className={`quick-style-btn ${selectedStyle === style.id ? 'active' : ''}`}
                    onClick={() => handleQuickStyle(style)}
                    style={{ '--style-color': style.color }}
                    disabled={isProcessing || isGeneratingPrompt}
                  >
                    {style.id === 'random' && isGeneratingPrompt ? '...' : style.name}
                  </button>
                ))}
              </div>

              <div className="custom-prompt">
                <textarea
                  placeholder="Or write your own style prompt..."
                  value={stylePrompt}
                  onChange={(e) => {
                    setStylePrompt(e.target.value);
                    setSelectedStyle(null);
                  }}
                  className="prompt-input"
                  disabled={isProcessing || isGeneratingPrompt}
                  rows={3}
                />
                <button
                  className="btn apply-btn"
                  onClick={handleStyleTransfer}
                  disabled={isProcessing || isGeneratingPrompt || (!stylePrompt && !selectedStyle)}
                >
                  {isProcessing ? 'Processing...' : 'Transform'}
                </button>
              </div>

              {error && (
                <p className="error-message">{error}</p>
              )}

              <p className="style-note">
                Built with Google's Imagen (aka Nano Banana)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
