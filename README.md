🚀 StayHaven – Vacation Rental Marketplace
A full-stack MVC web application where users can discover, list, review, and book stays (villas, cabins, apartments) worldwide with secure authentication and image uploads.
---
 🌟 Key Features
    🔐 **User Authentication**: Secure signup, login, and sessions using Passport.js.
    📝 **CRUD Operations**: Full Create, Read, Update, and Delete capabilities for stay listings.
    ⭐ **Review System**: Five-star rating (Starability widget) and comment posting.
    🛡️ **Role Authorization**: Custom middleware guards for listing owners and review authors.
    🔍 **Location Search**: Live search bar returning partial matches strictly by location spelling.
    ☁️ **Image Uploads**: Media upload integration with Multer and Cloudinary storage.
  
   🛠 Tech Stack
    **Backend**: Node.js, Express.js, `dotenv`, `method-override`
    **Database**: MongoDB, Mongoose ODM, `connect-mongo` (session store)
    **Views & UI**: EJS, EJS-Mate layouts, Bootstrap 5, FontAwesome
    **Security & Validation**: Passport.js, `passport-local`, Joi (schema validation)
    **Uploads**: Multer, `multer-storage-cloudinary`

  ⚙️ Quick Setup
1.  **Clone & Install Dependencies**:
    ```bash
    cd stayhaven
    npm install
    ```
2.  **Configure Environment Variables** (Create a `.env` file in the root):
    ```env
    CLOUD_NAME=your_cloudinary_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    ATLASDB_URL=mongodb+srv://...
    SECRET=your_session_secret_key
    ```
3.  **Seed the Database**:
    ```bash
    node init/index.js
    ```
4.  **Start the Server**:
    ```bash
    npx nodemon app.js
    ```
    *Open [http://localhost:8080/listings](http://localhost:8080/listings) in your browser.*
---
## 📂 MVC Directory Structure
*   `/models` - Mongoose schemas (`listings.js`, `review.js`, `user.js`).
*   `/controllers` - MVC handlers containing endpoint logic.
*   `/routes` - Express routers mapping sub-paths to controllers.
*   `/views` - Dynamic layouts, includes (navbar/footer), and resource pages.
*   `/public` - Static CSS stylesheets and client-side validation scripts.
*   `/init` - Default stay data and seeding script.
