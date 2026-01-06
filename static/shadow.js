/* ============================================ */
/* SHADOW PREMIUM STORE - MAIN JAVASCRIPT */
/* ============================================ */

// Security - Disable right click and inspect
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if (e.keyCode == 123) return false; // F12
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false; // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false; // Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false; // Ctrl+Shift+J
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false; // Ctrl+U
}

// Global variables
let currentProduct = null;
let currentPrice = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Shadow Store Initializing...');
    loadHomePage();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        const modalOverlays = document.querySelectorAll('.modal-overlay');
        modalOverlays.forEach(modal => {
            if (event.target === modal) {
                closeAllModals();
            }
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Load home page
async function loadHomePage() {
    try {
        const response = await fetch('/get_products');
        const data = await response.json();
        renderHomePage(data.products);
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback data
        const fallbackProducts = [
            {
                "name": "AUTO LIKE PLAN 1",
                "price": "₹100",
                "badge": "starter",
                "icon": "fas fa-gem",
                "features": ["15 Days Access", "Daily 220 Likes", "Total Likes 3300", "Likes at 5 AM"]
            },
            {
                "name": "AUTO LIKE PLAN 2",
                "price": "₹200",
                "badge": "popular",
                "icon": "fas fa-fire",
                "features": ["30 Days Access", "Daily 220 Likes", "Total Likes 6600", "Likes at 5 AM"]
            },
            {
                "name": "AUTO LIKE PLAN 3",
                "price": "₹400",
                "badge": "hot",
                "icon": "fas fa-bolt",
                "features": ["60 Days Access", "Daily 220 Likes", "Total Likes 13200", "Receive at 5 AM"]
            },
            {
                "name": "AUTO LIKE PLAN 4",
                "price": "₹550",
                "badge": "premium",
                "icon": "fas fa-crown",
                "features": ["90 Days Access", "Daily 220 Likes", "Total Likes 19800", "Receive at 5 AM"]
            }
        ];
        renderHomePage(fallbackProducts);
    }
}

// Render home page
function renderHomePage(products) {
    const contentArea = document.getElementById('content-area');
    
    let html = `
    <section class="plans-section">
        <div class="section-header">
            <h2 class="section-title">
                <span class="title-icon"><i class="fas fa-rocket"></i></span>
                PREMIUM AUTO LIKE PLANS
                <span class="title-line"></span>
            </h2>
            <p class="section-subtitle">Select your plan and boost your Free Fire profile</p>
        </div>

        <div class="plans-grid">
    `;

    // Generate plan cards
    products.forEach((product, index) => {
        const isFeatured = product.badge === 'popular';
        
        html += `
        <div class="plan-card ${isFeatured ? 'featured-card' : ''}" data-index="${index}">
            <div class="card-badge ${product.badge}">
                <i class="${product.icon}"></i>
                <span>${product.badge.toUpperCase()}</span>
            </div>
            
            <div class="card-header">
                <h3 class="plan-name">${product.name}</h3>
                <div class="plan-price">
                    <span class="price-symbol">₹</span>
                    <span class="price-amount">${product.price.replace('₹', '')}</span>
                </div>
            </div>
            
            <ul class="plan-features">
        `;
        
        product.features.forEach(feature => {
            html += `
                <li class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>${feature}</span>
                </li>
            `;
        });
        
        html += `
            </ul>
            
            <button class="buy-button ${isFeatured ? 'featured-button' : ''}" 
                    onclick="openPaymentModal('${product.name}', '${product.price}')">
                <span class="button-text">BUY NOW</span>
                <span class="button-icon"><i class="fas fa-arrow-right"></i></span>
            </button>
            
            ${isFeatured ? '<div class="popular-badge">MOST POPULAR</div>' : ''}
        </div>
        `;
    });

    html += `
        </div>
    </section>

    <section class="contact-section">
        <div class="section-header">
            <h2 class="section-title">
                <span class="title-icon"><i class="fas fa-headset"></i></span>
                CONTACT & SUPPORT
                <span class="title-line"></span>
            </h2>
            <p class="section-subtitle">We're here to help you 24/7</p>
        </div>

        <div class="contact-grid">
            <a href="https://t.me/SAGARxLAB" target="_blank" class="contact-card telegram">
                <div class="contact-icon">
                    <i class="fab fa-telegram"></i>
                </div>
                <div class="contact-info">
                    <h3>Telegram Channel</h3>
                    <p>Latest updates & announcements</p>
                </div>
                <div class="contact-arrow">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </a>

            <a href="https://t.me/SAGARxLAB" target="_blank" class="contact-card support">
                <div class="contact-icon">
                    <i class="fas fa-user-headset"></i>
                </div>
                <div class="contact-info">
                    <h3>Admin Support</h3>
                    <p>Direct help from admin</p>
                </div>
                <div class="contact-arrow">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </a>

            <a href="https://wa.me/919999999999" target="_blank" class="contact-card whatsapp">
                <div class="contact-icon">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <div class="contact-info">
                    <h3>WhatsApp</h3>
                    <p>Quick chat support</p>
                </div>
                <div class="contact-arrow">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </a>

            <a href="https://youtube.com/@SAGARxLAB" target="_blank" class="contact-card youtube">
                <div class="contact-icon">
                    <i class="fab fa-youtube"></i>
                </div>
                <div class="contact-info">
                    <h3>YouTube</h3>
                    <p>Tutorials & guides</p>
                </div>
                <div class="contact-arrow">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </a>

            <a href="https://instagram.com/SAGARxLAB" target="_blank" class="contact-card instagram">
                <div class="contact-icon">
                    <i class="fab fa-instagram"></i>
                </div>
                <div class="contact-info">
                    <h3>Instagram</h3>
                    <p>Daily updates & previews</p>
                </div>
                <div class="contact-arrow">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </a>
        </div>
    </section>
    `;

    contentArea.innerHTML = html;
    
    // Add animations
    setTimeout(() => {
        const cards = document.querySelectorAll('.plan-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-in');
        });
    }, 100);
}

