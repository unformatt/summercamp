# Summercamp

A statically generated site using Next.js and Google Sheets

# Creating credentials for Google Sheets access

- Create new project in Google IAM https://console.developers.google.com/iam-admin
- Enable Sheets API here for new project: https://console.cloud.google.com/apis/library/sheets.googleapis.com?q=sheets
- Then go to Credentials and click "Create Credentials" -> Service account -> Role: Viewer:
    - https://console.cloud.google.com/apis/api/sheets.googleapis.com/credentials (select the new project!)
- After adding the new account, go to the account under "Service Accounts" nav
- Click ADD KEY > create new key > JSON > Download JSON key file to root of this repo and name it gsheet-creds.json
- Then take the crazy email address created for the service account and share the GSheet with that email


# Setup for local dev

- Install dependencies:

```bash
npm install
```

- Copy `.env.example` to `.env` and set the appropriate values.

- Update local static data from Google Sheet

```
npm run update_gsheet_data
```

- Run the app:

```
npm run dev
```


The app should be up and running on [http://localhost:3000](http://localhost:3000)


# Deploy

Deploy commands will pull down the latest data from the Google Sheet and then rebuild the app and deploy.

`npm run deploy` will deploy to Netlify test server

`npm run deploy-prod` will deploy to Netlify production server


