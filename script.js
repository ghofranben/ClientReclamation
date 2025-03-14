// إحداثيات حدود ولاية عين دفلى
const bounds = [
    [36.0, 1.5], // الحدود الشمالية الغربية
    [36.5, 2.5]  // الحدود الجنوبية الشرقية
];

// تفعيل الخريطة مع تحديد الحدود
const map = L.map('map', {
    maxBounds: bounds, // تحديد الحدود
    maxBoundsViscosity: 1.0 // منع التكبير خارج الحدود
}).setView([36.25, 2.0], 10); // مركز الخريطة ومستوى التكبير

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    minZoom: 9,
    attribution: '© OpenStreetMap'
}).addTo(map);

// إضافة علامة (Marker)
let marker;

map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    // التحقق من حدود الولاية
    if (lat >= bounds[0][0] && lat <= bounds[1][0] && lng >= bounds[0][1] && lng <= bounds[1][1]) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);
        document.getElementById("adresse").value = `Lat: ${lat}, Lng: ${lng}`;
    } else {
        // إظهار تحذير Toast
        Swal.fire({
            icon: 'warning',
            title: 'تحذير',
            text: 'لا يمكن تحديد موقع خارج حدود ولاية عين دفلى.',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    }
});

// زر التقاط الصور
document.getElementById("prendrePhotos").addEventListener("click", function() {
    document.getElementById("photo").click();
});

document.getElementById("photo").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        Swal.fire({
            icon: 'success',
            title: 'تم تحميل الصورة',
            text: `اسم الملف: ${file.name}`,
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    }
});

// تحقق من صحة الحقول عند فقدان التركيز (Blur)
document.querySelectorAll('input, textarea').forEach(function(input) {
    input.addEventListener("blur", function() {
        const value = this.value.trim();
        const errorMessage = this.nextElementSibling; // العنصر التالي (رسالة الخطأ)

        if (!value) {
            errorMessage.textContent = 'هذا الحقل مطلوب.';
            errorMessage.style.display = 'block';
            this.classList.remove('valid'); // إزالة التنسيق الصحيح
            this.classList.add('invalid'); // إضافة تنسيق الخطأ
        } else {
            errorMessage.style.display = 'none';
            this.classList.remove('invalid'); // إزالة تنسيق الخطأ
            this.classList.add('valid'); // إضافة التنسيق الصحيح
        }
    });
});

// تحقق من صحة البريد الإلكتروني عند فقدان التركيز (Blur)
document.getElementById("email").addEventListener("blur", function() {
    const email = this.value.trim();
    const emailError = document.getElementById("email-error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = 'يرجى إدخال بريد إلكتروني صحيح (مثال: example@domain.com).';
        emailError.style.display = 'block';
        this.classList.remove('valid'); // إزالة التنسيق الصحيح
        this.classList.add('invalid'); // إضافة تنسيق الخطأ
    } else {
        emailError.style.display = 'none';
        this.classList.remove('invalid'); // إزالة تنسيق الخطأ
        this.classList.add('valid'); // إضافة التنسيق الصحيح
    }
});

// تحقق من صحة الجوال عند فقدان التركيز (Blur)
document.getElementById("mobile").addEventListener("blur", function() {
    const mobile = this.value.trim();
    const mobileError = document.getElementById("mobile-error");
    const mobilePattern = /^(0|\+213)[5-7]\d{8}$/; // رقم جزائري يبدأ بـ 0 أو +213 ويحتوي على 10 أرقام

    if (!mobilePattern.test(mobile)) {
        mobileError.textContent = 'يرجى إدخال رقم جوال جزائري صحيح (يبدأ بـ 0 أو +213 ويحتوي على 10 أرقام).';
        mobileError.style.display = 'block';
        this.classList.remove('valid'); // إزالة التنسيق الصحيح
        this.classList.add('invalid'); // إضافة تنسيق الخطأ
    } else {
        mobileError.style.display = 'none';
        this.classList.remove('invalid'); // إزالة تنسيق الخطأ
        this.classList.add('valid'); // إضافة التنسيق الصحيح
    }
});

// تأثيرات الهوفر على جميع الحقول
document.querySelectorAll('input, textarea').forEach(function(input) {
    input.addEventListener("mouseover", function() {
        this.style.borderColor = '#007BFF'; // لون أزرق عند التحويم
    });

    input.addEventListener("mouseout", function() {
        this.style.borderColor = this.classList.contains('invalid') ? '#dc3545' : this.classList.contains('valid') ? '#28a745' : '#ccc'; // لون رمادي أو أحمر أو أخضر عند الخروج
    });
});

// زر إرسال المطالبة
document.getElementById("envoyerReclamation").addEventListener("click", function() {
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const adresse = document.getElementById("adresse").value.trim();
    const unite = document.getElementById("unite").value.trim();
    const code = document.getElementById("code").value.trim();
    const email = document.getElementById("email").value.trim();
    const reclamation = document.getElementById("reclamation").value.trim();

    // تحقق من الحقول المطلوبة
    if (!nom || !prenom || !mobile || !adresse || !unite || !code || !email || !reclamation) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'يرجى ملء جميع الحقول المطلوبة.',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
        return;
    }

    // تحقق من صحة البريد الإلكتروني
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = 'يرجى إدخال بريد إلكتروني صحيح (مثال: example@domain.com).';
        document.getElementById("email-error").style.display = 'block';
        document.getElementById("email").classList.add('invalid');
        return;
    }

    // تحقق من صحة الجوال (يجب أن يحتوي على أرقام فقط)
    const mobilePattern = /^(0|\+213)[5-7]\d{8}$/;
    if (!mobilePattern.test(mobile)) {
        document.getElementById("mobile-error").textContent = 'يرجى إدخال رقم جوال جزائري صحيح (يبدأ بـ 0 أو +213 ويحتوي على 10 أرقام).';
        document.getElementById("mobile-error").style.display = 'block';
        document.getElementById("mobile").classList.add('invalid');
        return;
    }

    // إذا كانت جميع البيانات صحيحة، قم بإرسال الشكوى
    Swal.fire({
        icon: 'success',
        title: 'تم إرسال المطالبة بنجاح!',
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
});