const Mobile = require("../model/mobile.model");

const createMobile = async (req, res) => {
  const { brand, model, price, releaseDate, inStock } = req.body;
  try {
    if (!brand || !model || !price || !releaseDate || !inStock) {
      res.status(404).json({
        message: " all field are Required !",
      });
    } else {
      const mobile = await new Mobile({
        brand,
        model,
        price,
        releaseDate,
        inStock,
        image: req.file.path,
      });
      const savedMobile = await mobile.save();
      res.status(201).json({
        message: "Mobile created successfully",
        data: savedMobile,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllMobile = async (req, res) => {
  try {
    const mobile = await Mobile.find();
    if (mobile.length > 0) {
      res.status(200).json({
        message: "fetch mobile succussfully",
        data: mobile,
      });
    } else {
      res.status(400).json({
        message: "Mobile Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const singleMobile = async (req, res) => {
  try {
    const mobile = await Mobile.findById(req.params.id);
    if (mobile) {
      res.status(200).json({
        message: "Single mobile fetched!",
        data: mobile,
      });
    } else {
      res.status(404).json({
        message: "Mobile not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteMobile = async (req, res) => {
  try {
    const mobile = await Mobile.findByIdAndDelete(req.params.id);
    if (mobile) {
      res.status(200).json({
        message: "Mobile Deleted !",
        data: mobile,
      });
    } else {
      res.status(404).json({
        message: "Mobile not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateMobile = async (req, res) => {
  try {
    const updatedMobile = await Mobile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (updatedMobile) {
      res.status(200).json({
        message: "Mobile updated successfully!",
        data: updatedMobile,
      });
    } else {
      res.status(404).json({
        message: "Mobile not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMobile,
  getAllMobile,
  singleMobile,
  deleteMobile,
  updateMobile,
};
