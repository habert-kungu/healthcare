<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js&style=for-the-badge" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" alt="TypeScript">
  <img src="https://img.shields.io/badge/Appwrite-F02E65?logo=appwrite&logoColor=white&style=for-the-badge" alt="Appwrite">
  <img src="https://img.shields.io/badge/AWS-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge" alt="AWS">

  <h1 align="center">✨ CarePlus ✨</h1>
  <h3 align="center">Modern Healthcare Appointment Management System</h3>

  <p align="center">
    Revolutionizing patient care with seamless appointment scheduling, secure data management, and real-time updates.
  </p>
  
![image](https://github.com/user-attachments/assets/1e37b110-355b-43af-8406-c815b84ca380)

  [![Deploy with AWS](https://img.shields.io/badge/Deploy-AWS-orange?style=for-the-badge&logo=amazonaws)](https://aws.amazon.com/)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
</div>

## 🚀 Key Features

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <strong>👥 Patient Management</strong><br>
        Secure profiles, medical history, and document storage
      </td>
      <td align="center" width="33%">
        <strong>📅 Smart Scheduling</strong><br>
        Intuitive appointment booking with real-time availability
      </td>
      <td align="center" width="33%">
        <strong>📊 Analytics Dashboard</strong><br>
        Powerful insights for healthcare administrators
      </td>
    </tr>
    <tr>
      <td align="center">
        <strong>🔐 Role-Based Access</strong><br>
        Granular permissions for patients, doctors, and admins
      </td>
      <td align="center">
        <strong>📱 Mobile-Friendly</strong><br>
        Fully responsive design for all devices
      </td>
      <td align="center">
        <strong>⚡ Real-Time Updates</strong><br>
        Instant notifications and status changes
      </td>
    </tr>
  </table>
</div>

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **React Hook Form** for forms
- **Zod** for validation

### Backend & Infrastructure
- **Appwrite** for backend services
- **Docker** for containerization
- **AWS ECS** for deployment
- **Sentry** for error monitoring
- **Twilio** for notifications

## 🏁 Getting Started

### Prerequisites
- Node.js 20.x+
- Docker (for containerization)
- Appwrite instance ([how to set up](https://appwrite.io/docs/installation))
- AWS account (for deployment)

  
### Set Up Environment Variables

Create a new file named .env.local in the root of your project and add the following content:
```bash
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=111111
```

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/careplus.git
cd careplus

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Run the development server
npm run dev
```
Or Docker if it doesnot work on your matchine 
```bash
# Build the Docker image
docker build -t careplus-app .

# Run the container
docker run -p 3000:3000 --env-file .env.local careplus-app
```
