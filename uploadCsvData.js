const fs = require("fs");
const csv = require("csv-parser");
const User = require("./models/user"); // Adjust the path based on your project structure
const crypto = require("crypto");

/**
 * Hashes a password using SHA-256 with a salt.
 * @param {string} password - The password to hash.
 * @param {string} salt - The salt to use for hashing.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password, salt) => {
  console.log(password, salt);
  return crypto
    .createHmac("sha256", salt)
    .update(password.toString())
    .digest("hex");
};

/**
 * Uploads data from a CSV file into the MongoDB User collection.
 * @param {string} filePath - The path to the CSV file.
 */
const uploadCsvData = (filePath) => {
  const users = []; // Array to store user objects

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      // Ensure `Global ID` exists
      if (!row["Global ID"]) {
        console.warn(
          `Missing Global ID for user ${row.Name} (${row["Enroll No."]})`
        );
        return; // Skip processing this user if no Global ID
      }

      // Parse name into first and last name, handle empty names
      const nameParts = row.Name ? row.Name.split(" ") : [];
      const firstName = nameParts[0] || "Unknown"; // Default to "Unknown" if no first name
      const lastName = nameParts[1] || ""; // Default to empty string if no last name

      // Handle missing or null `adhaarNumber` by using a placeholder value
      const salt = crypto.randomUUID(); // Generate a new salt for each user

      const user = {
        firstName: firstName,
        lastName: lastName,
        username: row["Enroll No."], // Assuming Enroll No. is used as username
        emailAddress: row["stu email id"],
        role: "ADMIN", // You can adjust this as per your data or add a role field to CSV
        sapId: row["Global ID"],
        programName: row["Program of study"],
        batch: row["Batch"],
        dateOfBirth: null, // You'll need to add a valid date if you have one
        schoolName: row.School,
        adhaarNumber: null, // Use the placeholder value if missing
        contactNumber: null, // If you have contact number, map it here
        apaarId: null, // If you have Apaar ID, map it here
        salt: salt,
      };

      // Hash password asynchronously
      hashPassword(row["Global ID"].toString(), salt)
        .then((hashedPassword) => {
          user.encpy_password = hashedPassword;

          // Add the user object to the users array
          console.log(user);
          users.push(user);
          console.log(users);
        })
        .catch((err) => {
          console.error(
            `Error hashing password for ${row["Enroll No."]}:`,
            err
          );
        });
    })
    .on("end", async () => {
      try {
        // After CSV is fully processed, insert all users into the database
        await User.insertMany(users); // Bulk insert all users
    
        console.log("CSV data successfully uploaded to the database.");
      } catch (error) {
        console.error("Error inserting data into the database:", error);
      }
    });
};

module.exports = uploadCsvData;
