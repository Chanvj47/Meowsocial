import { useState } from 'react';
import { MapPin, Phone, Clock, AlertCircle } from 'lucide-react';
import { IconText } from './ui/icon-text';

interface LostCat {
  id: string;
  title: string;
  description: string;
  location: {
    province: string;
    district: string;
  };
  image: string;
  contact: string;
  postedTime: string;
  isUrgent: boolean;
}

const vietnamLocations = {
  'TP. Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 7', 'Bình Thạnh', 'Tân Bình', 'Phú Nhuận'],
  'Hà Nội': ['Ba Đình', 'Hoàn Kiếm', 'Đống Đa', 'Hai Bà Trưng', 'Cầu Giấy', 'Tây Hồ', 'Thanh Xuân'],
  'Đà Nẵng': ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu']
};

const mockLostCats: LostCat[] = [
  {
    id: '1',
    title: 'Tìm bé Miu, lạc tại Phường Bến Nghé',
    description: 'Mèo mướp vàng, tai trái có vết bấm nhỏ. Đeo vòng cổ màu đỏ. Rất nhớ nhà!',
    location: { province: 'TP. Hồ Chí Minh', district: 'Quận 1' },
    image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&q=80',
    contact: '0912 345 678',
    postedTime: '2 giờ trước',
    isUrgent: true
  },
  {
    id: '2',
    title: 'Cần tìm mèo cam 3 màu',
    description: 'Bé mèo cái, lông tam thể, mất tại khu vực chung cư The Manor. Rất ngoan và thân thiện.',
    location: { province: 'Hà Nội', district: 'Cầu Giấy' },
    image: 'https://images.unsplash.com/photo-1573865526739-10c1dd9bb4bc?w=400&q=80',
    contact: '0987 654 321',
    postedTime: '5 giờ trước',
    isUrgent: true
  },
  {
    id: '3',
    title: 'Tìm boss British Shorthair xám',
    description: 'Mèo Anh lông ngắn màu xám, mắt vàng, béo ú. Mất tại công viên Lê Văn Tám.',
    location: { province: 'TP. Hồ Chí Minh', district: 'Quận 3' },
    image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=400&q=80',
    contact: '0901 234 567',
    postedTime: '1 ngày trước',
    isUrgent: false
  },
  {
    id: '4',
    title: 'Khẩn cấp! Tìm mèo đen lạc ở Phú Nhuận',
    description: 'Mèo đen thuần chủng, tai nhọn, đuôi dài. Có đeo bảng tên "Shadow". Rất sợ người lạ.',
    location: { province: 'TP. Hồ Chí Minh', district: 'Phú Nhuận' },
    image: 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=400&q=80',
    contact: '0909 876 543',
    postedTime: '30 phút trước',
    isUrgent: true
  }
];

export function LostCatListing() {
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  const filteredCats = mockLostCats.filter(cat => {
    if (selectedProvince === 'all') return true;
    if (selectedProvince !== cat.location.province) return false;
    if (selectedDistrict === 'all') return true;
    return selectedDistrict === cat.location.district;
  });

  const districts = selectedProvince !== 'all' && selectedProvince in vietnamLocations
    ? vietnamLocations[selectedProvince as keyof typeof vietnamLocations]
    : [];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4">
          <h2 className="mb-4">Tìm Mèo Thất Lạc</h2>

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

      {/* Cat Cards */}
      <div className="p-4 space-y-4">
        {filteredCats.map(cat => (
          <div
            key={cat.id}
            className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-transform hover:scale-[1.02]"
          >
            {/* Urgent Badge */}
            {cat.isUrgent && (
              <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">KHẨN CẤP - CẦN TÌM GẤP!</span>
              </div>
            )}

            <div className="flex gap-4 p-4">
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-32 h-32 object-cover rounded-xl flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="mb-2">{cat.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{cat.description}</p>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconText icon= {MapPin} text ={cat.location.district  + ", " + cat.location.province}></IconText>
                    
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconText icon= {Clock} text= {cat.postedTime}></IconText>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <div className="px-4 pb-4">
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-full flex items-center justify-center gap-2 hover:from-orange-600 hover:to-orange-700 transition-all">
                <Phone className="w-4 h-4" />
                Liên hệ: {cat.contact}
              </button>
            </div>
          </div>
        ))}

        {filteredCats.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Không tìm thấy tin đăng nào trong khu vực này
          </div>
        )}
      </div>
    </div>
  );
}
