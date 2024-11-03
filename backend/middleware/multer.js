import multer from "multer";

// Create a storage engine that stores files in memory
const storage = multer.memoryStorage();

// Configure multer to use the memory storage, accept a single file with the field name "file", and set a file size limit
const uploadFile = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
}).single("file");

// Export the multer middleware
export default uploadFile;
