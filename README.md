# Node.js Backend for React and SharePoint Integration

This repository hosts the Node.js backend for a web application that integrates a React frontend with SharePoint and Dataverse. The project aims to provide a robust solution for managing and interacting with organizational data through a modern, responsive interface.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- 
## Introduction

This Node.js backend provides the server-side logic for a web application that uses React for the frontend and integrates with SharePoint as the primary data source. It handles API requests, data processing, authentication, and communication with SharePoint and Dataverse.

## Features

- **Fetch Dataverse Data:** Retrieve Funding request from Dataverse.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v12.x or later) and npm installed on your machine.
- A Dataverse instance and the necessary API credentials.
- A `.env` file with the required environment variables (see Configuration).

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Deepakjoseos/Dataverse-integration-with-React-Js-and-Node-Js.git
    cd Dataverse-integration-with-React-Js-and-Node-Js/backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the root of your project and add your own following environment variables:

```plaintext
PORT=5000
tenantId="Enter Azure Tenant Id"
clientId="Enter Azure Client Id"
client_secret="Enter Azure client secret"
scope="Enter Scope"
```

## Usage

1. Start the Node.js server:
```bash
npm start
```
2. The server will run on http://localhost:5000 (or another port if configured).

## API Endpoints

Get Funding Request from the dataverse
URL: /api/fundingRequests/:name
Method: GET
Description: Fetches funding requests from Dataverse based on the provided id.


## Troubleshooting

If you encounter issues, consider the following steps:

Ensure your .env file contains the correct credentials and URLs.
Check the console for error messages and stack traces.
Verify that you have the necessary permissions to access and modify data in SharePoint and Dataverse.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request to propose changes.
