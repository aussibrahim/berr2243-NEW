const { MongoClient } = require('mongodb');

async function main() {
    // Replace with your MongoDB connection string
    const url = "mongodb://localhost:27017"; // For local MongoDB
    // const url = "mongodb+srv://username:password@cluster.mongodb.net/"; // For Atlas
    
    const client = new MongoClient(url);
    
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB!");
        
        const db = client.db("testDB");
        const collection = db.collection("users");
        
        // Insert a document
        const insertResult = await collection.insertOne({ 
            name: "Alice", 
            age: 25 
        });
        console.log("Document inserted!");
        
        // Query the document
        const result = await collection.findOne({ name: "Alice" });
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