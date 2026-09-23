# RetireReady

Know when to stop repairing the dishwasher.

RetireReady tracks each appliance's age against its typical lifespan and applies the 50% rule - plus age pressure - when a repair quote lands, so repair-vs-replace becomes math instead of vibes. A cheap fix on a young unit says repair; any fix on a unit past its expected life says start the replacement fund.

## Use it

Open `index.html` for the landing page, or go straight to `app.html`.

Everything runs client-side; your appliances are stored in the browser's localStorage. No account, no server.

## Files

- `index.html` - landing page
- `app.html` - the app
- `engine.js` - pure appliance-age + verdict math, shared by the app and tests

Built by the hourly app factory.
