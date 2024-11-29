import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);


  const videoConstraints = {
    width: 1920, 
    height: 1080,
    facingMode: 'user'
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const startRecording = () => {
    setIsRecording(true);
    const stream = webcamRef.current.stream;
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
    const chunks = [];
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setVideoBlob(blob);
    };
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const saveMedia = (mediaType) => {
    if (mediaType === 'image' && image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'captured-image.png';
      link.click();
    } else if (mediaType === 'video' && videoBlob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(videoBlob);
      link.download = 'recorded-video.webm';
      link.click();
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Camera</h1>
      <div style={{ marginBottom: '20px' }}>
        <Webcam
          audio={true}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          style={{ width: '100%', maxWidth: '600px', borderRadius: '10px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={capturePhoto}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Capture Photo
        </button>
        {isRecording ? (
          <button
            onClick={stopRecording}
            style={{
              padding: '10px 20px',
              margin: '10px',
              backgroundColor: '#DC3545',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Stop Recording
          </button>
        ) : (
          <button
            onClick={startRecording}
            style={{
              padding: '10px 20px',
              margin: '10px',
              backgroundColor: '#28A745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Start Recording
          </button>
        )}
      </div>

      {image && (
        <div>
          <h3>Captured Photo:</h3>
          <img src={image} alt="Captured" style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }} />
          <button
            onClick={() => saveMedia('image')}
            style={{
              padding: '10px 20px',
              margin: '10px',
              backgroundColor: '#FFC107',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Save Photo
          </button>
        </div>
      )}

      {videoBlob && (
        <div>
          <h3>Recorded Video:</h3>
          <video
            src={URL.createObjectURL(videoBlob)}
            controls
            style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }}
          />
          <button
            onClick={() => saveMedia('video')}
            style={{
              padding: '10px 20px',
              margin: '10px',
              backgroundColor: '#FFC107',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Save Video
          </button>
        </div>
      )}
    </div>
  );
};

export default Camera;
