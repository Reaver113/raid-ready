# Ready4Raid

This app aims to allow a player to check how ready one of there characters is by assesing the Ilvl of players gear compared to the raid they want to enter.

Built using Next.Js 16.1.2

## Local usage

To run this app locally you will need

- Node.js (includes npm) – version 18+ recommended for Next.js 15+

Clone the repo and install the required packages with

```
npm i
```

Build the application then run it with

```
npm run build
npm run start
```

## Development

### Week One

Implementation of basic components complete, and basic login screen built.

![Login Screen](./public/screenshots/development_login_screen.jpg)

Authentication using Auth.js (Next-Auth) completed, and confirmed returned session token, basic landing page built confirming logged in users username.

![Landing Screen](./public/screenshots/development_landing_screen.jpg)

#### Next Steps

Implemntation of API calls to access player gear and current raiding tiers.

#### Possible difficulties

Managing multiple API calls to different endpoints to access the required information could have unforseen issues with state handling or too many requests.

### Week Two

Creation of API call to access Wow Profiles and implementation of dropdown component to Pick between Realms and Characters.

![Character Select](./public/screenshots/development_character_select.jpg)

#### Encountered Issues

Understanding of how Auth js handled the returned information was inccorect and required additonal fields such as JWT for access token encryption, as well as aditional scope fields to allow access to certain parts of the WoW API such as profile information.

#### Next Steps

Fetching of additonal information for selected characters such as item Level, Clean up of character panel component to use react-bootstrap to be in line with the rest of the project, clean up of types using a global types file now that there is a better understanding of the types used.

#### Possible difficulties

The handling of multiple API returns and passing information through multiple components could exponentially increase the complexity of this project.

## Week Three

Implementation of API call for character equipment and further call for individual equipment Icon, added hover box for item information

![Items](./public/screenshots/development_items.jpg)
