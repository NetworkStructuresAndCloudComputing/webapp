# Assignment 1

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- npm (Node Package Manager): Included with Node.js installation
- MySQL: [Download and Install MySQL](https://www.mysql.com/)
  
## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/MohammedZakirMemon/webapp.git
    ```

2. Navigate to the project directory:

    ```bash
    cd webapp
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up the database:

    - Create a MySQL database.
    - Update the database configuration in `config.js` or `.env` file with your MySQL database credentials.


5. Set environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    BASIC_AUTH_USERNAME=your_basic_auth_username
    BASIC_AUTH_PASSWORD=your_basic_auth_password
    DATABASE_USER=your_mysql_user
    DATABASE_PASSWORD=your_mysql_password
    DATABASE_NAME=your_mysql_database
    ```

## Usage

To run the application locally, use the following command:

```bash
node App.js
```

## Reference 
1. https://www.youtube.com/watch?v=btWo1jxFwp8
2. https://sequelize.org/docs/v6/other-topics/legacy/


## Authod

Mohammed Zakir Memon

