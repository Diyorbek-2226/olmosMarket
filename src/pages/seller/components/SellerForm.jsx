import React, { useEffect, useState } from 'react';
import { registerSeller, sellerGetId, updateSeller } from '../../../service/api/seller';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader} from 'lucide-react';
import { toast } from 'react-hot-toast';
import styles from '../components/Seller.module.css';

export default function SellerForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        shopName: ''
    });
    const [mode, setMode] = useState('add');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { pathname } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const parts = pathname.split("/");
        const currentMode = parts[3];
        setMode(currentMode);

        if (currentMode !== 'add' && id) {
            fetchSellerData(id);
        }
    }, [pathname, id]);

    const fetchSellerData = async (sellerId) => {
        setLoading(true);
        try {
            const res = await sellerGetId(sellerId);
            setFormData({
                fullName: res.data.fullname,
                username: res.data.username,
                password: res.data.username,
                shopName: res.data.shopName
            });
        } catch (err) {
            toast.error("Sotuvchi ma'lumotlarini yuklashda xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (mode === 'add') {
                await registerSeller(formData);
                toast.success('Sotuvchi muvaffaqiyatli qoshildi!');
            } else if (mode === 'edit') {
                await updateSeller(id, formData);
            }
            navigate('/admin/sellers');
        } catch (err) {
            toast.error('Xatolik yuz berdi. Iltimos, qaytadan urinib koring.');
        } finally {
            setLoading(false);
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'add': return 'Yangi sotuvchi qoshish';
            case 'edit': return 'Sotuvchi malumotlarini tahrirlash';
            case 'view': return 'Sotuvchi malumotlari';
            default: return 'Sotuvchi';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.welcome}>
                    <h1>Welcome</h1>
                    <p>Sotuvchi ma'lumotlarini to'ldiring</p>
                </div>
                <button
                    onClick={() => navigate('/admin/sellers')}
                    className={styles.backButton}
                >
                    GO BACK
                </button>
            </div>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>{getTitle()}</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGrid}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                readOnly={mode === 'view'}
                                placeholder="To'liq ism"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                readOnly={mode === 'view'}
                                placeholder="Foydalanuvchi nomi"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <div className={styles.passwordInput}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    readOnly={mode === 'view'}
                                    placeholder="Parol"
                                    required={mode === 'add'}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.passwordToggle}
                                >
                                    {showPassword ? 
                                        <EyeOff className={styles.icon} /> : 
                                        <Eye className={styles.icon} />
                                    }
                                </button>
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="shopName"
                                name="shopName"
                                value={formData.shopName}
                                onChange={handleChange}
                                readOnly={mode === 'view'}
                                placeholder="Do'kon nomi"
                                required
                            />
                        </div>
                    </div>
                    {mode !== 'view' && (
                        <button 
                            type="submit"
                            disabled={loading}
                            className={styles.submitButton}
                        >
                            {loading ? (
                                <Loader className={styles.loader} />
                            ) : mode === 'add' ? (
                                'Sotuvchini qoshish'
                            ) : (
                                'Ozgarishlarni saqlash'
                            )}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

