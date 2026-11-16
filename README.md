# Profit with Purpose

PWP is a professional website developed for the Profit with Purpose organization at the University of Virginia (UVA). Their goal is to deliver impact-based consulting and investment to early-stage ESG startups from diverse perspectives. This project was created in collaboration with the executive members of the organization to design and populate the website's content effectively.

## Project Overview

The website serves as a platform for the organization to showcase their mission, past projects, partners, and members. It includes an admin panel for secure management of site content.

## Technologies Used

- **Frontend**: React.js, Tailwind, shadcn/ui
- **Backend**:
  - **Current Production Backend**: Node.js with serverless-http, deployed on Netlify for cost-efficiency.
  - **Distributed Backend**: Java Spring Boot microservices architecture, containerized with Docker and orchestrated using Kubernetes.
- **Database and Storage**: Firebase (used for data storage, file storage, and authentication)

## Backend Architecture

### Current Production Backend
The current production backend is a **Node.js** implementation using **serverless-http**, deployed on **Netlify** to take advantage of its free tier, making it a cost-efficient solution. This backend handles API requests effectively given the current frequency of usage, providing a reliable solution with minimal overhead.

### Distributed Backend
A more robust and scalable backend has been developed using **Java Spring Boot**, following a microservices architecture. Each microservice is independently containerized with **Docker** and is designed to be deployed and managed using **Kubernetes** on **Digital Ocean Kubernetes (DOKS)**. This architecture allows for improved scalability and modularity. However, due to higher operational costs associated with deploying and maintaining the microservices architecture relative to current API request frequencies, resources have not been allocated for its deployment at this time.

Having both backend options allows the organization to adapt to changing needs.

## Features

- **Dynamic Content Management**: Admins can log in securely using Firebase authentication to edit and update website content.
- **Scalable Backend Options**: Flexibility to switch between a cost-effective serverless backend and a scalable microservices architecture.
- **Responsive Design**: The website is designed to be responsive and accessible on various devices.
- **Secure Admin Access**: Only authorized personnel can access the admin panel to make changes.

## Deployment

The website is deployed and accessible at [https://uvapwp.com/](https://uvapwp.com/).

The frontend and API are tracked in this repository and run in two separate Netlify projects. Each app has its own `package.json` and lockfile. Commit changes to either app from this repository.

Link both existing Netlify projects to `EthanHaller/PWP-Website`. Set the base directory and leave the package directory blank so each project installs dependencies and reads `netlify.toml` from its own directory.

| Netlify project | Base directory | Configuration |
| --- | --- | --- |
| Frontend | `frontend` | Builds with `npm run build` and publishes `dist`. |
| API | `backend` | Bundles `netlify/functions` and routes `/api/*` to the API function. |

Set `main` as the production branch for both projects and stop auto publishing before changing their Git links. Keep the existing domains and environment variables. Verify both deploy candidates before publishing them manually from Netlify. Use read-only checks for the production cutover and reserve tests that change data for the isolated QA environment.

### Local development and integration testing

Run the frontend and API on your machine against the `pwp-website-qa` Firebase project and its synthetic data. The Git-ignored `qa.local/.env` file in each app contains its QA settings. Run integration checks from a local checkout of `main` before publishing the production deploys in Netlify.

Use Node.js 22 for local development. Authenticate the local API once with `gcloud auth application-default login` using a Google account with access to the QA project. Run these commands in separate terminals from their respective directories.

```sh
# backend
node --env-file=qa.local/.env netlify/functions/api.js

# frontend
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Use the app's login page for the QA Firebase Auth account. The API reads Firestore using Google credentials supplied outside the env files. The QA Firebase project uses Spark, so file uploads that require Cloud Storage are unavailable in this setup.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
