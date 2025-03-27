# CarePlus - Healthcare Appointment Management System

A modern healthcare appointment management system built with Next.js, Appwrite, and AWS.

## Features

- 🔐 Secure authentication and authorization
- 👥 Patient registration and profile management
- 👨‍⚕️ Doctor management
- 📅 Appointment scheduling and management
- 📱 Responsive design for all devices
- 🔄 Real-time updates
- 📊 Admin dashboard
- 📝 Medical history tracking
- 📄 Document management

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Appwrite
- **Database**: Appwrite Database
- **Storage**: Appwrite Storage
- **Authentication**: Appwrite Auth
- **Deployment**: AWS ECS (Elastic Container Service)

## Prerequisites

- Node.js 20.x or later
- npm or yarn
- Appwrite instance
- AWS account (for deployment)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_ENDPOINT=your_appwrite_endpoint
PROJECT_ID=your_project_id
API_KEY=your_api_key
DATABASE_ID=your_database_id
PATIENT_COLLECTION_ID=your_patient_collection_id
DOCTOR_COLLECTION_ID=your_doctor_collection_id
APPOINTMENT_COLLECTION_ID=your_appointment_collection_id
NEXT_PUBLIC_BUCKET_ID=your_bucket_id
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/careplus.git
cd careplus
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Appwrite credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

1. Build the Next.js application:
```bash
npm run build
```

2. Build the Docker image:
```bash
docker build -t care-app .
```

3. Test the Docker image locally:
```bash
docker run -p 3000:3000 care-app
```

## Deployment to AWS ECS

1. Create an ECR repository:
```bash
aws ecr create-repository --repository-name care-app
```

2. Tag and push your image to ECR:
```bash
aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com
docker tag care-app:latest your-account-id.dkr.ecr.your-region.amazonaws.com/care-app:latest
docker push your-account-id.dkr.ecr.your-region.amazonaws.com/care-app:latest
```

3. Create an ECS cluster:
```bash
aws ecs create-cluster --cluster-name care-cluster
```

4. Register the task definition:
```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

5. Create the service:
```bash
aws ecs create-service --cli-input-json file://service.json
```

## Project Structure

```
careplus/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── patients/          # Patient routes
│   └── doctors/           # Doctor routes
├── components/            # React components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@careplus.com or create an issue in the repository.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Appwrite](https://appwrite.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [AWS](https://aws.amazon.com/)