// Open payment modal
function openPaymentModal(productName, productPrice) {
    currentProduct = productName;
    currentPrice = productPrice;
    
    const modalContent = document.querySelector('#payment-modal .modal-content');
    
    modalContent.innerHTML = `
    <div class="modal-header">
        <h2><i class="fas fa-credit-card"></i> Payment Details</h2>
        <button class="close-modal" onclick="closeAllModals()">
            <i class="fas fa-times"></i>
        </button>
    </div>
    
    <div class="modal-body">
        <div class="selected-plan-info">
            <h3>${productName}</h3>
            <div class="plan-price-large">${productPrice}</div>
            <p class="plan-desc">Complete payment to activate this plan</p>
        </div>
        
        <div class="payment-methods">
            <div class="method-tabs">
                <button class="method-tab active" data-method="upi">
                    <i class="fas fa-qrcode"></i> UPI
                </button>
                <button class="method-tab" data-method="binance">
                    <i class="fas fa-coins"></i> Binance
                </button>
            </div>
            
            <div class="method-content active" id="upi-method">
                <div class="qr-container">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=shadowstore@upi&am=${productPrice.replace('₹', '')}&pn=Shadow%20Store&tn=${encodeURIComponent(productName)}" 
                         alt="UPI QR Code" class="qr-code">
                </div>
                
                <div class="upi-details">
                    <div class="detail-item">
                        <label>UPI ID:</label>
                        <div class="copy-field">
                            <input type="text" value="shadowstore@upi" readonly>
                            <button onclick="copyToClipboard('shadowstore@upi')">
                                <i class="fas fa-copy"></i> Copy
                            </button>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <label>Account Name:</label>
                        <div class="detail-value">Shadow Store</div>
                    </div>
                </div>
            </div>
            
            <div class="method-content" id="binance-method">
                <div class="qr-container">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=binance:shadowstore123" 
                         alt="Binance QR Code" class="qr-code">
                </div>
                
                <div class="binance-details">
                    <div class="detail-item">
                        <label>Binance ID:</label>
                        <div class="copy-field">
                            <input type="text" value="shadowstore123" readonly>
                            <button onclick="copyToClipboard('shadowstore123')">
                                <i class="fas fa-copy"></i> Copy
                            </button>
                        </div>
                    </div>
                    
                    <div class="instruction">
                        <p><i class="fas fa-info-circle"></i> Send exact amount: <strong>${productPrice}</strong></p>
                        <p><i class="fas fa-info-circle"></i> Include note: "${productName}"</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="payment-instruction">
            <h4><i class="fas fa-lightbulb"></i> Important Instructions:</h4>
            <ul>
                <li>Send exact amount: <strong>${productPrice}</strong></li>
                <li>Keep UTR/Transaction ID safe</li>
                <li>Click "I Have Paid" after payment</li>
                <li>Service activated within 30 minutes</li>
            </ul>
        </div>
    </div>
    
    <div class="modal-footer">
        <button class="btn-secondary" onclick="closeAllModals()">
            <i class="fas fa-times"></i> Cancel
        </button>
        <button class="btn-primary" onclick="openDetailsForm()">
            <i class="fas fa-check"></i> I Have Paid - Next
        </button>
    </div>
    `;
    
    // Show modal
    document.getElementById('payment-modal').style.display = 'flex';
    
    // Setup tab switching
    setupPaymentTabs();
}

