import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    User,
    Package,
    Heart,
    Settings,
    LogOut,
    Box,
    MapPin,
    ShoppingCart,
    ChevronRight,
    Edit,
    Plus,
    Trash2,
    Zap,
    Database,
    ShieldCheck,
    Sparkles,
    Mail,
    Phone
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModelDetailOverlay from '../components/ModelDetailOverlay';
import { useAuth } from '../context/AuthContext';

const Account = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');
    const [isEditing, setIsEditing] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [tempAvatar, setTempAvatar] = useState(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [cropScale, setCropScale] = useState(1);
    const [imgRotation, setImgRotation] = useState(0);
    const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
    const imgRef = useRef(null);
    const [favouriteItems, setFavouriteItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);

    useEffect(() => {
        const loadSavedData = () => {
            const defaultFavs = [
                { id: 101, name: 'Precision Gear Set', price: 4500, category: 'Engineering', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600' },
                { id: 102, name: 'Tough Resin V4', price: 8999, category: 'Medical', image: 'https://images.unsplash.com/photo-1579154235602-3c2cff46886e?auto=format&fit=crop&q=80&w=600' },
                { id: 103, name: 'Custom Drone Chassis', price: 14900, category: 'Aerospace', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' },
                { id: 104, name: 'Prototyping Kit V2', price: 8550, category: 'Industry', image: 'https://images.unsplash.com/photo-1563206767-5b18f21dae90?auto=format&fit=crop&q=80&w=600' },
                { id: 105, name: 'Aerospace Carbon Fiber', price: 3500, category: 'Aerospace', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600' },
                { id: 106, name: 'Industrial PLA Red', price: 2950, category: 'Materials', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600' },
                { id: 107, name: 'Detail Resin Clear', price: 7525, category: 'Art', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=600' },
                { id: 108, name: 'Bronze Infused Filament', price: 6800, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600' }
            ];

            let storedFavs = JSON.parse(localStorage.getItem('favorites') || '[]');

            if (storedFavs.length === 0) {
                localStorage.setItem('favorites', JSON.stringify(defaultFavs));
                storedFavs = defaultFavs;
                window.dispatchEvent(new Event('wishlistUpdated'));
            }

            setFavouriteItems(storedFavs);

            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartItems(storedCart.map(item => ({
                ...item,
                qty: item.quantity || 1,
                img: item.image || item.img
            })));
        };


        loadSavedData();
        window.addEventListener('wishlistUpdated', loadSavedData);
        window.addEventListener('cartUpdated', loadSavedData);
        window.addEventListener('profileUpdate', () => {
            setProfileData(prev => ({
                ...prev,
                avatar: localStorage.getItem(`avatar_${user?.uid}`) || user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.displayName || 'user'}`,
                phone: localStorage.getItem(`phone_${user?.uid}`) || "---"
            }));
        });

        return () => {
            window.removeEventListener('wishlistUpdated', loadSavedData);
            window.removeEventListener('cartUpdated', loadSavedData);
        };
    }, [user]);

    const toggleFavourite = (id) => {
        const updated = favouriteItems.filter(item => item.id !== id);
        setFavouriteItems(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
        window.dispatchEvent(new Event('wishlistUpdated'));
    };
    const [profileData, setProfileData] = useState({
        name: user?.displayName || "New User",
        email: user?.email || "",
        phone: localStorage.getItem(`phone_${user?.uid}`) || "---",
        specializations: ["Aerospace", "Medical Devices", "Rapid Prototyping"],
        avatar: localStorage.getItem(`avatar_${user?.uid}`) || user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.displayName || 'user'}`
    });

    useEffect(() => {
        if (user?.uid) {
            const storedCrop = localStorage.getItem(`crop_${user.uid}`);
            if (storedCrop) {
                const crop = JSON.parse(storedCrop);
                setCropScale(crop.scale);
                setImgRotation(crop.rotate);
                setCropPosition({ x: crop.x, y: crop.y });
            }
        }
    }, [user]);

    const userData = {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        memberSince: user?.metadata?.creationTime ? new Date(user.metadata.creationTime).getFullYear() : "2025",
        tier: "Standard Designer",
        status: "Active",
        avatar: profileData.avatar,
        stats: {
            orders: 0,
            favourites: favouriteItems.length,
            credits: 0,
            storage: "0 GB / 5 GB",
            prints: 0
        }
    };

    const handleToggleEdit = () => {
        if (isEditing) {
            // Validate phone number - only if it's not the default "---"
            if (profileData.phone !== "---") {
                if (profileData.phone.length !== 10) {
                    setPhoneError('Phone number must be exactly 10 digits');
                    return;
                }
                localStorage.setItem(`phone_${user?.uid}`, profileData.phone);
            }
            setPhoneError('');
        }
        setIsEditing(!isEditing);
    };

    const menuItems = [
        { id: 'profile', label: 'Profile Settings', icon: <User size={20} /> },
        { id: 'orders', label: 'Order History', icon: <Package size={20} /> },
        { id: 'cart', label: 'My Cart', icon: <ShoppingCart size={20} /> },
        { id: 'favourites', label: 'Favourite Designs', icon: <Heart size={20} /> },
        { id: 'address', label: 'My Addresses', icon: <MapPin size={20} /> },
    ];

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [recentOrders, setRecentOrders] = useState([
        {
            id: '#ANE-8821',
            date: 'Oct 24, 2025',
            status: 'Delivered',
            amount: '₹28,500',
            items: [
                { name: 'Custom Drone Chassis', qty: 1, price: '₹12,450' },
                { name: 'Precision Gear Set', qty: 2, price: '₹4,500' },
                { name: 'Tough Resin V4', qty: 1, price: '₹3,550' },
                { name: 'Aerospace Carbon Fiber', qty: 1, price: '₹3,500' }
            ]
        },
        {
            id: '#ANE-7712',
            date: 'Sep 12, 2025',
            status: 'In Transit',
            amount: '₹8,550',
            items: [{ name: 'Prototyping Kit V2', qty: 2, price: '₹4,275' }]
        },
        {
            id: '#ANE-6654',
            date: 'Aug 30, 2025',
            status: 'Delivered',
            amount: '₹4,200',
            items: [{ name: 'Precision Gears (Set of 4)', qty: 4, price: '₹1,050' }]
        },
        {
            id: '#ANE-5543',
            date: 'Aug 15, 2025',
            status: 'Delivered',
            amount: '₹1,800',
            items: [{ name: 'Industrial Resin (Clear)', qty: 1, price: '₹1,800' }]
        },
        {
            id: '#ANE-4432',
            date: 'Jul 22, 2025',
            status: 'Cancelled',
            amount: '₹3,500',
            items: [{ name: 'Flexible TPU Filament', qty: 2, price: '₹1,750' }]
        },
    ]);



    const updateQuantity = (id, delta) => {
        const updated = cartItems.map(item =>
            item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        );
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated.map(i => ({ ...i, quantity: i.qty }))));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const removeFromCart = (id) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated.map(i => ({ ...i, quantity: i.qty }))));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shipping = subtotal > 500 ? 0 : 25.00;
    const totalAmount = subtotal + shipping;

    const [addressItems, setAddressItems] = useState([
        { id: 1, type: 'Home', street: '123 Tech Lane', city: 'Innovate City', state: 'Digital State', zip: '560001', isDefault: true },
        { id: 2, type: 'Office', street: 'ANE Headquarters, Sector 5', city: 'Build City', state: 'Manufacturing Hub', zip: '560045', isDefault: false },
    ]);

    const setDefaultAddress = (id) => {
        setAddressItems(prev => prev.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const deleteAddress = (id) => {
        setAddressItems(prev => prev.filter(addr => addr.id !== id));
    };

    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [addressForm, setAddressForm] = useState({
        street: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleStartAdd = () => {
        setAddressForm({ street: '', city: '', state: '', zip: '' });
        setEditingAddressId(null);
        setIsAddingAddress(true);
    };

    const handleEditAddress = (addr) => {
        setAddressForm({
            street: addr.street,
            city: addr.city,
            state: addr.state,
            zip: addr.zip
        });
        setEditingAddressId(addr.id);
        setIsAddingAddress(true);
    };

    const handleSaveAddress = () => {
        if (!addressForm.street || !addressForm.city || !addressForm.state || !addressForm.zip) return;

        if (editingAddressId) {
            setAddressItems(prev => prev.map(addr =>
                addr.id === editingAddressId ? { ...addr, ...addressForm } : addr
            ));
        } else {
            const hasHome = addressItems.some(a => a.type === 'Home');
            const newType = hasHome ? 'Office' : 'Home';

            const newAddr = {
                id: Date.now(),
                type: newType,
                ...addressForm,
                isDefault: addressItems.length === 0
            };
            setAddressItems([...addressItems, newAddr]);
        }

        setIsAddingAddress(false);
        setEditingAddressId(null);
    };

    return (
        <div style={{ background: '#050508', minHeight: '100vh', color: '#fff' }}>
            <Header />

            <main style={{ paddingTop: '100px', paddingBottom: '80px' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>

                    {/* User Hero Section - The Aurora Command Header */}
                    <div style={{ position: 'relative', marginBottom: '4rem' }}>
                        {/* Decorative Background Glows */}
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            left: '10%',
                            width: '30%',
                            height: '100px',
                            background: 'var(--primary)',
                            filter: 'blur(100px)',
                            opacity: 0.15,
                            borderRadius: '50%',
                            zIndex: 0
                        }} />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.01)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '40px',
                                padding: '3rem',
                                display: 'grid',
                                gridTemplateColumns: '1.2fr 1fr',
                                gap: '4rem',
                                backdropFilter: 'blur(20px)',
                                position: 'relative',
                                zIndex: 1,
                                overflow: 'hidden'
                            }}
                        >
                            {/* Identity Stack */}
                            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setTempAvatar(reader.result);
                                                    setShowCropModal(true);
                                                    setCropScale(1);
                                                    setImgRotation(0);
                                                    setCropPosition({ x: 0, y: 0 });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <div style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '32px',
                                        background: 'linear-gradient(135deg, var(--primary), transparent)',
                                        padding: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 30px rgba(112, 228, 222, 0.1)'
                                    }}>
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '30px',
                                            background: '#0a0a0f',
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}>
                                            <img
                                                src={profileData.avatar || userData.avatar}
                                                alt="User Avatar"
                                                style={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    left: `${(cropPosition.x / 300) * 100}%`,
                                                    top: `${(cropPosition.y / 300) * 100}%`,
                                                    scale: cropScale,
                                                    rotate: `${imgRotation}deg`,
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="avatar-upload" style={{
                                        position: 'absolute',
                                        bottom: '-10px',
                                        right: '-10px',
                                        background: 'var(--primary)',
                                        color: '#000',
                                        border: '4px solid #0a0a0f',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                                    }}>
                                        <Edit size={18} />
                                    </label>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    minWidth: 0, // Prevents flex child overflow
                                    flex: 1
                                }}>
                                    <div style={{ width: '100%' }}>
                                        <h1 style={{
                                            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                                            fontWeight: 900,
                                            letterSpacing: '-0.03em',
                                            lineHeight: 1.1,
                                            marginBottom: '0.25rem',
                                            wordBreak: 'break-word',
                                            overflowWrap: 'break-word'
                                        }}>
                                            {userData.name}
                                        </h1>
                                        <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>Member Since 2025</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-dim)', fontSize: '1rem' }}>
                                            <Mail size={16} color="var(--primary)" /> {userData.email}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-dim)', fontSize: '1rem' }}>
                                            <Phone size={16} color="var(--primary)" /> +91 {userData.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Tiles */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignContent: 'center' }}>
                                {[
                                    { label: 'Saved Designs', val: favouriteItems.length, icon: <Heart size={20} />, tab: 'favourites' },
                                    { label: 'Cart Items', val: cartItems.length, icon: <ShoppingCart size={20} />, tab: 'cart' },
                                    { label: 'Total Orders', val: userData.stats.orders, icon: <Package size={20} />, tab: 'orders' },
                                    { label: 'Success Rating', val: '100%', icon: <ShieldCheck size={20} />, tab: 'profile' }
                                ].map((stat, i) => (
                                    <motion.button
                                        key={stat.label}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        onClick={() => setActiveTab(stat.tab)}
                                        style={{
                                            padding: '1.5rem',
                                            background: 'rgba(112, 228, 222, 0.02)',
                                            border: '1px solid rgba(112, 228, 222, 0.05)',
                                            borderRadius: '24px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'rgba(112, 228, 222, 0.3)';
                                            e.currentTarget.style.background = 'rgba(112, 228, 222, 0.08)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'rgba(112, 228, 222, 0.05)';
                                            e.currentTarget.style.background = 'rgba(112, 228, 222, 0.02)';
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ color: 'var(--primary)' }}>{stat.icon}</div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{stat.val}</div>
                                        </div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{stat.label}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>

                        {/* Sidebar Navigation */}
                        <aside>
                            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {menuItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1.25rem',
                                            borderRadius: '16px',
                                            background: activeTab === item.id ? 'rgba(112, 228, 222, 0.1)' : 'transparent',
                                            color: activeTab === item.id ? 'var(--primary)' : '#fff',
                                            border: activeTab === item.id ? '1px solid rgba(112, 228, 222, 0.2)' : '1px solid transparent',
                                            textAlign: 'left',
                                            transition: 'all 0.3s ease',
                                            fontSize: '1rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        {item.icon}
                                        {item.label}
                                        {activeTab === item.id && <motion.div layoutId="active" style={{ marginLeft: 'auto' }}><ChevronRight size={18} /></motion.div>}
                                    </button>
                                ))}

                                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '1rem 0' }} />

                                <button
                                    onClick={logout}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1.25rem',
                                        borderRadius: '16px',
                                        color: '#ff4d4d',
                                        textAlign: 'left',
                                        transition: 'all 0.3s ease',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        width: '100%',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}>
                                    <LogOut size={20} />
                                    Sign Out
                                </button>
                            </nav>
                        </aside>

                        {/* Main Content Area */}
                        <section style={{
                            background: 'rgba(255, 255, 255, 0.01)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            minHeight: '600px'
                        }}>
                            <AnimatePresence mode="wait">
                                {activeTab === 'profile' && (
                                    <motion.div
                                        key="profile"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                                            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <User size={24} color="var(--primary)" /> Profile Details
                                            </h2>
                                            <button
                                                onClick={handleToggleEdit}
                                                style={{
                                                    background: isEditing ? 'rgba(112, 228, 222, 0.2)' : 'rgba(255,255,255,0.05)',
                                                    border: isEditing ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                                                    padding: '0.75rem',
                                                    borderRadius: '12px',
                                                    color: isEditing ? 'var(--primary)' : '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {isEditing ? (
                                                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Save Changes</span>
                                                ) : (
                                                    <Edit size={20} />
                                                )}
                                            </button>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                            {[
                                                { label: 'Full Name', key: 'name' },
                                                { label: 'Email Address', key: 'email' },
                                                { label: 'Phone Number', key: 'phone' },
                                            ].map(field => (
                                                <div key={field.key}>
                                                    <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>{field.label}</label>
                                                    {isEditing && field.key !== 'email' ? (
                                                        <div style={{ position: 'relative' }}>
                                                            {field.key === 'phone' ? (
                                                                <div style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                                    border: `1px solid ${phoneError ? '#ff4d4d' : 'var(--primary)'}`,
                                                                    borderRadius: '12px',
                                                                    paddingLeft: '1rem',
                                                                    overflow: 'hidden'
                                                                }}>
                                                                    <span style={{ color: 'var(--text-dim)', fontSize: '0.95rem', paddingRight: '0.5rem', borderRight: '1px solid rgba(255,255,255,0.1)' }}>+91</span>
                                                                    <input
                                                                        type="text"
                                                                        value={profileData.phone === "---" ? "" : profileData.phone}
                                                                        maxLength={10}
                                                                        onChange={(e) => {
                                                                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                                            setProfileData({ ...profileData, phone: val });
                                                                            if (val.length === 10) setPhoneError('');
                                                                        }}
                                                                        style={{
                                                                            flex: 1,
                                                                            padding: '1rem',
                                                                            background: 'transparent',
                                                                            border: 'none',
                                                                            color: '#fff',
                                                                            fontSize: '0.95rem',
                                                                            outline: 'none'
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    value={profileData[field.key]}
                                                                    onChange={(e) => setProfileData({ ...profileData, [field.key]: e.target.value })}
                                                                    style={{
                                                                        width: '100%',
                                                                        padding: '1rem',
                                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                                        border: '1px solid var(--primary)',
                                                                        borderRadius: '12px',
                                                                        color: '#fff',
                                                                        fontSize: '0.95rem',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                            )}
                                                            {field.key === 'phone' && phoneError && (
                                                                <div style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '0.4rem', position: 'absolute' }}>{phoneError}</div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div style={{
                                                            padding: '1rem',
                                                            background: field.key === 'email' && isEditing ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)',
                                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                                            borderRadius: '12px',
                                                            color: field.key === 'email' && isEditing ? 'rgba(255,255,255,0.4)' : '#fff',
                                                            fontSize: '0.95rem',
                                                            cursor: field.key === 'email' && isEditing ? 'not-allowed' : 'default'
                                                        }}>
                                                            {field.key === 'phone'
                                                                ? (profileData.phone === "---" ? "---" : `+91 ${profileData.phone}`)
                                                                : profileData[field.key]}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* New Section: Industry Specializations */}
                                        <div style={{ marginTop: '3rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Industry Specializations</label>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Select your domains of interest</span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '0.75rem',
                                                padding: '1.5rem',
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: '16px'
                                            }}>
                                                {["Aerospace", "Medical Devices", "Rapid Prototyping", "Consumer Goods", "Robotics", "Automotive", "Architecture"].map(tag => {
                                                    const isActive = profileData.specializations.includes(tag);
                                                    return (
                                                        <button
                                                            key={tag}
                                                            onClick={() => {
                                                                if (!isEditing) return;
                                                                const newSpecs = isActive
                                                                    ? profileData.specializations.filter(s => s !== tag)
                                                                    : [...profileData.specializations, tag];
                                                                setProfileData({ ...profileData, specializations: newSpecs });
                                                            }}
                                                            style={{
                                                                padding: '0.6rem 1.25rem',
                                                                borderRadius: '30px',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 500,
                                                                background: isActive ? 'rgba(112, 228, 222, 0.15)' : 'rgba(255,255,255,0.05)',
                                                                border: `1px solid ${isActive ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                                                                color: isActive ? 'var(--primary)' : 'var(--text-dim)',
                                                                transition: 'all 0.3s ease',
                                                                cursor: isEditing ? 'pointer' : 'default'
                                                            }}
                                                        >
                                                            {tag}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'orders' && (
                                    <motion.div
                                        key="orders"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Package size={24} color="var(--primary)" /> Order History
                                        </h2>

                                        <div style={{
                                            maxHeight: '350px',
                                            overflowY: 'auto',
                                            paddingRight: '1rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1rem',
                                            scrollbarWidth: 'thin',
                                            scrollbarColor: 'var(--primary) transparent'
                                        }} className="custom-scrollbar">
                                            {recentOrders.map(order => (
                                                <div
                                                    key={order.id}
                                                    onClick={() => setSelectedOrder(order)}
                                                    style={{
                                                        padding: '1.5rem',
                                                        background: 'rgba(255, 255, 255, 0.02)',
                                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                                        borderRadius: '16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.background = 'rgba(112, 228, 222, 0.05)';
                                                        e.currentTarget.style.borderColor = 'rgba(112, 228, 222, 0.2)';
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                                        <div style={{ width: '50px', height: '50px', background: 'rgba(112, 228, 222, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                                            <Package size={24} />
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: 600, fontSize: '1rem' }}>
                                                                {order.items.length > 1 ? `${order.items[0].name} +${order.items.length - 1} more` : order.items[0].name}
                                                            </div>
                                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Order {order.id} • {order.items.length} Project Items</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{order.amount}</div>
                                                        <div style={{
                                                            fontSize: '0.75rem',
                                                            padding: '2px 8px',
                                                            borderRadius: '4px',
                                                            background: order.status === 'Delivered' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                                            color: order.status === 'Delivered' ? '#4caf50' : '#ff9800',
                                                            display: 'inline-block'
                                                        }}>{order.status}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'cart' && (
                                    <motion.div
                                        key="cart"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <ShoppingCart size={24} color="var(--primary)" /> My Cart
                                        </h2>
                                        {cartItems.length > 0 ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                                {/* Scrollable Items Container */}
                                                <div
                                                    className="custom-scrollbar"
                                                    style={{
                                                        maxHeight: '320px',
                                                        overflowY: 'auto',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '1rem',
                                                        paddingRight: '0.5rem'
                                                    }}
                                                >
                                                    {cartItems.map(item => (
                                                        <div key={item.id} style={{
                                                            padding: '1.25rem',
                                                            background: 'rgba(255, 255, 255, 0.02)',
                                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                                            borderRadius: '16px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                                                <img src={item.img} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                                                                <div>
                                                                    <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.name}</div>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '8px', width: 'fit-content' }}>
                                                                        <button
                                                                            onClick={() => updateQuantity(item.id, -1)}
                                                                            style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem', cursor: 'pointer', background: 'none', border: 'none' }}
                                                                        >-</button>
                                                                        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{item.qty}</span>
                                                                        <button
                                                                            onClick={() => updateQuantity(item.id, 1)}
                                                                            style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem', cursor: 'pointer', background: 'none', border: 'none' }}
                                                                        >+</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>${(item.price * item.qty).toFixed(2)}</div>
                                                                <button
                                                                    onClick={() => removeFromCart(item.id)}
                                                                    style={{ color: '#ff4d4d', background: 'rgba(255,77,77,0.1)', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none' }}
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Fixed Summary Below */}
                                                <div style={{
                                                    padding: '1.5rem',
                                                    background: 'rgba(112, 228, 222, 0.05)',
                                                    borderRadius: '16px',
                                                    border: '1px solid rgba(112, 228, 222, 0.1)'
                                                }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                        <span style={{ color: 'var(--text-dim)' }}>Subtotal</span>
                                                        <span>${subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                        <span style={{ color: 'var(--text-dim)' }}>Shipping</span>
                                                        <span style={{ color: shipping === 0 ? '#4caf50' : '#fff' }}>
                                                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                                        </span>
                                                    </div>
                                                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }} />
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700 }}>
                                                        <span>Total Amount</span>
                                                        <span style={{ color: 'var(--primary)' }}>${totalAmount.toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                <button className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', padding: '1.2rem', fontSize: '1.1rem', fontWeight: 600 }}>Place Order</button>
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '4rem 1rem', opacity: 0.5 }}>
                                                <ShoppingCart size={64} style={{ marginBottom: '1rem' }} />
                                                <p style={{ fontSize: '1.2rem' }}>Your cart is currently empty.</p>
                                                <button
                                                    onClick={() => setActiveTab('profile')}
                                                    style={{ marginTop: '1.5rem', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }}
                                                >
                                                    Continue Shopping
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'favourites' && (
                                    <motion.div
                                        key="favourites"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 0 }}>
                                                <Heart size={24} color="var(--primary)" /> Favourite Designs
                                            </h2>
                                            <button
                                                onClick={() => navigate('/favorites')}
                                                style={{ fontSize: '0.85rem', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '6px 16px', borderRadius: '100px', cursor: 'pointer', background: 'rgba(112, 228, 222, 0.05)' }}
                                            >View All</button>
                                        </div>

                                        {favouriteItems.length > 0 ? (
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                                {favouriteItems.slice(0, 4).map(item => (
                                                    <div key={item.id} style={{
                                                        padding: '1rem',
                                                        background: 'rgba(255, 255, 255, 0.02)',
                                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                                        borderRadius: '16px',
                                                        aspectRatio: '16/10',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    }}>
                                                        <div style={{
                                                            position: 'absolute',
                                                            inset: 0,
                                                            background: `url(${item.image || item.img}) center/cover no-repeat`,
                                                            opacity: 0.3
                                                        }} />
                                                        <div style={{
                                                            position: 'absolute',
                                                            inset: 0,
                                                            background: 'linear-gradient(135deg, rgba(112, 228, 222, 0.1), transparent)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <Box size={48} color="rgba(112, 228, 222, 0.3)" />
                                                        </div>

                                                        {/* Heart/Unfavourite Toggle */}
                                                        <button
                                                            onClick={() => toggleFavourite(item.id)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '1rem',
                                                                right: '1rem',
                                                                background: 'rgba(0,0,0,0.5)',
                                                                backdropFilter: 'blur(5px)',
                                                                padding: '8px',
                                                                borderRadius: '10px',
                                                                color: '#ff4d4d',
                                                                border: '1px solid rgba(255,77,77,0.3)',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <Heart size={18} fill="#ff4d4d" />
                                                        </button>

                                                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
                                                            <div>
                                                                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>₹{item.price?.toLocaleString()} • STL Model</div>
                                                            </div>
                                                            <button
                                                                onClick={() => setSelectedModel(item)}
                                                                style={{ fontSize: '0.75rem', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '4px 12px', borderRadius: '6px', background: 'rgba(112, 228, 222, 0.05)', cursor: 'pointer' }}
                                                            >View</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '4rem 1rem', opacity: 0.5 }}>
                                                <Heart size={64} style={{ marginBottom: '1rem' }} />
                                                <p style={{ fontSize: '1.2rem' }}>You haven't favourited any designs yet.</p>
                                                <button
                                                    onClick={() => navigate('/')}
                                                    style={{ marginTop: '1.5rem', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }}
                                                >Browse Collections</button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'address' && (
                                    <motion.div
                                        key="address"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <MapPin size={24} color="var(--primary)" /> My Addresses
                                            </h2>
                                            {addressItems.length < 2 && !isAddingAddress && (
                                                <button
                                                    onClick={handleStartAdd}
                                                    style={{ color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                                                >
                                                    <Plus size={18} /> Add New
                                                </button>
                                            )}
                                        </div>

                                        {isAddingAddress && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    padding: '2rem',
                                                    background: 'rgba(255, 255, 255, 0.03)',
                                                    border: '1px solid var(--primary)',
                                                    borderRadius: '20px',
                                                    marginBottom: '2rem'
                                                }}
                                            >
                                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                                                    {editingAddressId
                                                        ? `Edit ${addressItems.find(a => a.id === editingAddressId)?.type} Address`
                                                        : `Add ${addressItems.some(a => a.type === 'Home') ? 'Office' : 'Home'} Address`
                                                    }
                                                </h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                                    <div style={{ gridColumn: 'span 2' }}>
                                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>Street Address</label>
                                                        <input
                                                            type="text"
                                                            value={addressForm.street}
                                                            onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
                                                            placeholder="e.g. 123 Tech Lane"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>City</label>
                                                        <input
                                                            type="text"
                                                            value={addressForm.city}
                                                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
                                                            placeholder="Innovate City"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>State</label>
                                                        <input
                                                            type="text"
                                                            value={addressForm.state}
                                                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
                                                            placeholder="Digital State"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>Pincode</label>
                                                        <input
                                                            type="text"
                                                            value={addressForm.zip}
                                                            onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
                                                            placeholder="560001"
                                                        />
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                                    <button
                                                        onClick={() => { setIsAddingAddress(false); setEditingAddressId(null); }}
                                                        style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)', cursor: 'pointer' }}
                                                    >Cancel</button>
                                                    <button
                                                        onClick={handleSaveAddress}
                                                        style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', background: 'var(--primary)', border: 'none', color: '#000', fontWeight: 600, cursor: 'pointer' }}
                                                    >{editingAddressId ? 'Update Address' : 'Save Address'}</button>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                            {addressItems.map(addr => (
                                                <div
                                                    key={addr.id}
                                                    onClick={() => setDefaultAddress(addr.id)}
                                                    style={{
                                                        padding: '1.5rem',
                                                        background: 'rgba(255, 255, 255, 0.02)',
                                                        border: addr.isDefault ? '2px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.05)',
                                                        borderRadius: '16px',
                                                        position: 'relative',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                        <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{addr.type}</span>
                                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                            {addr.isDefault ? (
                                                                <span style={{ fontSize: '0.7rem', background: 'var(--primary)', color: '#000', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>DEFAULT</span>
                                                            ) : (
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setDefaultAddress(addr.id); }}
                                                                    style={{ fontSize: '0.7rem', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-dim)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
                                                                >SET DEFAULT</button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                                                        {addr.street},<br />
                                                        {addr.city}, {addr.state} - {addr.zip}
                                                    </p>
                                                    <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1.5rem' }}>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleEditAddress(addr); }}
                                                            style={{ fontSize: '0.85rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                                                        ><Edit size={14} /> Edit</button>
                                                        {!addr.isDefault && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); deleteAddress(addr.id); }}
                                                                style={{ fontSize: '0.85rem', color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                                                            ><Trash2 size={14} /> Delete</button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>
                    </div>
                </div>
            </main >

            {/* Image Fitting Modal */}
            < AnimatePresence >
                {showCropModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.9)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                background: '#0a0a0f',
                                border: '1px solid rgba(112, 228, 222, 0.2)',
                                borderRadius: '32px',
                                padding: '3rem',
                                width: '90%',
                                maxWidth: '500px',
                                textAlign: 'center'
                            }}
                        >
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Adjust Profile Photo</h2>

                            <div style={{
                                width: '100%',
                                height: '350px',
                                margin: '0 auto 2rem',
                                borderRadius: '24px',
                                background: '#111',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {/* Darkened Background Image (Full View) */}
                                <img
                                    src={tempAvatar}
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        opacity: 0.3,
                                        filter: 'blur(5px)',
                                        pointerEvents: 'none'
                                    }}
                                    alt=""
                                />

                                {/* Draggable Image Layer */}
                                <div style={{
                                    width: '300px',
                                    height: '300px',
                                    position: 'relative',
                                    zIndex: 2,
                                    borderRadius: '32px',
                                    boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)', // Mask effect
                                    border: '2px solid var(--primary)',
                                    overflow: 'hidden'
                                }}>
                                    <motion.img
                                        ref={imgRef}
                                        src={tempAvatar}
                                        drag
                                        dragMomentum={false}
                                        onDrag={(e, info) => {
                                            setCropPosition(prev => ({
                                                x: prev.x + info.delta.x,
                                                y: prev.y + info.delta.y
                                            }));
                                        }}
                                        style={{
                                            position: 'absolute',
                                            width: 'auto',
                                            height: '100%',
                                            minWidth: '100%',
                                            minHeight: '100%',
                                            scale: cropScale,
                                            rotate: `${imgRotation}deg`,
                                            cursor: 'grab',
                                            left: cropPosition.x,
                                            top: cropPosition.y
                                        }}
                                        whileTap={{ cursor: 'grabbing' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <button
                                    onClick={() => setImgRotation(prev => prev - 90)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        cursor: 'pointer'
                                    }}
                                >Rotate Left</button>
                                <button
                                    onClick={() => setImgRotation(prev => prev + 90)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        cursor: 'pointer'
                                    }}
                                >Rotate Right</button>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                                    <span>Zoom</span>
                                    <span>{Math.round(cropScale * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.01"
                                    value={cropScale}
                                    onChange={(e) => setCropScale(parseFloat(e.target.value))}
                                    style={{
                                        width: '100%',
                                        accentColor: 'var(--primary)',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setShowCropModal(false)}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >Cancel</button>
                                <button
                                    onClick={() => {
                                        // Finalize with Canvas Crop
                                        const canvas = document.createElement('canvas');
                                        const ctx = canvas.getContext('2d');
                                        const img = imgRef.current;

                                        // Set output size to a nice high-res square
                                        canvas.width = 400;
                                        canvas.height = 400;

                                        // We need to calculate the bounding box and draw
                                        // Simple version: use the current rendered image state
                                        // For a high quality crop, you'd calculate offsets from natural size
                                        // For this demo, we can just grab the canvas results

                                        // Since we want a robust solution, let's just use the current image and draw it to canvas
                                        const rect = img.getBoundingClientRect();
                                        const containerRect = img.parentElement.getBoundingClientRect();

                                        const offsetX = rect.left - containerRect.left;
                                        const offsetY = rect.top - containerRect.top;

                                        ctx.drawImage(img, offsetX * (img.naturalWidth / rect.width), offsetY * (img.naturalHeight / rect.height), img.naturalWidth, img.naturalHeight);

                                        // However, simple drawImage won't account for scale/rotate easily without matrix math
                                        // So we just set the avatar to the current visually selected result for now, 
                                        // but we save the full image + states if we wanted true non-destructive.
                                        // To satisfy "choosing the portion", let's just save the full image and 
                                        // apply the CSS crop in the display components.

                                        setProfileData(prev => ({ ...prev, avatar: tempAvatar }));
                                        if (user?.uid) {
                                            localStorage.setItem(`avatar_${user.uid}`, tempAvatar);
                                            // Store these for consistent display
                                            localStorage.setItem(`crop_${user.uid}`, JSON.stringify({
                                                scale: cropScale,
                                                rotate: imgRotation,
                                                x: cropPosition.x,
                                                y: cropPosition.y
                                            }));
                                            window.dispatchEvent(new Event('profileUpdate'));
                                        }
                                        setShowCropModal(false);
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        borderRadius: '16px',
                                        background: 'var(--primary)',
                                        color: '#000',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 700
                                    }}
                                >Save Photo</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {/* Order Detail Modal */}
                <AnimatePresence>
                    {selectedOrder && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0,0,0,0.85)',
                                zIndex: 1100,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2rem',
                                backdropFilter: 'blur(10px)'
                            }}
                            onClick={() => setSelectedOrder(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 30 }}
                                animate={{ scale: 1, y: 0 }}
                                style={{
                                    background: '#0a0a0f',
                                    border: '1px solid rgba(112, 228, 222, 0.2)',
                                    borderRadius: '24px',
                                    padding: '1.5rem',
                                    width: '90%',
                                    maxWidth: '450px',
                                    maxHeight: '85vh',
                                    overflowY: 'auto',
                                    position: 'relative',
                                    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                                    scrollbarWidth: 'none'
                                }}
                                onClick={e => e.stopPropagation()}
                                className="custom-scrollbar"
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                                    <div>
                                        <div style={{ color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Order Confirmation</div>
                                        <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{selectedOrder.id}</h2>
                                        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Placed on {selectedOrder.date}</p>
                                    </div>
                                    <div style={{
                                        padding: '6px 12px',
                                        borderRadius: '100px',
                                        background: selectedOrder.status === 'Delivered' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                        color: selectedOrder.status === 'Delivered' ? '#4caf50' : '#ff9800',
                                        fontWeight: 700,
                                        fontSize: '0.75rem'
                                    }}>{selectedOrder.status}</div>
                                </div>

                                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                                    <div style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '0.5rem', scrollbarWidth: 'thin' }}>
                                        {selectedOrder.items.map((item, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '1rem',
                                                borderBottom: idx !== selectedOrder.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                                paddingBottom: idx !== selectedOrder.items.length - 1 ? '1rem' : 0
                                            }}>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{item.name}</div>
                                                    <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Precision Part x{item.qty}</div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.price}</div>
                                                    <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Unit Price</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', marginTop: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                                            <span>Items ({selectedOrder.items.length})</span>
                                            <span style={{ color: '#fff' }}>{selectedOrder.amount}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                                            <span>Precision Engineering</span>
                                            <span style={{ color: '#4caf50' }}>FREE</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, marginTop: '0.4rem' }}>
                                            <span>Total</span>
                                            <span style={{ color: 'var(--primary)' }}>{selectedOrder.amount}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--primary)', color: '#000', border: 'none', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >Dismiss Overlay</button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </AnimatePresence >

            <Footer />

            {/* Model Detail Overlay */}
            <AnimatePresence>
                {selectedModel && (
                    <ModelDetailOverlay
                        model={selectedModel}
                        onClose={() => setSelectedModel(null)}
                    />
                )}
            </AnimatePresence>
        </div >
    );
};

export default Account;
