# Expense Tracker

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## The app is live on
### https://expense-tracker-thebishalniroula.vercel.app/
Since I am using a free version of the planetscale database the database might go down in the future. So if you cannot use the application from the live link please run it locally on your machine.

## How to run this project locally?

1. Clone this repo 
`git clone https://github.com/thebishalniroula/expense-tracker.git`

2. Go to the project folder 
`cd expense-tracker` 

3. Duplicate `.env.example` into a new `.env` file 

4. Create a mysql database and put the connection string to the `DATABASE_URL` variable

5. Run `pnpm install`

6. Run `pnpm prisma db push`

7. Run `pnpm prisma generate` to make sure Prisma Client is generated.

8. Run `pnpm run dev`

9. Visit `http://localhost:3000` 
