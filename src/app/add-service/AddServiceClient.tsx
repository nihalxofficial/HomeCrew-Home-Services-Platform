"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Label, ListBox, Select, Input, Textarea, Button } from "@heroui/react";
import {
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaTag,
  FaClock,
  FaDollarSign,
  FaImage,
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

interface FormData {
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  priceUnit: string;
  duration: string;
  imageUrl: string;
  whatsIncluded: string[];
  tags: string[];
  availableCities: string[];
  isFeatured: boolean;
}

const AddServiceClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    priceUnit: "fixed",
    duration: "",
    imageUrl: "",
    whatsIncluded: [],
    tags: [],
    availableCities: [],
    isFeatured: false,
  });

  const [whatsIncludedInput, setWhatsIncludedInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [citiesInput, setCitiesInput] = useState("");

  const categories = [
    { id: "cleaning", label: "Cleaning" },
    { id: "repair", label: "Repair" },
    { id: "home-improvement", label: "Home Improvement" },
    { id: "pest-control", label: "Pest Control" },
    { id: "tutoring", label: "Tutoring" },
    { id: "installation", label: "Installation" },
    { id: "electrical", label: "Electrical" },
    { id: "tv-mounting", label: "TV Mounting" },
    { id: "gardening", label: "Gardening" },
  ];

  const priceUnits = [
    { id: "fixed", label: "Fixed" },
    { id: "hourly", label: "Hourly" },
  ];

  const featuredOptions = [
    { id: "false", label: "No" },
    { id: "true", label: "Yes (Featured)" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string | null) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFeaturedChange = (value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      isFeatured: value === "true",
    }));
  };

  const handleAddItem = (
    field: "whatsIncluded" | "tags" | "availableCities",
    value: string,
  ) => {
    if (!value.trim()) {
      toast.warning("Please enter a value");
      return;
    }

    const currentArray = formData[field];
    if (currentArray.includes(value.trim())) {
      toast.warning("Item already exists");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value.trim()],
    }));

    if (field === "whatsIncluded") setWhatsIncludedInput("");
    else if (field === "tags") setTagsInput("");
    else if (field === "availableCities") setCitiesInput("");
  };

  const handleRemoveItem = (
    field: "whatsIncluded" | "tags" | "availableCities",
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formValues = Object.fromEntries(
        new FormData(e.currentTarget).entries(),
      );

      const serviceData = {
        title: formValues.title,
        category: formData.category,
        shortDescription: formValues.shortDescription,
        fullDescription: formValues.fullDescription,
        price: parseFloat(formValues.price as string),
        priceUnit: formValues.priceUnit,
        duration: formValues.duration,
        imageUrl: formValues.imageUrl || "",
        whatsIncluded: formData.whatsIncluded,
        tags: formData.tags,
        availableCities: formData.availableCities,
        isFeatured: formData.isFeatured,
      };

      console.log("Service Data:", serviceData);
      toast.success("Service created successfully! 🎉");

      e.currentTarget.reset();
      setFormData({
        title: "",
        category: "",
        shortDescription: "",
        fullDescription: "",
        price: "",
        priceUnit: "fixed",
        duration: "",
        imageUrl: "",
        whatsIncluded: [],
        tags: [],
        availableCities: [],
        isFeatured: false,
      });
      setWhatsIncludedInput("");
      setTagsInput("");
      setCitiesInput("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden px-4 pt-20 pb-10">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-400/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-12 h-12 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-emerald-500/20 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-green-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-sm shadow-lg shadow-green-500/30">
                <FaPlus />
              </div>
              Add New Service
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details to add a new service
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="title"
              label="Service Title"
              placeholder="e.g., Premium Home Deep Cleaning"
              value={formData.title}
              onChange={handleChange}
              isRequired
              startContent={<FaTag className="text-gray-400" />}
              className="w-full"
            />

            <Select
              name="category"
              placeholder="Select a category"
              isRequired
              fullWidth
              value={formData.category}
              onChange={(value) => handleSelectChange("category", value)}
            >
              <Label>Category</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {categories.map((cat) => (
                    <ListBox.Item
                      key={cat.id}
                      id={cat.label}
                      textValue={cat.label}
                    >
                      {cat.label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Row 2: Price & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="price"
              type="number"
              step="0.01"
              label="Price"
              placeholder="99.00"
              value={formData.price}
              onChange={handleChange}
              isRequired
              startContent={<FaDollarSign className="text-gray-400" />}
              className="w-full"
            />

            <Select
              name="priceUnit"
              placeholder="Select unit"
              fullWidth
              value={formData.priceUnit}
              onChange={(value) => handleSelectChange("priceUnit", value)}
            >
              <Label>Price Unit</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {priceUnits.map((unit) => (
                    <ListBox.Item
                      key={unit.id}
                      id={unit.label}
                      textValue={unit.label}
                    >
                      {unit.label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <Input
              name="duration"
              label="Duration"
              placeholder="e.g., 2-3 hours"
              value={formData.duration}
              onChange={handleChange}
              isRequired
              startContent={<FaClock className="text-gray-400" />}
              className="w-full"
            />
          </div>

          {/* Row 3: Image URL */}
          <Input
            name="imageUrl"
            label="Image URL"
            placeholder="https://images.unsplash.com/..."
            value={formData.imageUrl}
            onChange={handleChange}
            startContent={<FaImage className="text-gray-400" />}
            className="w-full"
          />

          {/* Row 4: Short Description */}
          <Textarea
            name="shortDescription"
            label="Short Description"
            placeholder="Brief description of the service"
            value={formData.shortDescription}
            onChange={handleChange}
            isRequired
            rows={2}
            className="w-full"
          />

          {/* Row 5: Full Description */}
          <Textarea
            name="fullDescription"
            label="Full Description"
            placeholder="Detailed description of the service"
            value={formData.fullDescription}
            onChange={handleChange}
            isRequired
            rows={4}
            className="w-full"
          />

          {/* Row 6: What's Included */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1.5">
              What's Included
            </Label>
            <div className="flex gap-2">
              <Input
                value={whatsIncludedInput}
                onChange={(e) => setWhatsIncludedInput(e.target.value)}
                placeholder="Add an item..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddItem("whatsIncluded", whatsIncludedInput);
                  }
                }}
              />
              <Button
                type="button"
                onPress={() =>
                  handleAddItem("whatsIncluded", whatsIncludedInput)
                }
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 flex items-center gap-1 text-sm font-medium"
              >
                <FaPlus className="text-xs" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.whatsIncluded.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-sm text-gray-700"
                >
                  <FaCheckCircle className="text-green-500 text-xs" />
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("whatsIncluded", index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Row 7: Tags */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tags
            </Label>
            <div className="flex gap-2">
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddItem("tags", tagsInput);
                  }
                }}
              />
              <Button
                type="button"
                onPress={() => handleAddItem("tags", tagsInput)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 flex items-center gap-1 text-sm font-medium"
              >
                <FaPlus className="text-xs" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-700"
                >
                  <FaTag className="text-gray-400 text-xs" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("tags", index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Row 8: Available Cities */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1.5">
              Available Cities
            </Label>
            <div className="flex gap-2">
              <Input
                value={citiesInput}
                onChange={(e) => setCitiesInput(e.target.value)}
                placeholder="Add a city..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddItem("availableCities", citiesInput);
                  }
                }}
              />
              <Button
                type="button"
                onPress={() => handleAddItem("availableCities", citiesInput)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 flex items-center gap-1 text-sm font-medium"
              >
                <FaPlus className="text-xs" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.availableCities.map((city, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-gray-700"
                >
                  <FaMapMarkerAlt className="text-blue-500 text-xs" />
                  {city}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("availableCities", index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Row 9: Featured */}
          <Select
            name="isFeatured"
            placeholder="Select an option"
            fullWidth
            value={formData.isFeatured ? "true" : "false"}
            onChange={handleFeaturedChange}
          >
            <Label>Featured Service</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {featuredOptions.map((opt) => (
                  <ListBox.Item
                    key={opt.id}
                    id={opt.label}
                    textValue={opt.label}
                  >
                    {opt.label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 flex items-center justify-center gap-2"
          >
            <FaPlus className="text-sm" />
            Add Service
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceClient;
