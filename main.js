// ===== LANGUAGE SWITCH =====
const langBtn = document.getElementById('language-switch');
const elements = document.querySelectorAll('[data-translate]');

// ترجمة افتراضية (يمكنك تعديل النصوص)
const translations = {
    en: {
        home: 'Home',
        about: 'About Us',
        properties: 'Properties',
        services: 'Services',
        locations: 'Locations',
        contact: 'Contact Us',
        selling: 'Selling',
        renting: 'Renting',
        buying: 'Buying',
        getInTouch: 'Get In Touch',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        sendMessage: 'Send Message',
        allLocations: 'All Locations',
        redSea: 'Red Sea',
        northCoast: 'North Coast',
        allTypes: 'All Types',
        chalet: 'Chalet',
        villa: 'Villa',
        townhouse: 'Townhouse',
        allStatuses: 'All Statuses',
        forSale: 'For Sale',
        forRent: 'For Rent',
        copyright: '© 2024 IDEALEGYPT. All rights reserved.'
    },
    ar: {
        home: 'الرئيسية',
        about: 'عن الشركة',
        properties: 'العقارات',
        services: 'الخدمات',
        locations: 'المواقع',
        contact: 'تواصل معنا',
        selling: 'بيع',
        renting: 'إيجار',
        buying: 'شراء',
        getInTouch: 'تواصل معنا',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        message: 'الرسالة',
        sendMessage: 'إرسال الرسالة',
        allLocations: 'كل المواقع',
        redSea: 'البحر الأحمر',
        northCoast: 'الساحل الشمالي',
        allTypes: 'كل الأنواع',
        chalet: 'شاليه',
        villa: 'فيلا',
        townhouse: 'تاون هاوس',
        allStatuses: 'كل الحالات',
        forSale: 'للبيع',
        forRent: 'للإيجار',
        copyright: '© 2024 IDEALEGYPT. جميع الحقوق محفوظة.'
    }
};

// الوضع الافتراضي للغة
let currentLang = 'en';

if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        elements.forEach(el => {
            const key = el.dataset.translate;
            if (translations[currentLang][key]) {
                el.innerText = translations[currentLang][key];
            }
        });
    });
}

// ===== PROPERTY FILTER =====
const propertiesContainer = document.getElementById('properties-container');
const locationFilter = document.getElementById('location-filter');
const typeFilter = document.getElementById('type-filter');
const statusFilter = document.getElementById('status-filter');

// بيانات افتراضية للعقارات
const propertiesData = [
    {
        name: 'Ocean View Chalet',
        type: 'chalet',
        location: 'redSea',
        price: '$500,000',
        status: 'forSale',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'
    },
    {
        name: 'Mediterranean Villa',
        type: 'villa',
        location: 'northCoast',
        price: '$750,000',
        status: 'forSale',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    },
    {
        name: 'Coastal Townhouse',
        type: 'townhouse',
        location: 'redSea',
        price: '$2,500/month',
        status: 'forRent',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be'
    },
    {
        name: 'Beachfront Villa',
        type: 'villa',
        location: 'northCoast',
        price: '$3,000/month',
        status: 'forRent',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
    }
];

// دالة عرض العقارات
function displayProperties(properties) {
    if (!propertiesContainer) return;
    propertiesContainer.innerHTML = '';
    properties.forEach(prop => {
        const propCard = document.createElement('div');
        propCard.classList.add('property-card');
        propCard.innerHTML = `
            <img src="${prop.image}" alt="${prop.name}">
            <h3>${prop.name}</h3>
            <p>Type: ${prop.type}</p>
            <p>Location: ${prop.location}</p>
            <p>Price: ${prop.price}</p>
            <p>Status: ${prop.status}</p>
            <a href="property-details.html" class="btn btn-primary">View Details</a>
        `;
        propertiesContainer.appendChild(propCard);
    });
}

// دالة فلترة العقارات
function filterProperties() {
    let filtered = propertiesData;
    if (locationFilter && locationFilter.value !== 'all') {
        filtered = filtered.filter(p => p.location === locationFilter.value);
    }
    if (typeFilter && typeFilter.value !== 'all') {
        filtered = filtered.filter(p => p.type === typeFilter.value);
    }
    if (statusFilter && statusFilter.value !== 'all') {
        filtered = filtered.filter(p => p.status === statusFilter.value);
    }
    displayProperties(filtered);
}

// تفعيل الفلاتر
if (locationFilter) locationFilter.addEventListener('change', filterProperties);
if (typeFilter) typeFilter.addEventListener('change', filterProperties);
if (statusFilter) statusFilter.addEventListener('change', filterProperties);

// عرض جميع العقارات عند التحميل
displayProperties(propertiesData);

// ===== SIMPLE GALLERY =====
const galleryImages = document.querySelectorAll('.property-gallery img');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        const src = img.src;
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="${src}" alt="Property Image">
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    });
});
