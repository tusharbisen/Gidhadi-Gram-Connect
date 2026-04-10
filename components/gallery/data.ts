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
    cloudinaryId: "DSC_7429.JPG_v9k2ci",
  },
  {
    id: 2,
    title: {
      en: "Village Connectivity Road Inauguration",
      hi: "ग्राम संपर्क मार्ग उद्घाटन",
      mr: "ग्राम संपर्क रस्ता उद्घाटन",
    },
    category: "development",
    date: "2023-07-05",
    cloudinaryId: "DSC_7427.JPG_rijuzw",
  },
  {
    id: 3,
    title: {
      en: "Ganesh Chaturthi Celebration",
      hi: "गणेश चतुर्थी उत्सव",
      mr: "गणेश चतुर्थी उत्सव",
    },
    category: "festival",
    date: "2023-09-19",
    cloudinaryId: "DSC_7422.JPG_pmqlay",
  },
  {
    id: 4,
    title: {
      en: "Panchayat Meeting on Water Supply",
      hi: "जल आपूर्ति पर पंचायत बैठक",
      mr: "पाणी पुरवठ्यावर पंचायत बैठक",
    },
    category: "events",
    date: "2023-06-25",
    cloudinaryId: "DSC_7420.JPG_mhhyly",
  },
  {
    id: 5,
    title: {
      en: "New Solar Street Lights Installation",
      hi: "नई सौर स्ट्रीट लाइट स्थापना",
      mr: "नवीन सौर पथदिवे बसवणे",
    },
    category: "development",
    date: "2023-05-15",
    cloudinaryId: "DSC_7415.JPG_gvtgqw",
  },
  {
    id: 6,
    title: {
      en: "Diwali Maha Aarti at Gram Panchayat",
      hi: "ग्राम पंचायत में दिवाली महा आरती",
      mr: "ग्राम पंचायतीत दिवाळी महा आरती",
    },
    category: "festival",
    date: "2023-11-12",
    cloudinaryId: "DSC_7417.JPG_pqstbp",
  },
  {
    id: 7,
    title: {
      en: "Tree Plantation Drive",
      hi: "वृक्षारोपण अभियान",
      mr: "वृक्षारोपण मोहीम",
    },
    category: "events",
    date: "2023-04-22",
    cloudinaryId: "DSC_7411.JPG_c1fxoq",
  },
  {
    id: 8,
    title: {
      en: "Primary Health Center Groundbreaking",
      hi: "प्राथमिक स्वास्थ्य केंद्र भूमिपूजन",
      mr: "प्राथमिक आरोग्य केंद्र भूमिपूजन",
    },
    category: "development",
    date: "2023-04-10",
    cloudinaryId: "DSC_7407.JPG_eol5ic",
  },
];
