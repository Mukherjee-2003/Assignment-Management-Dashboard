# Assignment & Review Dashboard

A responsive assignment management dashboard built with **React** and **Tailwind CSS**, featuring separate Admin and Student experiences. Admins can create and manage assignments, assign them to students, and monitor submissions. Students can view their assigned work, access resources, and submit assignments through a confirmation workflow.

## Live Demo

[View Live Application](https://assignment-management-dashboard-two.vercel.app/login)

## Features

### Admin

- Admin dashboard with assignment and submission statistics.
- Create, edit, and delete assignments.
- Assign assignments to all students or selected students.
- Add assignment descriptions, due dates, and Google Drive links.
- View individual student submission statuses.
- Track submitted and pending assignments.
- Admins can only view and manage assignments they created.

### Student

- Student dashboard with personal assignment statistics.
- View assignments assigned specifically to the logged-in student.
- Access assignment resources through Google Drive links.
- Submit assignments using a two-step confirmation process.
- View submission status and submission progress.

### General

- Mock login system with predefined Admin and Student accounts.
- Role-based route protection.
- Persistent application data using localStorage.
- Responsive layout for desktop and mobile screens.
- Role-specific navigation and dashboards.

## Tech Stack

- **React** – Component-based UI development.
- **React Router DOM** – Client-side routing and navigation.
- **Tailwind CSS** – Responsive styling and UI design.
- **JavaScript (ES6+)** – Application logic.
- **Context API** – Global authentication and assignment state.
- **localStorage** – Client-side data persistence.
- **Vercel** – Application deployment.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager).
- Git.

### Installation

1. Clone the repository:

    ```bash
    git clone YOUR_GITHUB_REPOSITORY_URL
    ```

2. Navigate to the project directory:

    ```bash
    cd YOUR_PROJECT_DIRECTORY
    ```

3. Install dependencies:
