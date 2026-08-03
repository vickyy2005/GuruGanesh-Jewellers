import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Sparkles, Image as ImageIcon, Save, Plus, Tag, Layers, Check } from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit?: Product | null;
}

const PRESET_IMAGES = [
  { name: 'Rose Gold Pendant', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop' },
  { name: 'Blush Huggie Hoops', url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop' },
  { name: 'Halo Solitaire Ring', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop' },
  { name: 'Paperclip Chain Bracelet', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
  { name: 'Sunburst Medallion', url: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop' },
  { name: 'Pink Starburst Ring', url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop' },
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  productToEdit,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'media' | 'specs'>('basic');

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Necklaces',
    price: 4999,
    originalPrice: undefined,
    rating: 4.9,
    reviewsCount: 12,
    sku: `GLW-${Date.now().toString().slice(-4)}`,
    image: PRESET_IMAGES[0].url,
    gallery: [PRESET_IMAGES[0].url],
    description: '',
    isBestseller: false,
    isSummerCollection: false,
    isNew: true,
    isSale: false,
    inStock: true,
    material: '18k Rose Gold Vermeil',
    stoneDetails: 'AAA Pink Sapphire & CZ',
    deliveryEstimate: '2-3 Business Days',
    gender: 'Women',
    variants: ['18k Rose Gold', 'Sterling Silver'],
    sizes: [],
    details: [
      'Base: 925 Sterling Silver dipped in 18k Rose Gold',
      'Anti-tarnish luxury protective coating',
    ],
    materialsCare: 'Avoid direct application of perfumes. Wipe clean with soft jewelry cloth.',
    shippingReturns: 'Complimentary shipping over ₹2,999. 30-day return policy.',
  });

  const [variantsInput, setVariantsInput] = useState('18k Rose Gold, Sterling Silver');
  const [sizesInput, setSizesInput] = useState('');
  const [detailsInput, setDetailsInput] = useState('Base: 925 Sterling Silver dipped in 18k Rose Gold\nAnti-tarnish luxury coating');
  const [galleryInput, setGalleryInput] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setFormData({ ...productToEdit });
      setVariantsInput(productToEdit.variants?.join(', ') || '');
      setSizesInput(productToEdit.sizes?.join(', ') || '');
      setDetailsInput(productToEdit.details?.join('\n') || '');
      setGalleryInput(productToEdit.gallery?.join('\n') || productToEdit.image || '');
    } else {
      const newSku = `GLW-${Math.floor(100 + Math.random() * 900)}`;
      setFormData({
        name: '',
        category: 'Necklaces',
        price: 4999,
        originalPrice: undefined,
        rating: 4.9,
        reviewsCount: 1,
        sku: newSku,
        image: PRESET_IMAGES[0].url,
        gallery: [PRESET_IMAGES[0].url],
        description: 'Handcrafted fine jewelry designed with timeless rose gold brilliance.',
        isBestseller: false,
        isSummerCollection: false,
        isNew: true,
        isSale: false,
        inStock: true,
        material: '18k Rose Gold Vermeil',
        stoneDetails: 'AAA Crystal Accents',
        deliveryEstimate: '2-3 Business Days',
        gender: 'Women',
        variants: ['18k Rose Gold', '925 Sterling Silver'],
        sizes: [],
        details: [
          'Handcrafted in 925 Sterling Silver with 18k Rose Gold Plating',
          'Tarnish-resistant finish & 100% Nickel-Free',
        ],
        materialsCare: 'Clean gently using microfiber jewelry cloth after wear.',
        shippingReturns: 'Complimentary shipping & 30-day return guarantee.',
      });
      setVariantsInput('18k Rose Gold, 925 Sterling Silver');
      setSizesInput('');
      setDetailsInput('Handcrafted in 925 Sterling Silver with 18k Rose Gold Plating\nTarnish-resistant finish & 100% Nickel-Free');
      setGalleryInput(PRESET_IMAGES[0].url);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert('Please enter a product name');
      return;
    }

    const galleryArr = galleryInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const variantsArr = variantsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const sizesArr = sizesInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const detailsArr = detailsInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const finalProduct: Product = {
      id: productToEdit?.id || `prod-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category || 'Necklaces',
      price: Number(formData.price) || 0,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      rating: Number(formData.rating) || 4.9,
      reviewsCount: Number(formData.reviewsCount) || 10,
      image: formData.image || PRESET_IMAGES[0].url,
      gallery: galleryArr.length > 0 ? galleryArr : [formData.image || PRESET_IMAGES[0].url],
      description: formData.description || '',
      isBestseller: !!formData.isBestseller,
      isSummerCollection: !!formData.isSummerCollection,
      isNew: !!formData.isNew,
      isSale: !!formData.isSale,
      inStock: formData.inStock !== undefined ? formData.inStock : true,
      sku: formData.sku || `GLW-${Date.now().toString().slice(-4)}`,
      material: formData.material || '18k Rose Gold Vermeil',
      stoneDetails: formData.stoneDetails || 'Crystal Accents',
      deliveryEstimate: formData.deliveryEstimate || '2-3 Business Days',
      gender: formData.gender || 'Women',
      variants: variantsArr,
      sizes: sizesArr,
      details: detailsArr,
      materialsCare: formData.materialsCare || '',
      shippingReturns: formData.shippingReturns || '',
    };

    onSave(finalProduct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#FFF0F5] border border-[#E89AB5]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#E89AB5]/30 bg-white/60">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#B85B7A] to-[#E89AB5] text-white">
              {productToEdit ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1E1E1E]">
                {productToEdit ? `Edit Product: ${productToEdit.name}` : 'Add New Luxury Piece'}
              </h2>
              <p className="text-xs text-[#B85B7A] tracking-wider uppercase">
                Catalog Management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-[#E89AB5]/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E89AB5]/30 bg-white/30 px-8">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`px-5 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'basic'
                ? 'border-[#B85B7A] text-[#B85B7A]'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Basic Details</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`px-5 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'media'
                ? 'border-[#B85B7A] text-[#B85B7A]'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Media & Badges</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`px-5 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'specs'
                ? 'border-[#B85B7A] text-[#B85B7A]'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Variants & Care</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
          {activeTab === 'basic' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Radiant Circle Pendant"
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category || 'Necklaces'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'Necklaces' | 'Earrings' | 'Rings' | 'Bracelets',
                      })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  >
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Rings">Rings</option>
                    <option value="Bracelets">Bracelets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Original Price (₹) <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 11999"
                    value={formData.originalPrice || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku || ''}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="GLW-NK-001"
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter a compelling luxury jewelry description..."
                  className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Rating (1.0 to 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating || 4.9}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Reviews Count
                  </label>
                  <input
                    type="number"
                    value={formData.reviewsCount || 10}
                    onChange={(e) => setFormData({ ...formData, reviewsCount: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Main Image URL *
                </label>
                <div className="flex space-x-3">
                  <input
                    type="url"
                    required
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Preset Image Options */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                  Or Select From Presets:
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        formData.image === preset.url
                          ? 'border-[#B85B7A] ring-2 ring-[#B85B7A]/40'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      {formData.image === preset.url && (
                        <div className="absolute inset-0 bg-[#B85B7A]/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="flex items-center space-x-4 bg-white p-3 rounded-xl border border-[#E89AB5]/30">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg border border-[#E89AB5]/40"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', PRESET_IMAGES[0].url);
                    }}
                  />
                  <div>
                    <p className="text-xs font-bold text-neutral-800">Image Preview</p>
                    <p className="text-[11px] text-neutral-500">Live image preview for catalog display</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Gallery Image URLs (One URL per line)
                </label>
                <textarea
                  rows={3}
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-1..."
                  className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                />
              </div>

              {/* Badges and Collection Flags */}
              <div className="bg-white p-5 rounded-2xl border border-[#E89AB5]/40 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#B85B7A]">
                  Collection Flags & Stock Status
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock ?? true}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="w-4 h-4 accent-[#B85B7A] rounded"
                    />
                    <span className="text-xs font-medium text-neutral-800">In Stock</span>
                  </label>

                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestseller ?? false}
                      onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                      className="w-4 h-4 accent-[#B85B7A] rounded"
                    />
                    <span className="text-xs font-medium text-neutral-800">Bestseller</span>
                  </label>

                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSummerCollection ?? false}
                      onChange={(e) => setFormData({ ...formData, isSummerCollection: e.target.checked })}
                      className="w-4 h-4 accent-[#B85B7A] rounded"
                    />
                    <span className="text-xs font-medium text-neutral-800">Summer Collection</span>
                  </label>

                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNew ?? false}
                      onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                      className="w-4 h-4 accent-[#B85B7A] rounded"
                    />
                    <span className="text-xs font-medium text-neutral-800">New Arrival</span>
                  </label>

                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSale ?? false}
                      onChange={(e) => setFormData({ ...formData, isSale: e.target.checked })}
                      className="w-4 h-4 accent-[#B85B7A] rounded"
                    />
                    <span className="text-xs font-medium text-neutral-800">On Sale</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Material
                  </label>
                  <input
                    type="text"
                    value={formData.material || ''}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="18k Rose Gold Vermeil"
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Stone Details
                  </label>
                  <input
                    type="text"
                    value={formData.stoneDetails || ''}
                    onChange={(e) => setFormData({ ...formData, stoneDetails: e.target.value })}
                    placeholder="AAA Pink Sapphire & CZ"
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Color Variants (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={variantsInput}
                    onChange={(e) => setVariantsInput(e.target.value)}
                    placeholder="18k Rose Gold, Yellow Gold, Sterling Silver"
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Available Sizes (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={sizesInput}
                    onChange={(e) => setSizesInput(e.target.value)}
                    placeholder="US 5, US 6, US 7, US 8"
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Product Details (One bullet per line)
                </label>
                <textarea
                  rows={3}
                  value={detailsInput}
                  onChange={(e) => setDetailsInput(e.target.value)}
                  placeholder="Base: 925 Sterling Silver..."
                  className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Materials & Care Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.materialsCare || ''}
                    onChange={(e) => setFormData({ ...formData, materialsCare: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Shipping & Returns Policy
                  </label>
                  <textarea
                    rows={2}
                    value={formData.shippingReturns || ''}
                    onChange={(e) => setFormData({ ...formData, shippingReturns: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E89AB5]/40 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Submit Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-[#E89AB5]/30">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold tracking-wider text-neutral-700 hover:bg-neutral-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B85B7A] to-[#E89AB5] text-white text-xs font-semibold tracking-wider uppercase hover:opacity-95 shadow-md shadow-[#B85B7A]/20 transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{productToEdit ? 'Update Product' : 'Add Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
