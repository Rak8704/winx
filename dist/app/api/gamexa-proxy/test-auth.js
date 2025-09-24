import { loginToGameXA } from "../../../lib/api/gamexaApi";
async function testAuthentication() {
    try {
        console.log("Testing GameXA authentication...");
        const authResponse = await loginToGameXA();
        console.log("Authentication successful!");
        console.log("Token:", authResponse.token);
        console.log("Agent:", authResponse.agent);
        return authResponse;
    }
    catch (error) {
        console.error("Authentication failed:", error);
        throw error;
    }
}
// Run the test if this file is executed directly
if (require.main === module) {
    testAuthentication()
        .then(() => console.log("Test completed"))
        .catch((error) => {
        console.error("Test failed:", error);
        process.exit(1);
    });
}
export default testAuthentication;
