import React, { useState } from 'react';
import { CartItem } from '../types';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Tag,
  MapPin,
  Check,
  ShoppingBag,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onClearCart,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Address Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number; amount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Payment Option
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('guruganesh@upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Confirmation Order Details
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const shipping = 0; // Free Insured Express Delivery
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'GURU10') {
      const amt = Math.round(subtotal * 0.10);
      setAppliedDiscount({ code: 'GURU10', percent: 10, amount: amt });
    } else if (code === 'WELCOME500') {
      setAppliedDiscount({ code: 'WELCOME500', percent: 0, amount: 500 });
    } else if (code === 'VIPGLOW') {
      const amt = Math.round(subtotal * 0.15);
      setAppliedDiscount({ code: 'VIPGLOW', percent: 15, amount: amt });
    } else {
      setCouponError('Invalid coupon code. Try GURU10 or WELCOME500');
    }
  };

  const handlePlaceOrder = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`GG-2026-${randomNum}`);
    setStep(4);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-[rgba(233,170,194,0.2)] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#FF6FA7]" />
            <h2 className="font-serif text-xl font-normal text-[#1E1E1E] uppercase tracking-wider">
              GURU GANESH EXPRESS CHECKOUT
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#666666] hover:text-[#FF6FA7] transition-colors rounded-full hover:bg-[#FFF0F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        {step < 4 && (
          <div className="bg-[#FFF8FA] px-8 py-3 border-b border-[rgba(233,170,194,0.2)] flex justify-between text-xs font-bold tracking-widest text-[#999999] uppercase">
            <span className={step === 1 ? 'text-[#FF6FA7] flex items-center' : step > 1 ? 'text-[#15803D]' : ''}>
              1. SHIPPING ADDRESS
            </span>
            <span>&gt;</span>
            <span className={step === 2 ? 'text-[#FF6FA7] flex items-center' : step > 2 ? 'text-[#15803D]' : ''}>
              2. COUPON &amp; SUMMARY
            </span>
            <span>&gt;</span>
            <span className={step === 3 ? 'text-[#FF6FA7] flex items-center' : ''}>
              3. PAYMENT METHOD
            </span>
          </div>
        )}

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-[#1E1E1E] uppercase">DELIVERY &amp; CONTACT DETAILS</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Roy"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 bg-white border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ananya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-white border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Phone Number (For Delivery Updates) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-white border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Delivery Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 400051"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full p-3 bg-white border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                  />
                  {pincode.length === 6 && (
                    <span className="text-[10px] text-[#15803D] font-bold mt-1 flex items-center">
                      <Check className="w-3 h-3 mr-1" /> Express Insured 2-3 Day Shipping Available
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Street Address / Apartment *</label>
                <input
                  type="text"
                  required
                  placeholder="House/Flat No., Street Name, Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 bg-white border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 bg-white border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">State</label>
                  <input
                    type="text"
                    placeholder="Maharashtra"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full p-3 bg-white border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                  />
                </div>
              </div>

              <button
                disabled={!fullName || !email || !phone || !address}
                onClick={() => setStep(2)}
                className="w-full btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase py-4 rounded-full shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>PROCEED TO COUPON &amp; SUMMARY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: COUPON & SUMMARY */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-[#1E1E1E] uppercase">ORDER SUMMARY &amp; PROMO CODE</h3>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#FF6FA7] font-bold flex items-center"
                >
                  <ChevronLeft className="w-4 h-4" /> Edit Address
                </button>
              </div>

              {/* Promo Coupon Form */}
              <div className="bg-white p-4 rounded-2xl border border-[rgba(233,170,194,0.3)] space-y-2">
                <span className="text-xs font-bold text-[#1E1E1E] uppercase flex items-center">
                  <Tag className="w-4 h-4 text-[#FF6FA7] mr-1.5" />
                  APPLY PROMO / VIP COUPON CODE
                </span>

                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter GURU10 or WELCOME500"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 p-2.5 bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs uppercase font-bold text-[#1E1E1E] focus:outline-none focus:border-[#FF6FA7]"
                  />
                  <button
                    type="submit"
                    className="btn-pink-luxury text-white text-xs font-bold tracking-wider px-5 rounded-xl uppercase"
                  >
                    APPLY
                  </button>
                </form>

                {couponError && <p className="text-[11px] text-[#DC2626] font-semibold">{couponError}</p>}

                {appliedDiscount && (
                  <div className="p-2.5 bg-[#DCFCE7] text-[#15803D] rounded-xl text-xs font-bold flex items-center justify-between">
                    <span>Code '{appliedDiscount.code}' Applied! Saved ₹{appliedDiscount.amount.toLocaleString('en-IN')}</span>
                    <button onClick={() => setAppliedDiscount(null)} className="text-[#DC2626] text-[10px] uppercase underline">Remove</button>
                  </div>
                )}
              </div>

              {/* Order Items Breakdown */}
              <div className="bg-white p-4 rounded-2xl border border-[rgba(233,170,194,0.3)] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C98A9F]">ITEMS IN YOUR BAG</h4>
                <div className="divide-y divide-[#FDEEF3]">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                        <div>
                          <div className="font-bold text-[#1E1E1E]">{item.product.name}</div>
                          <div className="text-[10px] text-[#999999]">Qty: {item.quantity} • {item.product.finish}</div>
                        </div>
                      </div>
                      <div className="font-bold text-[#1E1E1E]">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#FDEEF3] space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#666666]">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-[#15803D] font-bold">
                      <span>Promo Discount ({appliedDiscount.code})</span>
                      <span>-₹{appliedDiscount.amount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#666666]">
                    <span>Express Insured Shipping</span>
                    <span className="text-[#15803D] font-bold uppercase">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#1E1E1E] pt-2 border-t border-[#FDEEF3]">
                    <span>Total Amount Payable</span>
                    <span className="text-[#FF6FA7]">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase py-4 rounded-full shadow-lg flex items-center justify-center space-x-2"
              >
                <span>PROCEED TO PAYMENT (₹{total.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-[#1E1E1E] uppercase">SELECT PAYMENT METHOD</h3>
                <button onClick={() => setStep(2)} className="text-xs text-[#FF6FA7] font-bold flex items-center">
                  <ChevronLeft className="w-4 h-4" /> Back to Summary
                </button>
              </div>

              {/* Payment Type Toggles */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-center text-xs font-bold uppercase transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#FF6FA7] bg-[#FF6FA7]/10 text-[#FF6FA7] shadow-xs'
                      : 'border-[rgba(233,170,194,0.3)] bg-white text-[#1E1E1E]'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-[#FF6FA7]" />
                  <span>UPI / GPay / PhonePe</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-center text-xs font-bold uppercase transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#FF6FA7] bg-[#FF6FA7]/10 text-[#FF6FA7] shadow-xs'
                      : 'border-[rgba(233,170,194,0.3)] bg-white text-[#1E1E1E]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#FF6FA7]" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-center text-xs font-bold uppercase transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#FF6FA7] bg-[#FF6FA7]/10 text-[#FF6FA7] shadow-xs'
                      : 'border-[rgba(233,170,194,0.3)] bg-white text-[#1E1E1E]'
                  }`}
                >
                  <Truck className="w-5 h-5 mx-auto mb-1 text-[#FF6FA7]" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Payment Inputs */}
              {paymentMethod === 'upi' && (
                <div className="bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.3)] space-y-3">
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase">Virtual Payment Address (VPA) / UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full p-3 bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs font-bold text-[#1E1E1E]"
                  />
                  <p className="text-[11px] text-[#666666]">Enter your UPI ID (Google Pay, PhonePe, Paytm, BHIM) to receive an instant payment request.</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.3)] space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="4532 •••• •••• 8942"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-3 bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs font-bold text-[#1E1E1E]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-3 bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs font-bold text-[#1E1E1E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-3 bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs font-bold text-[#1E1E1E]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.3)] space-y-2 text-center">
                  <ShieldCheck className="w-8 h-8 text-[#15803D] mx-auto" />
                  <h4 className="text-xs font-bold text-[#1E1E1E] uppercase">CASH ON DELIVERY SELECTED</h4>
                  <p className="text-xs text-[#666666]">Pay ₹{total.toLocaleString('en-IN')} in cash upon delivery to your doorstep. An OTP verification code will be sent to {phone}.</p>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                className="w-full btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase py-4 rounded-full shadow-lg flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>PAY ₹{total.toLocaleString('en-IN')} &amp; CONFIRM ORDER</span>
              </button>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMATION RECEIPT */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#FF6FA7] tracking-[0.25em] uppercase">ORDER SUCCESSFULLY PLACED</span>
                <h3 className="font-serif text-3xl font-normal text-[#1E1E1E] uppercase">THANK YOU FOR YOUR ORDER!</h3>
                <p className="text-xs text-[#666666] max-w-md mx-auto">
                  Your luxury jewelry order <span className="font-bold text-[#1E1E1E]">{orderId}</span> has been confirmed and dispatched for 100% insured express delivery.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.3)] max-w-md mx-auto text-left text-xs space-y-3 shadow-xs">
                <div className="flex justify-between border-b border-[#FDEEF3] pb-2">
                  <span className="text-[#999999] uppercase font-bold">Order ID</span>
                  <span className="font-bold text-[#1E1E1E]">{orderId}</span>
                </div>
                <div className="flex justify-between border-b border-[#FDEEF3] pb-2">
                  <span className="text-[#999999] uppercase font-bold">Customer Name</span>
                  <span className="font-bold text-[#1E1E1E]">{fullName}</span>
                </div>
                <div className="flex justify-between border-b border-[#FDEEF3] pb-2">
                  <span className="text-[#999999] uppercase font-bold">Estimated Delivery</span>
                  <span className="font-bold text-[#15803D]">Express Insured (2-3 Business Days)</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm">
                  <span>Total Amount Paid</span>
                  <span className="text-[#FF6FA7]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase px-8 py-3.5 rounded-full shadow-lg"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
