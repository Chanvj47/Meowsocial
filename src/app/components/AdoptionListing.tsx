import { useState } from 'react';
import { Heart, MapPin, Calendar, DollarSign } from 'lucide-react';

interface AdoptionCat {
  id: string;
  title: string;
  breed: string;
  age: string;
  gender: string;
  price: string;
  location: {
    province: string;
    district: string;
  };
  image: string;
  description: string;
  vaccinated: boolean;
}

const vietnamLocations = {
  'TP. Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 7', 'Bình Thạnh', 'Tân Bình', 'Phú Nhuận'],
  'Hà Nội': ['Ba Đình', 'Hoàn Kiếm', 'Đống Đa', 'Hai Bà Trưng', 'Cầu Giấy', 'Tây Hồ', 'Thanh Xuân'],
  'Đà Nẵng': ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu']
};

const mockAdoptionCats: AdoptionCat[] = [
  {
    id: '1',
    title: 'Tìm nhà mới cho bé British Shorthair 2 tháng tuổi',
    breed: 'British Shorthair',
    age: '2 tháng',
    gender: 'Đực',
    price: '2.000.000 VNĐ',
    location: { province: 'TP. Hồ Chí Minh', district: 'Quận 1' },
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80',
    description: 'Bé mèo Anh lông ngắn, màu xám xanh, mắt vàng đồng rất xinh. Đã tiêm phòng đầy đủ.',
    vaccinated: true
  },
  {
    id: '2',
    title: 'Mèo Maine Coon thuần chủng tìm chủ mới',
    breed: 'Maine Coon',
    age: '4 tháng',
    gender: 'Cái',
    price: '5.000.000 VNĐ',
    location: { province: 'Hà Nội', district: 'Cầu Giấy' },
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&q=80',
    description: 'Maine Coon size lớn, tính tình hiền lành, thích chơi đùa. Kèm giấy tờ chứng nhận.',
    vaccinated: true
  },
  {
    id: '3',
    title: 'Bé mèo mướp nhà sinh, tìm người nhận nuôi',
    breed: 'Mèo Ta',
    age: '3 tháng',
    gender: 'Đực',
    price: 'Miễn phí (vía)',
    location: { province: 'TP. Hồ Chí Minh', district: 'Bình Thạnh' },
    image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&q=80',
    description: 'Mèo mướp vàng rất dễ thương, đã tẩy giun, chỉ cần người yêu thương thật lòng.',
    vaccinated: false
  },
  {
    id: '4',
    title: 'Scottish Fold tai cụp siêu đáng yêu',
    breed: 'Scottish Fold',
    age: '3 tháng',
    gender: 'Cái',
    price: '3.500.000 VNĐ',
    location: { province: 'TP. Hồ Chí Minh', district: 'Quận 7' },
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&q=80',
    description: 'Scottish Fold tai cụp chuẩn, lông mượt mà, tính cách dễ thương. Full vaccine.',
    vaccinated: true
  },
  {
    id: '5',
    title: 'Ragdoll mắt xanh tìm gia đình ấm áp',
    breed: 'Ragdoll',
    age: '5 tháng',
    gender: 'Cái',
    price: '6.000.000 VNĐ',
    location: { province: 'Hà Nội', district: 'Tây Hồ' },
    image: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?w=400&q=80',
    description: 'Ragdoll bicolor cực xinh, tính tình êm dịu như búp bê. Phù hợp gia đình có trẻ nhỏ.',
    vaccinated: true
  }
];

export function AdoptionListing() {
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredCats = mockAdoptionCats.filter(cat => {
    if (selectedProvince === 'all') return true;
    if (selectedProvince !== cat.location.province) return false;
    if (selectedDistrict === 'all') return true;
    return selectedDistrict === cat.location.district;
  });

  const districts = selectedProvince !== 'all' && selectedProvince in vietnamLocations
    ? vietnamLocations[selectedProvince as keyof typeof vietnamLocations]
    : [];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4">
          <h2 className="mb-4">Nhận Nuôi Mèo</h2>

          {/* Location Filters */}
          <div className="flex gap-2">
            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedDistrict('all');
              }}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-white"
            >
              <option value="all">Tất cả tỉnh/thành</option>
              {Object.keys(vietnamLocations).map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={selectedProvince === 'all'}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-white disabled:opacity-50"
            >
              <option value="all">Tất cả quận/huyện</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCats.map(cat => (
          <div
            key={cat.id}
            className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-transform hover:scale-[1.02]"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => toggleFavorite(cat.id)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
              >
                <Heart
                  className={`w-5 h-5 ${favorites.has(cat.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                />
              </button>
              {cat.vaccinated && (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                  Đã tiêm phòng ✓
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="mb-2 line-clamp-2">{cat.title}</h3>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">{cat.breed}</span>
                  <span>•</span>
                  <span>{cat.age}</span>
                  <span>•</span>
                  <span>{cat.gender}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span>{cat.location.district}, {cat.location.province}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{cat.description}</p>

              {/* Price & Contact */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-orange-600">{cat.price}</span>
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all">
                  Liên hệ
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredCats.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            Không tìm thấy tin đăng nào trong khu vực này
          </div>
        )}
      </div>
    </div>
  );
}
