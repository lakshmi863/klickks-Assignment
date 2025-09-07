// backend/seed.js

const db = require('./db'); // Our database class instance
const bcrypt = require('bcrypt');
const saltRounds = 10;

// A list of sample photographers to add
const samplePhotographers = [
    {
        name: 'Eleanor Vance',
        email: 'eleanor@example.com',
        password: 'password123',
        location: 'New York, NY',
        specialty: 'Fine Art & Documentary Wedding Photography',
        bio: 'Capturing light, love, and life. I specialize in creating timeless, artful images that tell the story of your day with honesty and elegance.',
        profile_image_url: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'Marcus Holloway',
        email: 'marcus@example.com',
        password: 'password123',
        location: 'San Francisco, CA',
        specialty: 'Candid & Photojournalistic Style',
        bio: 'My goal is to be a fly on the wall, capturing the real, unposed moments that make your wedding day unique. For adventurous and fun-loving couples.',
        profile_image_url: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'Isabella Rossi',
        email: 'isabella@example.com',
        password: 'password123',
        location: 'Tuscany, Italy',
        specialty: 'Romantic & Destination Weddings',
        bio: 'Inspired by the romantic landscapes of Italy, I create dreamy, light-filled photographs. Available for travel worldwide to capture your destination wedding.',
        profile_image_url: 'https://images.pexels.com/photos/5217960/pexels-photo-5217960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
];

// The main function to seed the database
async function seedDatabase() {
    console.log('Starting to seed the photographers table...');

    for (const photographer of samplePhotographers) {
        try {
            // Hash the password before inserting
            const hashedPassword = await bcrypt.hash(photographer.password, saltRounds);

            const profile = {
                ...photographer, // spread the existing photographer data
                hashedPassword,
            };

            await db.createPhotographer(profile);
            console.log(`Successfully added: ${photographer.name}`);
        } catch (error) {
            // Check for unique constraint error (if email already exists)
            if (error.message.includes('UNIQUE constraint failed')) {
                console.log(`Skipping duplicate: ${photographer.name}`);
            } else {
                console.error(`Failed to add ${photographer.name}:`, error.message);
            }
        }
    }
    console.log('Database seeding complete.');
}

// Run the seed function
seedDatabase();