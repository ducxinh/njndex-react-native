// Quick script to test what redirect URI expo-auth-session will use
const { makeRedirectUri } = require("expo-auth-session");

console.log("\n====================================");
console.log("Redirect URI Test");
console.log("====================================\n");

const redirectUri = makeRedirectUri({
  native: "demoreactnative://",
  scheme: "demoreactnative",
});

console.log("Generated redirect URI:", redirectUri);
console.log("\n====================================");
console.log("ADD THIS TO GOOGLE CLOUD CONSOLE:");
console.log("====================================");
console.log(redirectUri);
console.log("");
console.log("Also add:");
console.log("http://localhost:8081");
console.log("http://localhost:19006");
console.log("====================================\n");
