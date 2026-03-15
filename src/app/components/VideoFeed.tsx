import { useState } from 'react';
import { Heart, MessageCircle, Share2, Play, Pause } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
  thumbnail: string;
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Đại boss lần đầu thấy tuyết ❄️',
    author: '@sen_vui_tinh',
    likes: 12500,
    comments: 234,
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80'
  },
  {
    id: '2',
    title: 'Khi bạn cố tập Yoga nhưng có mèo 🧘‍♀️',
    author: '@yoga_cat',
    likes: 8900,
    comments: 156,
    thumbnail: 'https://images.unsplash.com/photo-1573865526739-10c1dd9bb4bc?w=400&q=80'
  },
  {
    id: '3',
    title: 'Boss đòi ăn lúc 3h sáng 😹',
    author: '@meow_midnight',
    likes: 15200,
    comments: 389,
    thumbnail: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&q=80'
  },
  {
    id: '4',
    title: 'Mèo con đáng yêu chơi với sợi len 🧶',
    author: '@cute_kitty_vn',
    likes: 20100,
    comments: 512,
    thumbnail: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80'
  },
  {
    id: '5',
    title: 'Tổng hợp những tư thế ngủ kỳ lạ 😴',
    author: '@cat_sleeping_vn',
    likes: 18700,
    comments: 445,
    thumbnail: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&q=80'
  }
];

export function VideoFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const index = Math.round(element.scrollTop / element.clientHeight);
    setCurrentIndex(index);
  };

  const toggleLike = (videoId: string) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  return (
    <div
      className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      onScroll={handleScroll}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {mockVideos.map((video, index) => (
        <div
          key={video.id}
          className="h-full snap-start relative flex items-center justify-center bg-black"
        >
          {/* Video Thumbnail/Background */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

          {/* Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Video Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 text-white">
            <div className="flex items-end justify-between">
              <div className="flex-1 pr-4">
                <p className="font-medium mb-1">{video.author}</p>
                <p className="opacity-90">{video.title}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => toggleLike(video.id)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Heart
                      className={`w-6 h-6 ${likedVideos.has(video.id) ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </div>
                  <span className="text-xs">{likedVideos.has(video.id) ? video.likes + 1 : video.likes}</span>
                </button>

                <button className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="text-xs">{video.comments}</span>
                </button>

                <button className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs">Chia sẻ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          {index === 0 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="text-white text-xs opacity-60">Vuốt lên để xem tiếp</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
