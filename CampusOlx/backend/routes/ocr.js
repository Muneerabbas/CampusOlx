const express = require("express");
const multer = require("multer");
const path = require("path");

const vision = require("@google-cloud/vision");
const router = express.Router();

const keyFile = path.resolve(__dirname, "../keys/vision-key.json");

const client = new vision.ImageAnnotatorClient({
  keyFilename: keyFile,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/verify-id", upload.single("idcard"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const [result] = await client.textDetection(filePath);
    const detections = result.textAnnotations;
    // Handle cases where OCR returns no text
    if (!detections || detections.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Could not read text from image." });
    }
    const fullText = detections[0].description;

    console.log("Extracted Text:", fullText);

    if (fullText.toUpperCase().includes("PICT")) {
      let extractedName = null;
      const lines = fullText.split("\n").map((l) => l.trim());

      // --- CORRECTED LOGIC START ---
      // Search from the bottom up to find the last match, which will be the department
      const departmentKeywords = /engineering|technology/i;
      const departmentIndex = lines.findLastIndex((line) =>
        departmentKeywords.test(line)
      );

      // The student's name is the line directly before the department name.
      if (departmentIndex > 0) {
        extractedName = lines[departmentIndex - 1];
      }
      // --- CORRECTED LOGIC END ---

      return res.json({
        success: true,
        message: "Valid PICT student",
        name: extractedName || "Name not detected",
      });
    } else {
      return res.json({
        success: false,
        message: "Verification failed. Not a PICT ID card.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "OCR failed" });
  }
});

module.exports = router;
