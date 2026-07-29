import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ring' | 'wrist'>('ring');
  const [diameterMm, setDiameterMm] = useState<number>(16.5);
  const [wristCm, setWristCm] = useState<number>(16);

  if (!isOpen) return null;

  // Ring Size Calculation
  const calculateRingSize = (mm: number) => {
    if (mm < 14.5) return { us: '4', uk: 'H', eu: '47', circum: '45.5 mm' };
    if (mm < 15.3) return { us: '4.5', uk: 'I 1/2', eu: '48', circum: '48.0 mm' };
    if (mm < 16.1) return { us: '5', uk: 'J 1/2', eu: '50', circum: '50.3 mm' };
    if (mm < 16.9) return { us: '6', uk: 'L 1/2', eu: '52', circum: '53.1 mm' };
    if (mm < 17.7) return { us: '7', uk: 'N 1/2', eu: '54', circum: '55.6 mm' };
    if (mm < 18.5) return { us: '8', uk: 'P 1/2', eu: '57', circum: '58.1 mm' };
    if (mm < 19.3) return { us: '9', uk: 'R 1/2', eu: '59', circum: '60.6 mm' };
    return { us: '10+', uk: 'T+', eu: '62+', circum: '63.0+ mm' };
  };

  const ringInfo = calculateRingSize(diameterMm);

  // Wrist Size Calculation
  const calculateWristFit = (cm: number) => {
    if (cm <= 14.5) return { fit: 'Extra Small (XS)', length: '15.5 cm (6.1")' };
    if (cm <= 16.0) return { fit: 'Small (S)', length: '17.0 cm (6.7")' };
    if (cm <= 17.5) return { fit: 'Medium (M)', length: '18.5 cm (7.3")' };
    return { fit: 'Large (L)', length: '20.0 cm (7.9")' };
  };

  const wristInfo = calculateWristFit(wristCm);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-[rgba(233,170,194,0.3)] w-full max-w-3xl rounded-2xl luxury-card-shadow overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#FDEEF3] bg-[#FFF8FA] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-[#FDEEF3] text-[#FF6FA7] rounded-full">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1E1E1E] uppercase tracking-wider">
                FINE JEWELRY SIZE FINDER
              </h2>
              <p className="text-xs text-[#666666] font-light">
                Find your perfect ring &amp; bracelet fit with our interactive calculator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#999999] hover:text-[#1E1E1E] rounded-full hover:bg-[#FDEEF3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#FDEEF3] bg-[#FFF8FA] px-6">
          <button
            onClick={() => setActiveTab('ring')}
            className={`py-3 px-6 text-xs font-bold tracking-widest uppercase border-b-2 transition-all ${
              activeTab === 'ring'
                ? 'border-[#FF6FA7] text-[#FF6FA7]'
                : 'border-transparent text-[#666666] hover:text-[#1E1E1E]'
            }`}
          >
            RING SIZE CALCULATOR
          </button>
          <button
            onClick={() => setActiveTab('wrist')}
            className={`py-3 px-6 text-xs font-bold tracking-widest uppercase border-b-2 transition-all ${
              activeTab === 'wrist'
                ? 'border-[#FF6FA7] text-[#FF6FA7]'
                : 'border-transparent text-[#666666] hover:text-[#1E1E1E]'
            }`}
          >
            BRACELET &amp; WRIST FIT
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {activeTab === 'ring' ? (
            <div className="space-y-6">
              
              {/* Interactive Ring Slider */}
              <div className="bg-[#FFF8FA] p-6 rounded-2xl border border-[rgba(233,170,194,0.3)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]">
                    SLIDE FINGER / EXISTING RING DIAMETER:
                  </label>
                  <span className="text-lg font-bold text-[#FF6FA7]">{diameterMm.toFixed(1)} mm</span>
                </div>
                
                <input
                  type="range"
                  min="14.0"
                  max="20.0"
                  step="0.1"
                  value={diameterMm}
                  onChange={(e) => setDiameterMm(parseFloat(e.target.value))}
                  className="w-full accent-[#FF6FA7] h-2 bg-[#FDEEF3] rounded-lg cursor-pointer"
                />

                {/* Visual Ring Circle Circle Preview */}
                <div className="flex items-center justify-center py-4">
                  <div
                    className="border-2 border-[#FF6FA7] rounded-full flex items-center justify-center transition-all duration-150 shadow-md bg-white"
                    style={{
                      width: `${diameterMm * 5}px`,
                      height: `${diameterMm * 5}px`,
                    }}
                  >
                    <span className="text-[10px] font-bold text-[#FF6FA7]">{diameterMm.toFixed(1)}mm</span>
                  </div>
                </div>
              </div>

              {/* Calculated Sizes Result Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-[#FDEEF3]/70 p-4 rounded-xl border border-[rgba(233,170,194,0.3)]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F]">US / CANADA</div>
                  <div className="text-2xl font-bold text-[#1E1E1E] mt-1">SIZE {ringInfo.us}</div>
                </div>
                <div className="bg-[#FDEEF3]/70 p-4 rounded-xl border border-[rgba(233,170,194,0.3)]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F]">UK / AUSTRALIA</div>
                  <div className="text-2xl font-bold text-[#1E1E1E] mt-1">SIZE {ringInfo.uk}</div>
                </div>
                <div className="bg-[#FDEEF3]/70 p-4 rounded-xl border border-[rgba(233,170,194,0.3)]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F]">EUROPE</div>
                  <div className="text-2xl font-bold text-[#1E1E1E] mt-1">EU {ringInfo.eu}</div>
                </div>
                <div className="bg-[#FDEEF3]/70 p-4 rounded-xl border border-[rgba(233,170,194,0.3)]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F]">CIRCUMFERENCE</div>
                  <div className="text-lg font-bold text-[#1E1E1E] mt-1">{ringInfo.circum}</div>
                </div>
              </div>

              {/* Measuring Advice */}
              <div className="flex items-start space-x-3 text-xs text-[#666666] bg-[#FFF8FA] p-4 rounded-xl border border-[rgba(233,170,194,0.2)]">
                <CheckCircle2 className="w-5 h-5 text-[#FF6FA7] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Pro Tip:</strong> Measure your fingers at the end of the day when they are warm. If you are between sizes, we recommend selecting the larger size for maximum comfort.
                </p>
              </div>

            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Wrist Slider */}
              <div className="bg-[#FFF8FA] p-6 rounded-2xl border border-[rgba(233,170,194,0.3)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]">
                    WRIST CIRCUMFERENCE (CM):
                  </label>
                  <span className="text-lg font-bold text-[#FF6FA7]">{wristCm.toFixed(1)} cm</span>
                </div>
                
                <input
                  type="range"
                  min="13.0"
                  max="19.0"
                  step="0.5"
                  value={wristCm}
                  onChange={(e) => setWristCm(parseFloat(e.target.value))}
                  className="w-full accent-[#FF6FA7] h-2 bg-[#FDEEF3] rounded-lg cursor-pointer"
                />
              </div>

              {/* Wrist Fit Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="bg-[#FDEEF3]/70 p-6 rounded-xl border border-[rgba(233,170,194,0.3)]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C98A9F]">RECOMMENDED FIT</div>
                  <div className="text-2xl font-bold text-[#1E1E1E] mt-1">{wristInfo.fit}</div>
                </div>
                <div className="bg-[#FDEEF3]/70 p-6 rounded-xl border border-[rgba(233,170,194,0.3)]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C98A9F]">IDEAL BRACELET LENGTH</div>
                  <div className="text-2xl font-bold text-[#FF6FA7] mt-1">{wristInfo.length}</div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#FDEEF3] bg-[#FFF8FA] text-center">
          <button
            onClick={onClose}
            className="btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase px-8 py-3 rounded-full shadow-md"
          >
            GOT IT, THANKS!
          </button>
        </div>

      </div>
    </div>
  );
};
