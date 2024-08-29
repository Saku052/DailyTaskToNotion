# Notion Daily TODO Automator

This project uses Google Apps Script to interact with the Notion API. It automatically adds daily TODO tasks to Notion at midnight if the task was completed on the previous day.

## Features

- **Daily Automation**: Adds new TODO tasks at midnight every day.
- **Task Verification**: Only adds new tasks if the previous day's tasks are completed.
- **Google Apps Script Integration**: Runs entirely on Google Apps Script.

## Prerequisites

- A Notion account with access to the relevant database.
- Google Apps Script set up with access to your Google account.
- Notion API integration with a token and database ID.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Saku052/DailyTaskNotion.git
   ```

2. **Set Up Google Apps Script**:
Open Google Apps Script.
Create a new project and copy the contents of the repository.
3. **Configure Environment Variables**:
Set up your Notion API key and database ID in the Apps Script file.
``` javascript
const NOTION_API_KEY = 'your_notion_api_key';
const DATABASE_ID = 'your_database_id';
```
4. **Schedule the Trigger**:
Go to Triggers in Google Apps Script.
Set up a trigger to run the main function addDailyTasks at midnight.

## Contributing
Feel free to contribute to this project by creating a pull request. Make sure to follow the coding style and include tests for new features.
