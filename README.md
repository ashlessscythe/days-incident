---

# Days Incident

This project visualizes incident tracking for multiple sites, displaying a cross made out of green squares, each representing a day of the current month. The cross provides a visual overview of the days since the last incident for each site, making it easy to track safety performance at a glance.

## Features

- **Visual Incident Tracking:** Displays each day of the current month as a square, forming a cross pattern.
- **Multiple Site Support:** Track incidents across multiple sites, each with its own configuration.
- **Configurable Last Incident Dates:** The last incident dates can be set via environment variables.
- **Site-Specific Configuration:** Site names are also configurable through environment variables.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ashlessscythe/days-incident.git
    ```
2. Navigate to the project directory:
    ```bash
    cd days-incident
    ```
3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root of your project and add the following variables with your own values:

```bash
PORT=3000
VITE_SITE_1_DATE=2024-02-15T07:00
VITE_SITE_1_NAME=Alpha Site
VITE_SITE_2_DATE=2024-03-01T07:00
VITE_SITE_2_NAME=Beta Manufacturing
VITE_SITE_3_DATE=2024-04-22T07:00
VITE_SITE_3_NAME=Gamma Logistics
VITE_SITE_4_DATE=2024-05-10T07:00
VITE_SITE_4_NAME=Delta Tech
VITE_SITE_COUNT=4
```

### Running the Application

To start the development server, run:

```bash
npm start
# or
yarn start
```

This will open the application on the specified port in your default web browser.

### Deployment

Build the application for production using:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## Components

- **CurrentMonth.jsx:** Manages the display of the current month's days.
- **IncidentCross.jsx:** Generates the cross pattern of green squares.
- **IncidentDetails.jsx:** Displays additional details about the incidents.
- **IncidentsDaysAgo.jsx:** Calculates and shows how many days ago the last incident occurred.

## Contributing

Feel free to submit issues and pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.

---