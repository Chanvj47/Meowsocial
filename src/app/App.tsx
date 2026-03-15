import { useState } from 'react';
import { Video, AlertCircle, Heart } from 'lucide-react';
import { VideoFeed } from './components/VideoFeed';
import { LostCatListing } from './components/LostCatListing';
import { AdoptionListing } from './components/AdoptionListing';

type Tab = 'videos' | 'lost' | 'adoption';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('videos');

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'videos' && <VideoFeed />}
        {activeTab === 'lost' && <LostCatListing />}
        {activeTab === 'adoption' && <AdoptionListing />}
      </div>

      {/* Bottom Navigation */}
      <nav className="border-t border-gray-200 bg-white">
        <div className="flex items-center justify-around px-4 py-3">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'videos' ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <Video className="w-6 h-6" />
            <span className="text-xs">Video</span>
          </button>

          <button
            onClick={() => setActiveTab('lost')}
            className={`flex flex-col items-center gap-1 transition-colors relative ${
              activeTab === 'lost' ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <div className="relative">
              <AlertCircle className={`w-6 h-6 ${activeTab === 'lost' ? 'animate-pulse' : ''}`} />
              {activeTab !== 'lost' && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
            <span className="text-xs">Tìm mèo</span>
          </button>

          <button
            onClick={() => setActiveTab('adoption')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'adoption' ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs">Nhận nuôi</span>
          </button>
        </div>
      </nav>
    </div>
  );
}