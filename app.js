function ecommerceApp() {
    return {
        cartOpen: false,
        mobileMenuOpen: false,
        searchQuery: '',
        selectedCategory: '',
        sortBy: 'name',
        cartItems: [],
        
        categories: [
            { id: 'electronics', name: 'Electronics', image: 'https://picsum.photos/seed/electronics/200/150', count: 245 },
            { id: 'fashion', name: 'Fashion', image: 'https://picsum.photos/seed/fashion/200/150', count: 189 },
            { id: 'home', name: 'Home & Garden', image: 'https://picsum.photos/seed/home/200/150', count: 156 },
            { id: 'sports', name: 'Sports', image: 'https://picsum.photos/seed/sports/200/150', count: 98 },
            { id: 'books', name: 'Books', image: 'https://picsum.photos/seed/books/200/150', count: 342 },
            { id: 'toys', name: 'Toys & Games', image: 'https://picsum.photos/seed/toys/200/150', count: 127 },
            { id: 'beauty', name: 'Beauty', image: 'https://picsum.photos/seed/beauty/200/150', count: 203 },
            { id: 'automotive', name: 'Automotive', image: 'https://picsum.photos/seed/automotive/200/150', count: 67 }
        ],
        
        products: [
            {
                id: 1,
                name: 'Wireless Headphones Pro',
                price: 299.99,
                category: 'electronics',
                image: 'https://picsum.photos/seed/headphones/300/200',
                rating: 4,
                reviews: 234,
                discount: 20,
                bestseller: true,
                description: 'Premium wireless headphones with noise cancellation'
            },
            {
                id: 2,
                name: 'Smart Watch Ultra',
                price: 449.99,
                category: 'electronics',
                image: 'https://picsum.photos/seed/smartwatch/300/200',
                rating: 5,
                reviews: 567,
                discount: 15,
                bestseller: true,
                description: 'Advanced fitness tracking and health monitoring'
            },
            {
                id: 3,
                name: 'Designer Leather Jacket',
                price: 599.99,
                category: 'fashion',
                image: 'https://picsum.photos/seed/jacket/300/200',
                rating: 4,
                reviews: 89,
                discount: 30,
                bestseller: false,
                description: 'Genuine leather jacket with modern styling'
            },
            {
                id: 4,
                name: 'Yoga Mat Premium',
                price: 79.99,
                category: 'sports',
                image: 'https://picsum.photos/seed/yogamat/300/200',
                rating: 5,
                reviews: 445,
                discount: 0,
                bestseller: true,
                description: 'Extra thick, non-slip yoga mat'
            },
            {
                id: 5,
                name: 'Coffee Maker Deluxe',
                price: 189.99,
                category: 'home',
                image: 'https://picsum.photos/seed/coffee/300/200',
                rating: 4,
                reviews: 178,
                discount: 25,
                bestseller: false,
                description: 'Programmable coffee maker with thermal carafe'
            },
            {
                id: 6,
                name: 'Running Shoes Pro',
                price: 159.99,
                category: 'sports',
                image: 'https://picsum.photos/seed/shoes/300/200',
                rating: 5,
                reviews: 892,
                discount: 10,
                bestseller: true,
                description: 'Professional running shoes with advanced cushioning'
            },
            {
                id: 7,
                name: 'Bestseller Novel Set',
                price: 49.99,
                category: 'books',
                image: 'https://picsum.photos/seed/books/300/200',
                rating: 4,
                reviews: 234,
                discount: 0,
                bestseller: false,
                description: 'Collection of award-winning novels'
            },
            {
                id: 8,
                name: 'Skincare Bundle',
                price: 89.99,
                category: 'beauty',
                image: 'https://picsum.photos/seed/skincare/300/200',
                rating: 5,
                reviews: 667,
                discount: 35,
                bestseller: true,
                description: 'Complete skincare routine set'
            },
            {
                id: 9,
                name: 'Gaming Console',
                price: 499.99,
                category: 'electronics',
                image: 'https://picsum.photos/seed/console/300/200',
                rating: 5,
                reviews: 1234,
                discount: 0,
                bestseller: true,
                description: 'Next-generation gaming console'
            },
            {
                id: 10,
                name: 'Winter Coat Deluxe',
                price: 249.99,
                category: 'fashion',
                image: 'https://picsum.photos/seed/coat/300/200',
                rating: 4,
                reviews: 145,
                discount: 40,
                bestseller: false,
                description: 'Warm and stylish winter coat'
            },
            {
                id: 11,
                name: 'Kitchen Knife Set',
                price: 129.99,
                category: 'home',
                image: 'https://picsum.photos/seed/knives/300/200',
                rating: 5,
                reviews: 378,
                discount: 20,
                bestseller: false,
                description: 'Professional chef knife set'
            },
            {
                id: 12,
                name: 'Kids Building Blocks',
                price: 39.99,
                category: 'toys',
                image: 'https://picsum.photos/seed/blocks/300/200',
                rating: 5,
                reviews: 892,
                discount: 15,
                bestseller: true,
                description: 'Educational building blocks set'
            }
        ],
        
        get filteredProducts() {
            let filtered = this.products;
            
            // Filter by search query
            if (this.searchQuery) {
                filtered = filtered.filter(product => 
                    product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }
            
            // Filter by category
            if (this.selectedCategory) {
                filtered = filtered.filter(product => product.category === this.selectedCategory);
            }
            
            // Sort products
            switch(this.sortBy) {
                case 'name':
                    filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'price-low':
                    filtered.sort((a, b) => this.calculateDiscountedPrice(a.price, a.discount) - this.calculateDiscountedPrice(b.price, b.discount));
                    break;
                case 'price-high':
                    filtered.sort((a, b) => this.calculateDiscountedPrice(b.price, b.discount) - this.calculateDiscountedPrice(a.price, a.discount));
                    break;
            }
            
            return filtered;
        },
        
        get cartTotal() {
            return this.cartItems.reduce((total, item) => {
                return total + (this.calculateDiscountedPrice(item.price, item.discount) * item.quantity);
            }, 0).toFixed(2);
        },
        
        calculateDiscountedPrice(price, discount) {
            if (discount) {
                return (price * (1 - discount / 100)).toFixed(2);
            }
            return price.toFixed(2);
        },
        
        toggleCart() {
            this.cartOpen = !this.cartOpen;
        },
        
        addToCart(product) {
            const existingItem = this.cartItems.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cartItems.push({
                    ...product,
                    quantity: 1
                });
            }
            
            this.showNotification(`${product.name} added to cart!`);
        },
        
        removeFromCart(productId) {
            const index = this.cartItems.findIndex(item => item.id === productId);
            if (index > -1) {
                const item = this.cartItems[index];
                this.cartItems.splice(index, 1);
                this.showNotification(`${item.name} removed from cart`);
            }
        },
        
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
                return;
            }
            
            const item = this.cartItems.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },
        
        filterProducts() {
            // This is handled by the computed property filteredProducts
        },
        
        sortProducts() {
            // This is handled by the computed property filteredProducts
        },
        
        showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all transform translate-y-0';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateY(-10px)';
            }, 10);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateY(100px)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        },
        
        init() {
            // Load cart from localStorage
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.cartItems = JSON.parse(savedCart);
            }
            
            // Save cart to localStorage whenever it changes
            this.$watch('cartItems', (newCart) => {
                localStorage.setItem('cart', JSON.stringify(newCart));
            });
            
            // Initialize countdown timer
            this.startCountdown();
        },
        
        startCountdown() {
            let seconds = 85512; // 23:45:12 in seconds
            
            setInterval(() => {
                seconds--;
                
                if (seconds >= 0) {
                    const hours = Math.floor(seconds / 3600);
                    const minutes = Math.floor((seconds % 3600) / 60);
                    const secs = seconds % 60;
                    
                    const countdownElement = document.querySelector('.fa-clock').parentElement.querySelector('p:last-child');
                    if (countdownElement) {
                        countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                    }
                }
            }, 1000);
        }
    };
}

// Additional utility functions
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.bg-gradient-to-r');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelector('img');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
});

// Newsletter subscription
function subscribeNewsletter(email) {
    // Simulate newsletter subscription
    console.log('Subscribing:', email);
    // In a real app, this would make an API call
    return true;
}
