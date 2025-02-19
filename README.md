# VoxLeads Frontend

A React-based dashboard for VoxLeads, built with React 18 and Bootstrap 4, featuring a modern and responsive UI for managing client calls, agents, and analytics.

## Tech Stack

- **Framework**: React 18.2.0
- **UI Framework**: Bootstrap 4.6.2
- **Styling**: SASS
- **Authentication**: Firebase
- **State Management**: React Context
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **Charts**: Chart.js with react-chartjs-2
- **Payment Integration**: Stripe
- **Date Handling**: Moment.js

## Prerequisites

- Node.js (version 22 or higher)
- npm or yarn
- Firebase account
- Stripe account (for payment processing)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Environment Configuration

Create appropriate `.env` files for different environments. Use `.env.local.template` as a starting point:

```env
GENERATE_SOURCEMAP=false
NODE_ENV=development
REACT_APP_API_URL=http://localhost:8000/api/v1
```

Available environment files:
- `.env.development` - Development environment settings
- `.env.production` - Production environment settings
- `.env.staging` - Staging environment settings

## Project Structure

```
src/
├── assets/              # Static assets (images, styles)
│   ├── css/            # Compiled CSS
│   ├── scss/           # SASS source files
│   ├── img/            # Images and icons
│   └── plugins/        # Third-party plugins
├── components/         # Reusable components
│   ├── Footers/       # Footer components
│   ├── Headers/       # Header components
│   ├── Navbars/       # Navigation components
│   └── Sidebar/       # Sidebar components
├── context/           # React Context providers
├── layouts/           # Page layouts
├── services/          # API services
├── variables/         # Constants and configurations
├── views/             # Page components
│   └── components/    # View-specific components
├── firebase-config.js # Firebase configuration
├── index.js          # Application entry point
└── routes.js         # Route definitions
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from create-react-app
- `npm run install:clean` - Clean install dependencies
- `npm run compile:scss` - Compile SCSS to CSS
- `npm run minify:scss` - Minify compiled CSS
- `npm run build:scss` - Compile and minify SCSS

## Features

### Authentication
- Firebase authentication integration
- Protected routes
- User session management

### Dashboard Components
- **Agents**: Manage and monitor agent status and performance
- **Bookings**: Track and manage appointment bookings
- **Centers**: Manage call centers and locations
- **Clients**: Client management and information
- **Leads**: Lead tracking and management
- **Logs**: System and call logs
- **Analytics**: Charts and statistics
- **Payment**: Stripe payment integration

### UI Components
- Responsive navigation
- Dynamic sidebar
- Custom alerts and notifications
- Data tables
- Charts and graphs
- Form components
- Modal dialogs

## Deployment

The application is configured for deployment to Google App Engine:

### Development
```bash
npm run build
gcloud app deploy app.staging.yaml
```

### Production
```bash
npm run build
gcloud app deploy app.production.yaml
```

## Environment-Specific Configurations

### Development
```yaml
runtime: nodejs22
instance_class: F2
env_variables:
  NODE_ENV: development
```

### Production
```yaml
runtime: nodejs22
instance_class: F2
env_variables:
  NODE_ENV: production
```

## API Integration

The frontend communicates with the backend API using Axios. API base URL is configured through environment variables:

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

## State Management

Application state is managed using React Context:
- `AccountContext` - User authentication and account state
- `TimeContext` - Time-related state management

## Styling

The project uses SASS for styling with the following structure:
- Custom SCSS variables and mixins
- Component-specific styles
- Responsive design utilities
- Theme customization
- Bootstrap overrides

## Performance Optimization

- Code splitting with React.lazy
- Component lazy loading
- Asset optimization
- Production builds with source maps disabled

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Not supported: IE11 and below

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

Proprietary - All rights reserved
