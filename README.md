# FixPoints - Car Service Finder

A modern, scalable web application for finding and reviewing car services, built with Next.js 14, TypeScript, and Tailwind CSS. FixPoints is similar to Wolt or Yelp, but specifically for automotive services.

## 🚗 Features

- **Service Discovery**: Search and filter car services by location, category, and rating
- **User Authentication**: Email, Google, and Apple sign-in support
- **Review System**: Rate and review services with 1-5 star ratings
- **Map Integration**: View services on an interactive map
- **Responsive Design**: Mobile-first design that works on all devices
- **Admin Dashboard**: Manage services, users, and reviews
- **Real-time Search**: Fast, filtered search with multiple criteria

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Maps**: Google Maps API
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                 # Next.js 14 app directory
│   ├── auth/           # Authentication pages
│   ├── search/         # Search functionality
│   ├── services/       # Service detail pages
│   └── admin/          # Admin dashboard
├── components/         # Reusable UI components
├── lib/               # Utility functions and configurations
└── types/             # TypeScript type definitions

prisma/
├── schema.prisma      # Database schema
└── migrations/        # Database migrations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google Maps API key (optional, for map features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-service-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/car_service_finder"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

The application uses Prisma with PostgreSQL and includes the following main models:

- **Users**: User accounts with authentication
- **Services**: Car service businesses
- **Categories**: Service categories (repair, wash, oil change, etc.)
- **Reviews**: User reviews and ratings
- **ServiceImages**: Multiple images per service
- **Favorites**: User favorite services

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio

### Key Components

- **SearchBar**: Main search interface with location and service type filters
- **ServiceCard**: Display service information in lists
- **SearchFilters**: Advanced filtering sidebar
- **Header**: Navigation and user authentication
- **ServiceCategories**: Category grid display

## 📱 Mobile App Conversion

This web app is designed to be easily convertible to mobile apps:

### React Native
1. Use React Native with shared components
2. Leverage react-native-web for code sharing
3. Use expo for rapid development

### Flutter
1. Create Flutter wrapper around web views
2. Use Flutter Web for shared UI components
3. Implement native features as needed

### Recommended Approach
Use **React Native** with **Expo** for maximum code reuse:
- Share business logic and API calls
- Reuse component structure
- Native performance for mobile-specific features

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
- Netlify
- Railway
- Render
- AWS Amplify

## 🔒 Authentication

Supports multiple authentication methods:
- Email/password with secure hashing
- Google OAuth
- Apple Sign-in
- Remember me functionality
- Password reset flow

## 🗺 Map Integration

Google Maps integration for:
- Service location display
- Distance calculations
- Interactive map view
- Location-based search

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Base URL of the application | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review existing issues and discussions

---

**Ready to find the best car services in your area!** 🚗✨