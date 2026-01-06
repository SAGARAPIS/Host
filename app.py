from flask import Flask, render_template_string, request, redirect, url_for

app = Flask(__name__)

# COMPLETE HTML TEMPLATE - ALL IN ONE
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shadow Premium Store</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='shadowstyle.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Main App Container -->
    <div id="app">
        <!-- Header -->
        <header class="main-header">
            <div class="header-content">
                <div class="logo-container">
                    <h1 class="logo-text">
                        <span class="logo-part-1">SHADOW</span>
                        <span class="logo-part-2">PREMIUM</span>
                    </h1>
                    <div class="logo-badge">
                        <i class="fas fa-crown"></i> STORE
                    </div>
                </div>
                <p class="store-tagline">
                    <i class="fas fa-bolt"></i> ULTIMATE FREE FIRE AUTO LIKE SERVICE
                </p>
            </div>
        </header>

        <!-- Main Content Area -->
        <main id="content-area">
            <!-- Home Page Content will be loaded here by JavaScript -->
        </main>

        <!-- Footer -->
        <footer class="main-footer">
            <div class="footer-content">
                <div class="footer-logo">
                    <span class="footer-logo-text">SHADOW</span>
                    <span class="footer-logo-highlight">STORE</span>
                </div>
                <p class="footer-tagline">
                    <i class="fas fa-shield-alt"></i> Premium Auto Like Service
                </p>
                <p class="footer-copyright">
                    &copy; 2026 Shadow Premium Store. All Rights Reserved.
                    <br>
                    <span class="footer-note">Instant Delivery • 24/7 Support • Secure Payment</span>
                </p>
            </div>
        </footer>

        <!-- Payment Modal (Hidden by default) -->
        <div id="payment-modal" class="modal-overlay">
            <div class="modal-container">
                <div class="modal-content">
                    <!-- Modal content loaded by JS -->
                </div>
            </div>
        </div>

        <!-- Details Form Modal (Hidden by default) -->
        <div id="details-modal" class="modal-overlay">
            <div class="modal-container">
                <div class="modal-content large-modal">
                    <!-- Details form loaded by JS -->
                </div>
            </div>
        </div>

        <!-- Success Message (Hidden by default) -->
        <div id="success-message" class="modal-overlay">
            <div class="modal-container">
                <div class="modal-content success-modal">
                    <!-- Success content loaded by JS -->
                </div>
            </div>
        </div>
    </div>

    <script src="{{ url_for('static', filename='shadow.js') }}"></script>
</body>
</html>
'''

@app.route('/')
def home():
    return render_template_string(HTML_TEMPLATE)

@app.route('/get_products', methods=['GET'])
def get_products():
    products = [
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
    ]
    return {"products": products}

@app.route('/process_payment', methods=['POST'])
def process_payment():
    return {"status": "success", "message": "Payment processed"}

@app.route('/submit_order', methods=['POST'])
def submit_order():
    return {"status": "success", "message": "Order submitted"}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7080, debug=True)