document.addEventListener('DOMContentLoaded', () => {
    // Sample room data
    const rooms = [
        {
            id: 1,
            name: 'Deluxe Suite',
            price: 299,
            description: 'Luxurious suite with ocean view',
            image: 'images/deluxe-suite.jpg'
        },
        {
            id: 2,
            name: 'Executive Room',
            price: 199,
            description: 'Spacious room with city view',
            image: 'images/executive-room.jpg'
        }
    ];

    // Menu items array
    const menuItems = [
        {
            id: 1,
            name: 'Nyama Choma',
            price: 25,
            description: 'Traditional Kenyan roasted meat served with kachumbari',
            image: 'images/nyama-choma.jpg',
            category: 'Main Course'
        },
        {
            id: 2,
            name: 'Mukimo',
            price: 15,
            description: 'Mashed potatoes with peas, pumpkin leaves and corn',
            image: 'images/mukimo.jpg',
            category: 'Main Course'
        },
        {
            id: 3,
            name: 'Pilau',
            price: 18,
            description: 'Spiced rice cooked with meat and aromatic spices',
            image: 'images/pilau.jpg',
            category: 'Main Course'
        },
        {
            id: 4,
            name: 'Githeri',
            price: 12,
            description: 'A hearty mix of beans and maize, seasoned to perfection',
            image: 'images/githeri.jpg',
            category: 'Main Course'
        },
        {
            id: 5,
            name: 'Ugali na Sukuma Wiki',
            price: 14,
            description: 'Cornmeal staple served with sautéed collard greens',
            image: 'images/ugali-sukuma.jpg',
            category: 'Main Course'
        },
        {
            id: 6,
            name: 'Kenyan Biryani',
            price: 20,
            description: 'Coastal delicacy of spiced rice with meat and potatoes',
            image: 'images/biryani.jpg',
            category: 'Main Course'
        },
        {
            id: 7,
            name: 'Matoke',
            price: 16,
            description: 'Cooked plantains in a savory sauce',
            image: 'images/matoke.jpg',
            category: 'Main Course'
        },
        {
            id: 8,
            name: 'Maharagwe ya Nazi',
            price: 13,
            description: 'Beans cooked in coconut sauce, coastal style',
            image: 'images/maharagwe.jpg',
            category: 'Main Course'
        },
        {
            id: 9,
            name: 'Mutura',
            price: 10,
            description: 'Traditional Kenyan sausage made with meat and spices',
            image: 'images/mutura.jpg',
            category: 'Appetizer'
        },
        {
            id: 10,
            name: 'Mandazi',
            price: 8,
            description: 'Sweet East African doughnuts, perfect with chai',
            image: 'images/mandazi.jpg',
            category: 'Dessert'
        }
    ];

    // Initialize booking form
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const guests = document.getElementById('guests').value;
        
        // Validate dates
        if (new Date(checkIn) >= new Date(checkOut)) {
            alert('Check-out date must be after check-in date');
            return;
        }

        // Calculate total nights
        const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
        
        // Store booking details
        const bookingDetails = {
            checkIn,
            checkOut,
            guests,
            nights
        };
        
        localStorage.setItem('currentBooking', JSON.stringify(bookingDetails));
        
        // Show available rooms
        displayAvailableRooms(rooms, nights);
    });

    // Function to display available rooms
    function displayAvailableRooms(rooms, nights) {
        const roomContainer = document.querySelector('.room-container');
        roomContainer.innerHTML = rooms.map(room => `
            <div class="room-card card">
                <img src="${room.image}" alt="${room.name}" class="room-image">
                <div class="room-content">
                    <h3>${room.name}</h3>
                    <p>${room.description}</p>
                    <div class="room-footer">
                        <span class="price">KSh ${room.price * nights}/night</span>
                        <button onclick="bookRoom(${room.id}, ${nights})" class="book-btn">
                            <i class="fas fa-bed"></i> Book Now
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Function to render menu by category
    function renderMenuByCategory() {
        const menuContainer = document.querySelector('.menu-container');
        const categories = [...new Set(menuItems.map(item => item.category))];
        
        menuContainer.innerHTML = categories.map(category => `
            <div class="menu-category">
                <h3>${category}</h3>
                <div class="menu-items">
                    ${menuItems
                        .filter(item => item.category === category)
                        .map(item => `
                            <div class="menu-card card">
                                <img src="${item.image}" alt="${item.name}" class="menu-image">
                                <div class="menu-content">
                                    <h4>${item.name}</h4>
                                    <p>${item.description}</p>
                                    <div class="menu-footer">
                                        <span class="price">KSh ${item.price}</span>
                                        <button onclick="orderFood(${item.id})" class="order-btn">
                                            <i class="fas fa-utensils"></i> Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                </div>
            </div>
        `).join('');
    }

    // Global booking function
    window.bookRoom = (roomId, nights) => {
        const room = rooms.find(r => r.id === roomId);
        const bookingDetails = JSON.parse(localStorage.getItem('currentBooking'));
        const totalPrice = room.price * nights;

        const confirmation = confirm(
            `Confirm booking for ${room.name}\n` +
            `${bookingDetails.nights} nights\n` +
            `${bookingDetails.guests} guests\n` +
            `Total: KSh ${totalPrice}`
        );

        if (confirmation) {
            alert('Booking confirmed! Check your email for details.');
            localStorage.removeItem('currentBooking');
        }
    };

    // Global food ordering function
    window.orderFood = (itemId) => {
        const item = menuItems.find(i => i.id === itemId);
        const confirmation = confirm(
            `Confirm order for ${item.name}\n` +
            `Price: KSh ${item.price}`
        );

        if (confirmation) {
            alert('Order confirmed! Your food will be prepared shortly.');
        }
    };

    // Initialize the page
    renderMenuByCategory();
});