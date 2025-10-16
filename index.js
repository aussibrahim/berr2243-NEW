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
        rating: 4.7
    },
    {
        name: "Orang 4",
        vehicleType: "truck",
        isAvailable: false,
        rating: 4.2
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
            console.log(`--->> Inserted driver: ${driver.name} with ID: ${result.insertedId}`);
        }

        console.log("\nYESS...Document inserted!\n");
        
        //task 4
        console.log("finding...Available Drivers (Rating > 4.5)...");
        const finalAvailableDrivers = await driversCollection.find({
            isAvailable: true,
            rating: { $gte: 4.5 }
        }).toArray();
        
        console.log(`Found ${finalAvailableDrivers.length} available drivers with rating > 4.5:\n`);
        finalAvailableDrivers.forEach((driver, index) => {
            console.log(`${index + 1}. ${driver.name} - Rating: ${driver.rating}\n`);
        });
        
        // Show Orang 1's current rating
        const orang1Before = await driversCollection.findOne({ name: "Orang 1" });
        console.log(`\nupdating Orang 1's current rating: ${orang1Before.rating}....`);
        
        // Update: Increase Orang 1's rating by 0.1
        console.log("\nIncreasing Orang 1's rating by 0.1...\n");
        const updateResult = await driversCollection.updateOne(
            { name: "Orang 1" },  // Find Orang 1
            { $inc: { rating: 0.1 } }  // Increase rating by 0.1
        );
        
        console.log(`Update result - Matched: ${updateResult.matchedCount}, Modified: ${updateResult.modifiedCount}`);
        
        // Verify the update - Find Orang 1 again
        const orang1After = await driversCollection.findOne({ name: "Orang 1" });
        console.log(`Orang 1's new rating: ${orang1After.rating}`);
        
        // Show all drivers after update
        console.log("\n--- All Drivers After Rating Update ---");
        const allDrivers = await driversCollection.find().toArray();
        allDrivers.forEach((driver, index) => {
            console.log(`${index + 1}. ${driver.name} - ${driver.vehicleType} - Rating: ${driver.rating} - Available: ${driver.isAvailable}`);
        });
        
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