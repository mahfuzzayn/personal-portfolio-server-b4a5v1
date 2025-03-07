# PerpoDia - Server Side (Backend)

- **Live Server**: https://perpodia-server.vercel.app/

## **Project Overview**
PerpoDia Server is built using Node.js, Express, and TypeScript, focusing on user registration with a custom authentication system. Instead of handling login functionality, authentication is managed on the client-side using NextAuth. The server supports CRUD operations for managing projects, blogs, and user messages, with all user data securely stored in MongoDB. The registration system allows users to create accounts, which are then validated and stored for future interactions. The server efficiently handles API requests and integrates seamlessly with the Next.js frontend, ensuring smooth communication and an optimal user experience while maintaining high performance.

## **Tech Stack**
- **Backend Framework:** Node.js (Express.js) + TypeScript
- **Langages:** MongoDB (Mongoose ODM)
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Custom authentication with MongoDB
- **File Storage:** Cloudinary

## **Getting Started**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/mahfuzzayn/perpodia-server.git
cd perpodia-server
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Environment Variables**
Create a `.env` file in the root directory and add the following:
```env
NODE_ENV=your_node_env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### **4️⃣ Run the Development Server**
```sh
npm run dev
```
Your backend will be running at `http://localhost:5000`.

## **API Endpoints**
- **Auth Routes:** Login & Register user
- **Projects Routes:** CRUD operations for projects
- **Blogs Routes:** CRUD operations for blogs
- **Messages Routes:** CRUD operations for messages

Developed by [Mahfuz Zayn](https://mahfuzzayn.netlify.app/).
