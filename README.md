# Rental Property Management App

A full-stack rental property management application built with modern web technologies and AWS cloud services. This application allows property managers to list properties and tenants to search and apply for rentals.

## Live Demo

Check out the live app: [https://main.d1vydoe7zr96su.amplifyapp.com/search](https://main.d1vydoe7zr96su.amplifyapp.com/search)


## 🏗️ What I Built

This is a comprehensive rental property management system that includes:

### **Core Features**
- 🏠 **Property Management**: Create, view, and manage rental properties
- 👥 **User Management**: Separate dashboards for managers and tenants
- 🔍 **Advanced Search**: Filter properties by price, location, amenities, and more
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🖼️ **Image Upload**: Direct file uploads to AWS S3 with signed URLs
- 📍 **Location Services**: Geocoding and coordinate-based search
- 📋 **Application System**: Tenant applications and lease management
- 💳 **Payment Processing**: Payment tracking and management
- 🔐 **Authentication**: Secure user authentication with AWS Cognito

### **Technology Stack**

#### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form management with validation
- **Redux Toolkit Query** - State management and API calls
- **FilePond** - File upload component with image preview

#### **Backend**
- **Node.js & Express** - RESTful API server
- **TypeScript** - Type-safe backend development
- **Prisma ORM** - Database modeling and queries
- **PostgreSQL** - Primary database with PostGIS for location data
- **JWT Authentication** - Secure API endpoints

#### **AWS Cloud Infrastructure**
- **AWS S3** - File storage for property images
- **AWS RDS** - PostgreSQL database hosting
- **AWS EC2** - Backend server hosting
- **AWS Amplify** - Frontend deployment and hosting
- **AWS Cognito** - User authentication and authorization

## 🚀 How to Run the Project

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- AWS account with configured services

### **Environment Setup**

#### **Backend Environment Variables**
Create a `.env` file in the backend directory:

```env
PORT=5000
DATABASE_URL="postgresql://username:password@your-rds-endpoint:5432/database_name?schema=public"

# AWS Configuration
AWS_S3_BUCKET_NAME="your-s3-bucket-name"
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"

# JWT Configuration
JWT_SECRET="your-jwt-secret"
```

#### **Frontend Environment Variables**
Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:5000"
NEXT_PUBLIC_AWS_REGION="us-east-1"
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID="your-cognito-user-pool-id"
NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID="your-cognito-client-id"
```

### **Installation & Setup**

#### **1. Clone the Repository**
```bash
git clone <repository-url>
cd rentalApp
```

#### **2. Backend Setup**
```bash
cd backend
npm install

# Database setup
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Start the development server
npm run dev
```

#### **3. Frontend Setup**
```bash
cd client
npm install

# Start the development server
npm run dev
```

#### **4. Access the Application**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

### **Production Deployment**

#### **Backend (EC2)**
```bash
# On your EC2 instance
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### **Frontend (AWS Amplify)**
- Connect your GitHub repository to AWS Amplify
- Configure build settings
- Deploy automatically on git push

## 📁 Project Structure

```
rentalApp/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Authentication & validation
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Server entry point
│   ├── prisma/             # Database schema & migrations
│   └── package.json
├── client/                 # Next.js frontend
│   ├── app/               # App Router pages
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utilities & configurations
│   ├── state/            # Redux store & API
│   ├── types/            # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🔧 Key Features Implementation

### **File Upload with AWS S3**
- **Signed URLs**: Secure direct uploads from frontend to S3
- **Image Processing**: Automatic image optimization and preview
- **CORS Configuration**: Proper cross-origin setup for browser uploads

### **Database Design**
- **PostGIS Integration**: Geographic queries for location-based search
- **Prisma ORM**: Type-safe database operations
- **Relational Data**: Properties, locations, users, leases, and applications

### **Authentication Flow**
- **AWS Cognito**: User pool management
- **JWT Tokens**: Secure API authentication
- **Role-based Access**: Manager and tenant permissions

### **Search & Filtering**
- **Advanced Filters**: Price range, bedrooms, bathrooms, amenities
- **Location Search**: Coordinate-based proximity search
- **Real-time Updates**: Dynamic filtering with Redux state management

## 🛠️ API Endpoints

```
GET    /properties           # Get all properties with filters
GET    /properties/:id       # Get specific property
POST   /properties           # Create new property (managers only)
POST   /properties/upload-urls # Generate S3 signed URLs

GET    /tenants              # Get tenant profiles
POST   /tenants              # Create tenant profile

GET    /managers             # Get manager profiles
POST   /managers             # Create manager profile

GET    /applications         # Get applications
POST   /applications         # Submit application

GET    /leases               # Get lease agreements
POST   /leases               # Create lease agreement
```

## 🔒 Security Features

- **JWT Authentication**: Secure API access
- **Role-based Authorization**: Manager/tenant specific endpoints
- **Input Validation**: Zod schema validation
- **CORS Protection**: Configured for production domains
- **Environment Variables**: Sensitive data protection

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Progressive Web App capabilities

## 🚀 Future Enhancements

- [ ] Real-time notifications
- [ ] Chat system between managers and tenants
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with payment processors
- [ ] Automated lease document generation

---

Built with ❤️ using modern web technologies and AWS cloud services.