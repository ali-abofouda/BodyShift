# BodyShift Dashboard

Dynamic fitness tracking web app built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Recharts.

## What Changed

- Migrated all fitness/business data to JSON files.
- Added `/dashboard` for editable tracking and monthly analytics.
- Added localStorage persistence layer (ready to swap with API later).
- Added progress logic for monthly comparison and goal forecasting.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Recharts

## Project Structure

```text
app/
	dashboard/
		page.tsx
	globals.css
	layout.tsx
	page.tsx
components/
	DashboardStats.tsx
	EditableCard.tsx
	GoalTracker.tsx
	MonthlyTracker.tsx
	ProgressChart.tsx
	Navbar.tsx
	Hero.tsx
	Results.tsx
	Diet.tsx
	Meals.tsx
	Gym.tsx
	Cardio.tsx
	Tips.tsx
	Summary.tsx
	ui/
		AnimatedReveal.tsx
		Badge.tsx
		Pill.tsx
		SectionHeader.tsx
data/
	user.json
	progress.json
	diet.json
	workout.json
	fitnessData.ts
lib/
	localStore.ts
	progressLogic.ts
main.html
```

## Data Layer

Update your app data from:

- `data/user.json`
- `data/progress.json`
- `data/diet.json`
- `data/workout.json`

All UI values are read through `data/fitnessData.ts`, so editing these JSON files changes the UI source of truth.

## Dashboard Editing Flow

On `/dashboard`:

- Edit weight, calories, and macros directly from inputs.
- Changes are saved to localStorage automatically.
- UI updates instantly after each edit.

Local keys:

- `bodyshift.dashboard.v1`
- `bodyshift.login.v1`
- `bodyshift.theme.v1`

## Progress Calculations

`lib/progressLogic.ts` calculates:

- Weight difference vs last month
- Body fat difference vs last month
- Remaining weight to goal
- Estimated months to goal
- Fat loss percentage trend

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/dashboard`.

## Build Verification

```bash
npm run lint
npm run build
```

## Push To GitHub

```bash
git add .
git commit -m "feat: add dynamic dashboard with JSON data layer and progress tracking"
git branch -M main
git remote add origin https://github.com/<your-username>/bodyshift-webapp.git
git push -u origin main
```

## Deploy To Vercel

### Vercel Dashboard

1. Push repository to GitHub.
2. Open Vercel and click New Project.
3. Import the repository.
4. Framework preset: Next.js.
5. Deploy.

### Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```