// Setup payment method tabs
function setupPaymentTabs() {
    const tabs = document.querySelectorAll('.method-tab');
    const contents = document.querySelectorAll('.method-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${method}-method`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Open details form
function openDetailsForm() {
    closeAllModals();
    
    const modalContent = document.querySelector('#details-modal .modal-content');
    
    modalContent.innerHTML = `
    <div class="modal-header">
        <h2><i class="fas fa-user-edit"></i> Complete Your Order</h2>
        <button class="close-modal" onclick="closeAllModals()">
            <i class="fas fa-times"></i>
        </button>
    </div>
    
    <div class="modal-body">
        <div class="order-summary-box">
            <h3>Order Summary</h3>
            <div class="summary-items">
                <div class="summary-item">
                    <span>Plan:</span>
                    <strong>${currentProduct}</strong>
                </div>
                <div class="summary-item">
                    <span>Amount:</span>
                    <strong class="highlight">${currentPrice}</strong>
                </div>
                <div class="summary-item">
                    <span>Status:</span>
                    <span class="status-pending">Pending Payment</span>
                </div>
            </div>
        </div>
        
        <form id="orderForm" class="order-form">
            <input type="hidden" name="product" value="${currentProduct}">
            <input type="hidden" name="price" value="${currentPrice}">
            
            <div class="form-section">
                <h3><i class="fas fa-receipt"></i> Payment Details</h3>
                <div class="form-group">
                    <label for="transaction_id">
                        <i class="fas fa-hashtag"></i> Transaction ID / UTR Number *
                    </label>
                    <input type="text" id="transaction_id" name="transaction_id" 
                           placeholder="Enter 12-16 digit UTR/Transaction ID" required>
                    <p class="form-hint">Find this in your payment receipt</p>
                </div>
            </div>
            
            <div class="form-section">
                <h3><i class="fas fa-gamepad"></i> Free Fire Details</h3>
                <div class="form-group">
                    <label for="guild_uid">
                        <i class="fas fa-id-card"></i> Guild UID *
                    </label>
                    <input type="number" id="guild_uid" name="guild_uid" 
                           placeholder="Enter your Guild UID (e.g., 123456789)" required>
                </div>
                
                <div class="form-group">
                    <label for="region">
                        <i class="fas fa-globe"></i> Region *
                    </label>
                    <select id="region" name="region" required>
                        <option value="">Select Region</option>
                        <option value="IND">🇮🇳 India</option>
                        <option value="BD">🇧🇩 Bangladesh</option>
                        <option value="PK">🇵🇰 Pakistan</option>
                        <option value="OTHER">🌍 Other</option>
                    </select>
                </div>
            </div>
            
            <div class="form-section">
                <h3><i class="fas fa-address-book"></i> Contact Details *</h3>
                <p class="form-note">Provide at least one contact method</p>
                
                <div class="form-group">
                    <label for="telegram">
                        <i class="fab fa-telegram"></i> Telegram Username
                    </label>
                    <div class="input-with-prefix">
                        <span class="input-prefix">@</span>
                        <input type="text" id="telegram" name="telegram" 
                               placeholder="username (without @)">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp Number
                    </label>
                    <div class="phone-input">
                        <select name="country_code" class="country-code">
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+880">🇧🇩 +880</option>
                            <option value="+92">🇵🇰 +92</option>
                            <option value="+1">🇺🇸 +1</option>
                        </select>
                        <input type="tel" id="whatsapp" name="whatsapp" 
                               placeholder="1234567890">
                    </div>
                </div>
            </div>
            
            <div class="form-agreement">
                <label class="checkbox-label">
                    <input type="checkbox" name="terms" required>
                    <span>I confirm that all information is correct and I have made the payment</span>
                </label>
            </div>
        </form>
    </div>
    
    <div class="modal-footer">
        <button class="btn-secondary" onclick="closeAllModals(); openPaymentModal('${currentProduct}', '${currentPrice}')">
            <i class="fas fa-arrow-left"></i> Back to Payment
        </button>
        <button class="btn-primary" onclick="submitOrderForm()">
            <i class="fas fa-paper-plane"></i> Submit Order
        </button>
    </div>
    `;
    
    document.getElementById('details-modal').style.display = 'flex';
}

// Submit order form
async function submitOrderForm() {
    const form = document.getElementById('orderForm');
    const telegram = document.getElementById('telegram')?.value || '';
    const whatsapp = document.getElementById('whatsapp')?.value || '';
    
    // Validate contact information
    if (!telegram && !whatsapp) {
        showNotification('Please provide at least one contact method (Telegram or WhatsApp)', 'error');
        return;
    }
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
  
