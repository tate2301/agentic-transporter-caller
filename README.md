# Agentic Transporter Caller

A comprehensive driver tracking and assistance platform built with Next.js 14, featuring AI-powered voice assistance using LiveKit and OpenAI's Realtime API.

## Features

### Admin Interface
- **Driver Management**: Add, edit, and manage drivers with complete profile information
- **Truck Management**: Track and manage fleet vehicles with capacity and status monitoring
- **Route Management**: Define and manage transportation routes with distance and duration estimates
- **Trip Management**: Schedule, track, and monitor trips with real-time status updates

### Driver Interface
- **AI-Powered Assistance**: Request help during trips with LiveKit voice calls powered by OpenAI Realtime API
- **Real-time Status**: View active trip information and status
- **Emergency Support**: Quick access to assistance requests
- **Trip Tracking**: Monitor trip progress and receive updates

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: SQLite with Prisma ORM
- **Real-time Communication**: LiveKit
- **AI**: OpenAI Realtime API
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tate2301/agentic-transporter-caller.git
cd agentic-transporter-caller
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- `DATABASE_URL`: SQLite database path (default: file:./dev.db)
- `LIVEKIT_API_KEY`: Your LiveKit API key
- `LIVEKIT_API_SECRET`: Your LiveKit API secret
- `LIVEKIT_URL`: Your LiveKit server URL
- `OPENAI_API_KEY`: Your OpenAI API key

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin interface pages
│   │   │   ├── drivers/       # Driver management
│   │   │   ├── trucks/        # Truck management
│   │   │   ├── routes/        # Route management
│   │   │   └── trips/         # Trip management
│   │   ├── driver/            # Driver interface
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   └── ui/               # shadcn/ui components
│   └── lib/                   # Utility functions
│       ├── prisma.ts         # Prisma client
│       ├── utils.ts          # General utilities
│       └── livekit/          # LiveKit helpers
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## Database Schema

The application uses the following data models:

- **Driver**: Driver information and status
- **Truck**: Vehicle fleet management
- **Route**: Transportation routes
- **Trip**: Trip scheduling and tracking
- **Call**: AI assistance call logs

## API Endpoints

### Drivers
- `GET /api/drivers` - List all drivers
- `POST /api/drivers` - Create a new driver

### Trucks
- `GET /api/trucks` - List all trucks
- `POST /api/trucks` - Create a new truck

### Routes
- `GET /api/routes` - List all routes
- `POST /api/routes` - Create a new route

### Trips
- `GET /api/trips` - List all trips
- `POST /api/trips` - Create a new trip

### LiveKit
- `POST /api/livekit/token` - Generate LiveKit access token

## Usage

### Admin Workflow

1. **Add Drivers**: Navigate to Admin > Drivers and add driver profiles
2. **Add Trucks**: Navigate to Admin > Trucks and add vehicles to the fleet
3. **Create Routes**: Navigate to Admin > Routes and define transportation routes
4. **Schedule Trips**: Navigate to Admin > Trips and assign drivers, trucks, and routes

### Driver Workflow

1. **Access Dashboard**: Navigate to the Driver interface
2. **View Active Trip**: See current trip details and status
3. **Request Assistance**: Click "Request AI Assistance" to receive a call
4. **Receive Call**: AI assistant will call using LiveKit with OpenAI Realtime API

## Development

### Build for Production

```bash
npm run build
```

### Run Production Server

```bash
npm start
```

### Lint Code

```bash
npm run lint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite database file path | Yes |
| `LIVEKIT_API_KEY` | LiveKit API key | Yes (for calls) |
| `LIVEKIT_API_SECRET` | LiveKit API secret | Yes (for calls) |
| `LIVEKIT_URL` | LiveKit server URL | Yes (for calls) |
| `OPENAI_API_KEY` | OpenAI API key | Yes (for AI calls) |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.