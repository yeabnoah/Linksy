# Linksy - Open Source Bookmark/Link Manager

Linksy is an open-source bookmark and link manager that enables users to organize and manage their social media posts and other links. It allows for the creation of folders to store links, the ability to share collections with others, and a search feature to quickly find links. With its seamless integration with various social media platforms, Linksy provides an easy and efficient way to manage links.

## Features

- Create folders and organize links from different social media platforms
- Search through your links with ease
- Share your link collections with others
- Embed social media posts from platforms like Twitter, Instagram, and more
- Easy-to-use UI with animations for an enhanced user experience

## Tech Stack

This project uses the following technologies:

- **Next.js**: Framework for both frontend and backend
- **TypeScript**: Programming language
- **Better Auth**: Authentication library
- **Prisma**: ORM for database interactions
- **PostgreSQL**: Database management system
- **ShadCN**: UI component library
- **Framer Motion**: Animation library for smooth transitions
- **React Hot Toast**: Toast notifications library
- **Zod**: Schema and validation library
- **Zustand**: State management library
- **TanStack Query**: Data fetching and caching library
- **Axios**: HTTP client for making requests
- **Tailwind CSS**: Utility-first CSS framework
- **LogLib**: Analytics tool for monitoring
- **Ludide React**: Icon collection
- **React Icons**: Icon collection
- **React Social Media Embed**: Embedding library for social media posts
- **Use-Debounce**: Debouncing library for improved performance

## Getting Started

To get started with the project locally, follow these steps:

### Prerequisites

- Node.js
- PostgreSQL database
- GitHub credentials for OAuth authentication

### Setup

1. **Fork the repository** to your GitHub account.
2. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/linksy.git
   cd linksy
   ```

## Install dependencies

`npm install`

- Set up environment variables: Create a .env file at the root of the project and add the following variables:

`DATABASE_URL=your_postgresql_database_url`

`GITHUB_CLIENT_ID=your_github_oauth_client_id`

`GITHUB_CLIENT_SECRET=your_github_oauth_client_secret`

`BETTER_AUTH_SECRET=your_better_auth_secret`

`BETTER_AUTH_URL=your_better_auth_url`

## Configure authentication client

    - Navigate to /lib/auth-client.ts
    - Change the baseURL to point to your local server (e.g., http://localhost:3000/).

## Run the development server

    `npm run dev`

    - The application will be available at http://localhost:3000.

## How to Contribute

    - Fork the repository to your GitHub account.
    - Clone your fork locally:

`git clone https://github.com/your-username/linksy.git`

### Create a new branch for your feature or bug fix

`git checkout -b feature/your-feature-name`

### Make your changes and commit them

`git add .`

`git commit -m "Add your commit message"`

### Push your changes to your fork

    `git push origin feature/your-feature-name`

### Create a pull request on GitHub from your branch to the main repository.
