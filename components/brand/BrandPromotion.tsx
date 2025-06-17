"use client";

import { 
  Store, 
  Truck, 
  Wheat, 
  Hammer, 
  Coffee, 
  Shirt,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BrandPromotion() {
  const businesses = [
    {
      icon: Store,
      name: "Sharma General Store",
      category: "Grocery & Essentials",
      description: "Your one-stop shop for daily essentials, groceries, and household items.",
      rating: 4.8,
      reviews: 124,
      contact: "+91-98765-43210",
      location: "Main Market, Gidhadi",
      image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Fresh Vegetables", "Dairy Products", "Household Items"]
    },
    {
      icon: Wheat,
      name: "Patel Organic Farm",
      category: "Agriculture & Organic",
      description: "Fresh organic produce directly from our farms to your table.",
      rating: 4.9,
      reviews: 89,
      contact: "+91-98765-43211",
      location: "Village Outskirts",
      image: "https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Organic Vegetables", "Fresh Fruits", "Dairy Products"]
    },
    {
      icon: Hammer,
      name: "Kumar Hardware",
      category: "Hardware & Tools",
      description: "Complete hardware solutions for construction and repair needs.",
      rating: 4.7,
      reviews: 156,
      contact: "+91-98765-43212",
      location: "Industrial Area",
      image: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Construction Tools", "Electrical Items", "Plumbing Supplies"]
    },
    {
      icon: Coffee,
      name: "Village Chai Corner",
      category: "Food & Beverages",
      description: "Traditional chai and snacks served with love and authentic flavors.",
      rating: 4.6,
      reviews: 203,
      contact: "+91-98765-43213",
      location: "Bus Stand Area",
      image: "https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Masala Chai", "Fresh Snacks", "Local Delicacies"]
    },
    {
      icon: Shirt,
      name: "Fashion Point",
      category: "Clothing & Textiles",
      description: "Latest fashion trends and traditional wear for the entire family.",
      rating: 4.5,
      reviews: 78,
      contact: "+91-98765-43214",
      location: "Main Bazaar",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Traditional Wear", "Modern Fashion", "Kids Clothing"]
    },
    {
      icon: Truck,
      name: "Transport Services",
      category: "Logistics & Transport",
      description: "Reliable transportation services for goods and passenger travel.",
      rating: 4.4,
      reviews: 92,
      contact: "+91-98765-43215",
      location: "Highway Junction",
      image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400",
      specialties: ["Goods Transport", "Passenger Service", "Emergency Transport"]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Grocery & Essentials": "bg-green-100 text-green-700",
      "Agriculture & Organic": "bg-emerald-100 text-emerald-700",
      "Hardware & Tools": "bg-orange-100 text-orange-700",
      "Food & Beverages": "bg-amber-100 text-amber-700",
      "Clothing & Textiles": "bg-purple-100 text-purple-700",
      "Logistics & Transport": "bg-blue-100 text-blue-700"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-blue-50 mt-8 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            <Store className="h-4 w-4 mr-2" />
            Local Business Directory
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
            Discover <span className="text-orange-600">Village Businesses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Support local entrepreneurs and discover quality services right in your village. 
            Connect with trusted businesses that serve our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-2"
            >
              {/* Business Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(business.category)}`}>
                    {business.category}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit
                  </Button>
                </div>
              </div>

              {/* Business Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-200 transition-colors duration-300">
                      <business.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                        {business.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{business.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({business.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {business.description}
                </p>

                {/* Specialties */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {business.specialties.map((specialty, specialtyIndex) => (
                      <span
                        key={specialtyIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{business.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{business.contact}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white group/btn">
                    Contact Business
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Want to List Your Business?
              </h3>
              <p className="text-gray-600">
                Join our growing community of local businesses and reach more customers in your village.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Register Your Business
                </Button>
                <Button variant="outline" className="border-gray-300 px-8 py-3">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}