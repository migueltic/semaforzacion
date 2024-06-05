import { createContext, useState } from 'react'

const AppContext = createContext();

function AppProvider({ children }) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [detections, setDetections] = useState([]);
  const [status, setStatus] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await fetch('http://localhost:5000/detectar_color', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setImageData(result.image);
    setDetections(result.detections);
    setStatus(result.status);
  };


  return (
    <AppContext.Provider value={{
      handleSubmit,
      handleFileChange,
      imageData,
      detections,
      status,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }; 