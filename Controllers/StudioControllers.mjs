import { uploadToCloudinary } from "../Middleware/upload.mjs";
import Studio from "../Models/Studio.mjs";

// ========================
// GET all studios
// ========================
export const Studioget = async (req, res) => {
  try {
    console.log("GET / studios called");
    const getStudio = await Studio.find({}, { PersonCapacity: 1, images: 1, title: 1 });
    console.log("Studios fetched:", getStudio.length);
    res.status(200).json({ message: "Getting studio products", data: getStudio });
  } catch (error) {
    console.error("GET studio error:", error);
    res.status(500).json({ message: "Error in getting studio products", error: error.message });
  }
};

// ========================
// GET studio by ID
// ========================
export const Studioid = async (req, res) => {
  try {
    const idStudio = await Studio.findById(req.params.id);
    if (!idStudio) return res.status(404).json({ message: "Studio not found" });
    console.log("Studio fetched:", idStudio);
    res.status(200).json({ message: "Getting studio by ID", data: idStudio });
  } catch (error) {
    console.error("GET studio by ID error:", error);
    res.status(500).json({ message: "Error in getting studio by ID", error: error.message });
  }
};

// ========================
// POST new studio
// ========================
export const studiopost = async (req, res) => {
  try {
    console.log("POST / studios called");
    console.log("Text data:", req.body);
    console.log("Files:", req.files);

    // ---------- Upload images ----------
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(file.buffer, "studio");
        imageUrls.push(uploaded.secure_url);
      }
    }

    // ---------- Destructure form data ----------
    const { title, price, PersonCapacity, slots, description } = req.body;

    if (!title || !price || !PersonCapacity || !slots || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ---------- Parse slots safely ----------
    let parsedSlots;
    try {
      parsedSlots = JSON.parse(slots);
      if (!Array.isArray(parsedSlots)) throw new Error("Slots must be an array");
    } catch (e) {
      return res.status(400).json({ message: "Invalid slots format", error: e.message });
    }

    // ---------- Create new studio ----------
    const postStudio = new Studio({
      title,
      price,
      PersonCapacity,
      slots: parsedSlots,
      description,
      images: imageUrls,
    });

    await postStudio.save();
    res.status(201).json({ message: "Studio posted successfully", data: postStudio });
  } catch (error) {
    console.error("Error in posting studio:", error);
    res.status(500).json({ message: "Error in posting studio", error: error.message });
  }
};
