const { MongoClient } = require('mongodb');

// Task 1: Define Drivers
const drivers = [
    {
        name: "Orang 1",
        vehicleType: "Sedan",
        isAvailable: true,
        rating: 4.8
    },
    {
        name: "Orang 2",
        vehicleType: "SUV",
        isAvailable: false,
        rating: 4.5
    }
];

// TODO: Show all the drivers 
console.log("\n--- Driver Names ---");
drivers.forEach((driver) => {
    console.log(driver.name);
});

// TODO: Add additional 
const newDriver = [
    {
        name: "orang 3",
        vehicleType: "Van",
        isAvailable: true,
        rating: 4.9
    },
    {
        name: "Orang 4",
        vehicleType: "Van",
        isAvailable: true,
        rating: 4.9
    }
];
drivers.push(...newDriver);

console.log("\n--- After adding new drivers ---");
drivers.forEach((driver, index) => {
    console.log(`${index + 1}. ${driver.name}`);  // Now all will show correctly
});


async function main() {
    // Replace with your MongoDB connection string
    const url = "mongodb://localhost:27017"; // For local MongoDB
    // const url = "mongodb+srv://username:password@cluster.mongodb.net/"; // For Atlas
    
    const client = new MongoClient(url);
    
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("\nyeay...Connected to MongoDB!");
        
        const db = client.db("testDB");
        const collection = db.collection("users");
        const driversCollection = db.collection("drivers");
        
        // Insert a document
        const insertResult = await collection.insertOne({ 
            name: "auss", 
            age: 25 
        });

         // Method 1: Insert drivers one by one
        console.log("\n--- Inserting drivers one by one ---\n");
        for (const driver of drivers) {
            const result = await driversCollection.insertOne(driver);
            console.log(`✅ Inserted driver: ${driver.name} with ID: ${result.insertedId}`);
        }

        console.log("\nYESS...Document inserted!");
        
        // Query the document
        const result = await collection.findOne({ name: "auss" });
        console.log("Query result:", result);
        
    } catch (err) {
        console.error("Error:", err);
    } finally {
        // Close connection
        await client.close();
    }
}

// Run main function
main().catch(console.error);