import { GalleryItem } from "./types";

const CLOUD_NAME = "dy1w6zqom"; // 👈 Replace with your Cloudinary cloud name

export const cldUrl = (publicId: string, width = 800, quality = "auto") =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_${quality},w_${width}/${publicId}`;

export const cldThumb = (publicId: string, size = 400) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${size},h_${size},c_fill,g_auto/${publicId}`;

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774262122/DSC_7429.JPG_v9k2ci.jpg",
  },
  {
    id: 2,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774262014/DSC_7401.JPG_dotxuq.jpg",
  },
  {
    id: 3,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "DSC_7429.JPG_v9k2ci",
  },
  {
    id: 4,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774262008/DSC_7402.JPG_hwxj6f.jpg",
  },
  {
    id: 5,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774261988/DSC_7396.JPG_lplllc.jpg",
  },
  {
    id: 6,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774261989/DSC_7399.JPG_qsfvz0.jpg",
  },
  {
    id: 7,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "DSC_7429.JPG_v9k2ci",
  },
  {
    id: 8,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774261968/DSC_7393.JPG_aoij4o.jpg",
  },
  {
    id: 9,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "DSC_7429.JPG_v9k2ci",
  },
  {
    id: 10,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774262062/DSC_7411.JPG_c1fxoq.jpg",
  },
  {
    id: 11,
    title: {
      en: "150 Years Completed at ZP School – Chief Guest Felicitation",
      hi: "जिला परिषद स्कूल के 150 वर्ष पूर्ण – मुख्य अतिथि सम्मान",
      mr: "जि.प. शाळेची १५० वर्षे पूर्ण – प्रमुख पाहुण्यांचा सत्कार",
    },
    category: "events",
    date: "2023-08-15",
    cloudinaryId: "https://res.cloudinary.com/dy1w6zqom/image/upload/q_auto/f_auto/v1774262105/DSC_7418.JPG_blymh6.jpg",
  },
  
];
