import React, { useState } from 'react';
import { Product } from '../types';
import { GuruGaneshLogo } from './GuruGaneshLogo';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  Sparkles,
  PackageCheck,
  TrendingUp,
  AlertCircle,
  Crown,
  Tag,
  ArrowLeft,
  Eye,
  CheckCircle2,
  XCircle,
  Layers,
} from 'lucide-react';
import { ProductFormModal } from './ProductFormModal';

interface AdminPageProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
  onBackToShop: () => void;
  onSelectProduct: (product: Product) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  onBackToShop,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [stockFilter, setStockFilter] = useState<'ALL' | 'IN_STOCK' | 'OUT_OF_STOCK' | 'BESTSELLER' | 'SALE'>('ALL');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const bestsellersCount = products.filter((p) => p.isBestseller).length;
  const outOfStockCount = products.filter((p) => p.inStock === false).length;
  const saleCount = products.filter((p) => p.isSale || (p.originalPrice && p.originalPrice > p.price)).length;

  // Filtered Products List
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'ALL' || p.category.toLowerCase() === categoryFilter.toLowerCase();

    let matchesStock = true;
    if (stockFilter === 'IN_STOCK') matchesStock = p.inStock !== false;
    if (stockFilter === 'OUT_OF_STOCK') matchesStock = p.inStock === false;
    if (stockFilter === 'BESTSELLER') matchesStock = !!p.isBestseller;
    if (stockFilter === 'SALE') matchesStock = !!p.isSale || (!!p.originalPrice && p.originalPrice > p.price);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (savedProduct: Product) => {
    if (editingProduct) {
      onUpdateProduct(savedProduct);
    } else {
      onAddProduct(savedProduct);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  const handleToggleStock = (product: Product) => {
    onUpdateProduct({
      ...product,
      inStock: product.inStock === false ? true : false,
    });
  };

  const handleToggleBestseller = (product: Product) => {
    onUpdateProduct({
      ...product,
      isBestseller: !product.isBestseller,
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Title & Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-[#E89AB5]/40 shadow-sm">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <div className="p-2 rounded-xl bg-white border border-[#E89AB5]/40 shadow-xs">
                <GuruGaneshLogo size={36} showText={false} />
              </div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1E1E1E]">
                GURU GANESH Admin Concierge
              </h1>
            </div>
            <p className="text-xs text-[#B85B7A] tracking-wider uppercase">
              Jewelry Inventory & Product Catalog Management
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToShop}
              className="px-4 py-2.5 rounded-xl border border-[#E89AB5]/50 bg-white text-xs font-semibold tracking-wider text-neutral-700 hover:bg-[#E89AB5]/15 transition-all flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </button>

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="px-4 py-2.5 rounded-xl border border-rose-300 bg-rose-50 text-xs font-semibold tracking-wider text-rose-700 hover:bg-rose-100 transition-all flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Default Catalog</span>
            </button>

            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B85B7A] to-[#E89AB5] text-white text-xs font-semibold tracking-wider uppercase hover:opacity-95 shadow-md shadow-[#B85B7A]/20 transition-all flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Inventory Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white/80 p-5 rounded-2xl border border-[#E89AB5]/40 shadow-sm flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-[#B85B7A]/10 text-[#B85B7A]">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Total Items</p>
              <p className="text-xl font-bold text-neutral-800">{totalProducts}</p>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-2xl border border-[#E89AB5]/40 shadow-sm flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Catalog Value</p>
              <p className="text-xl font-bold text-neutral-800">₹{totalValue.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-2xl border border-[#E89AB5]/40 shadow-sm flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Bestsellers</p>
              <p className="text-xl font-bold text-neutral-800">{bestsellersCount}</p>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-2xl border border-[#E89AB5]/40 shadow-sm flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-rose-100 text-rose-600">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">On Sale</p>
              <p className="text-xl font-bold text-neutral-800">{saleCount}</p>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-2xl border border-[#E89AB5]/40 shadow-sm flex items-center space-x-4 col-span-2 md:col-span-1">
            <div className="p-3 rounded-xl bg-red-100 text-red-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Out of Stock</p>
              <p className="text-xl font-bold text-neutral-800">{outOfStockCount}</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-[#E89AB5]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, SKU, category..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFF0F5]/50 border border-[#E89AB5]/30 rounded-xl text-sm focus:ring-2 focus:ring-[#B85B7A] focus:outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {['ALL', 'Necklaces', 'Earrings', 'Rings', 'Bracelets'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  categoryFilter === cat
                    ? 'bg-[#B85B7A] text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-[#E89AB5]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stock & Tag Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="px-3.5 py-2 bg-[#FFF0F5]/50 border border-[#E89AB5]/30 rounded-xl text-xs font-medium text-neutral-700 focus:outline-none"
            >
              <option value="ALL">All Items Status</option>
              <option value="IN_STOCK">In Stock Only</option>
              <option value="OUT_OF_STOCK">Out of Stock Only</option>
              <option value="BESTSELLER">Bestsellers Only</option>
              <option value="SALE">On Sale Only</option>
            </select>
          </div>
        </div>

        {/* Product Inventory Table */}
        <div className="bg-white rounded-3xl border border-[#E89AB5]/40 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFF0F5]/70 border-b border-[#E89AB5]/30 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4">SKU / Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Stock Status</th>
                  <th className="py-4 px-4">Collection Badges</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E89AB5]/20 text-sm">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-400">
                      No products found matching your search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-[#FFF0F5]/30 transition-all group">
                      {/* Product Thumbnail & Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#E89AB5]/40 shadow-sm"
                          />
                          <div>
                            <p className="font-bold text-neutral-900 line-clamp-1">{product.name}</p>
                            <p className="text-xs text-neutral-400 line-clamp-1">
                              {product.material || '18k Rose Gold Vermeil'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SKU & Category */}
                      <td className="py-4 px-4">
                        <span className="font-mono text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                          {product.sku || 'N/A'}
                        </span>
                        <p className="text-xs font-semibold text-[#B85B7A] uppercase mt-1">
                          {product.category}
                        </p>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4">
                        <p className="font-bold text-neutral-900">₹{product.price.toLocaleString()}</p>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-xs text-neutral-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </td>

                      {/* Stock Toggle Status */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleStock(product)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            product.inStock !== false
                              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                              : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                          }`}
                        >
                          {product.inStock !== false ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>In Stock</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Out of Stock</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Collection Badges & Quick Toggles */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            onClick={() => handleToggleBestseller(product)}
                            className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase transition-all ${
                              product.isBestseller
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
                            }`}
                          >
                            ⭐ Bestseller
                          </button>

                          {product.isSummerCollection && (
                            <span className="bg-pink-100 text-pink-800 border border-pink-200 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase">
                              🌸 Summer
                            </span>
                          )}

                          {product.isNew && (
                            <span className="bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase">
                              ✨ New
                            </span>
                          )}

                          {product.isSale && (
                            <span className="bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase">
                              🔥 Sale
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              onSelectProduct(product);
                            }}
                            title="View in Store"
                            className="p-2 rounded-lg text-neutral-500 hover:text-[#B85B7A] hover:bg-[#E89AB5]/20 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(product)}
                            title="Edit Product Details"
                            className="p-2 rounded-lg text-neutral-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setProductToDelete(product)}
                            title="Delete Product"
                            className="p-2 rounded-lg text-neutral-500 hover:text-rose-600 hover:bg-rose-50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Product Form Modal (Add / Edit) */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-rose-200 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-serif text-lg font-bold text-neutral-900">Delete Product</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Are you sure you want to delete <span className="font-bold text-neutral-900">"{productToDelete.name}"</span>?
              This action will remove the product from the catalog.
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 transition-all"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Default Catalog Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-amber-200 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-amber-600">
              <RotateCcw className="w-6 h-6" />
              <h3 className="font-serif text-lg font-bold text-neutral-900">Reset Product Catalog</h3>
            </div>
            <p className="text-sm text-neutral-600">
              This will restore all default GLOW & CO. products and erase custom product additions/edits saved in LocalStorage.
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetProducts();
                  setIsResetConfirmOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 shadow-md transition-all"
              >
                Reset Catalog
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
