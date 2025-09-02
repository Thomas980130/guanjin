// 導航欄功能
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 漢堡選單切換
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 點擊導航連結時關閉選單
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 滾動時導航欄效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    });

    // 平滑滾動到錨點
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // 考慮固定導航欄高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 表單處理
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 獲取表單數據
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // 驗證必填欄位
    const requiredFields = ['name', 'phone', 'location', 'service-type'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    if (!isValid) {
        showNotification('請填寫所有必填欄位', 'error');
        return;
    }
    
    // 驗證電話號碼格式
    const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
    if (!phoneRegex.test(data.phone)) {
        document.getElementById('phone').style.borderColor = '#e74c3c';
        showNotification('請輸入有效的電話號碼', 'error');
        return;
    }
    
    // 驗證電子郵件格式（如果填寫）
    if (data.email && data.email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            document.getElementById('email').style.borderColor = '#e74c3c';
            showNotification('請輸入有效的電子郵件地址', 'error');
            return;
        }
    }
    
    // 顯示載入狀態
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> 處理中...';
    submitBtn.disabled = true;
    
    // 使用Formspree提交表單
    fetch('https://formspree.io/f/mwpnrklz', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // 重置按鈕
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // 顯示成功訊息
            showNotification('估價申請已送出！我們將在24小時內與您聯絡。', 'success');
            
            // 重置表單
            this.reset();
            
            // 滾動到頂部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            throw new Error('提交失敗');
        }
    })
    .catch(error => {
        // 重置按鈕
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // 顯示錯誤訊息
        showNotification('提交失敗，請稍後再試或直接聯絡我們。', 'error');
        console.error('表單提交錯誤:', error);
    });
});

// 通知功能
function showNotification(message, type = 'info') {
    // 移除現有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 創建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // 添加樣式
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // 添加動畫樣式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: auto;
        }
    `;
    document.head.appendChild(style);
    
    // 添加到頁面
    document.body.appendChild(notification);
    
    // 關閉按鈕功能
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // 自動關閉
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// 表單欄位即時驗證
document.querySelectorAll('input, select, textarea').forEach(field => {
    // 排除服務類型和checkbox
    if (field.name === 'service-type' || field.type === 'checkbox') {
        return;
    }
    
    // 初始化：檢查是否有內容
    updateFieldColor(field);
    
    field.addEventListener('blur', function() {
        validateField(this);
        updateFieldColor(this);
    });
    
    field.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(231, 76, 60)') {
            validateField(this);
        }
        updateFieldColor(this);
    });
    
    field.addEventListener('change', function() {
        // 當select選項改變時更新顏色（排除服務類型）
        if (this.name !== 'service-type') {
            updateFieldColor(this);
        }
    });
});

// 更新欄位顏色的函數
function updateFieldColor(field) {
    if (field.value.trim() !== '') {
        field.style.borderColor = '#2c5530';
        field.style.boxShadow = '0 0 0 3px rgba(44, 85, 48, 0.1)';
    } else {
        field.style.borderColor = '#e0e0e0';
        field.style.boxShadow = 'none';
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // 重置樣式
    field.style.borderColor = '#e0e0e0';
    
    // 必填欄位驗證
    const requiredFields = ['name', 'phone', 'location', 'service-type'];
    if (requiredFields.includes(fieldName) && value === '') {
        field.style.borderColor = '#e74c3c';
        return false;
    }
    
    // 電話號碼驗證
    if (fieldName === 'phone' && value !== '') {
        const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
        if (!phoneRegex.test(value)) {
            field.style.borderColor = '#e74c3c';
            return false;
        }
    }
    
    // 電子郵件驗證
    if (fieldName === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#e74c3c';
            return false;
        }
    }
    
    // 有效輸入
    if (value !== '') {
        field.style.borderColor = '#27ae60';
    }
    
    return true;
}

// 滾動動畫
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .area-card, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 初始化滾動動畫
document.querySelectorAll('.service-card, .area-card, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// 服務類型選擇時的動態提示
document.getElementById('service-type').addEventListener('change', function() {
    const serviceType = this.value;
    const descriptionField = document.getElementById('description');
    
    const serviceDescriptions = {
        'house-clearing': '請描述需要清理的家具、電器、雜物等物品的類型和數量...',
        'renovation-removal': '請描述裝潢拆除範圍、裝修廢料種類和數量...',
        'general-waste': '請詳細描述一般事業廢棄物的種類、數量等資訊...',
        'wood-waste': '請描述廢木材的種類、數量、尺寸等詳細資訊...',
        'permit-service': '請描述需要申辦的許可證類型及相關需求...',
        'other': '請詳細描述需要清理的物品和特殊要求...'
    };
    
    if (serviceDescriptions[serviceType]) {
        descriptionField.placeholder = serviceDescriptions[serviceType];
    } else {
        descriptionField.placeholder = '請詳細描述需要清理的物品、數量、特殊要求等...';
    }
});

// 聯絡資訊點擊複製功能
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const text = this.querySelector('p').textContent;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('聯絡資訊已複製到剪貼簿', 'success');
            });
        }
    });
});

// 頁面載入完成後的初始化
window.addEventListener('load', function() {
    // 添加載入動畫
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 初始化滾動動畫
    animateOnScroll();
});

// 錯誤處理
window.addEventListener('error', function(e) {
    console.error('頁面錯誤:', e.error);
});

// 表單重置功能
function resetForm() {
    document.getElementById('quoteForm').reset();
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '#e0e0e0';
    });
}

// 導出函數供其他腳本使用
window.GuanJinEco = {
    showNotification,
    resetForm,
    validateField
};
