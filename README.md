
# Pre-requisites

* Install Node.js

# Getting started

* Rename the `process.env` file in the root directory of the project to `.env`
* Set the token in the `.env` file to the variable `TOKEN=""`
* Set the database url in the `.env` file to the variable `DATABASE_URL=""`
* By default, the project is configured to use SQLite as the database.
* Install all packages

<pre><div class="relative rounded-md"><button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-auto disabled:opacity-50 hover:text-accent-foreground absolute right-2 top-2 h-6 w-6 rounded-full p-0 text-muted-foreground hover:bg-accent" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button><div node="[object Object]" class="rounded-md"><code class="language-text"><span>npm i</span></code></div></div></pre>

* Generate the Prisma client

<pre><div class="relative rounded-md"><button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-auto disabled:opacity-50 hover:text-accent-foreground absolute right-2 top-2 h-6 w-6 rounded-full p-0 text-muted-foreground hover:bg-accent" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button><div node="[object Object]" class="rounded-md"><code class="language-text"><span>npx prisma generate</span></code></div></div></pre>

* Apply the migrations to the database

<pre><div class="relative rounded-md"><button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-auto disabled:opacity-50 hover:text-accent-foreground absolute right-2 top-2 h-6 w-6 rounded-full p-0 text-muted-foreground hover:bg-accent" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button><div node="[object Object]" class="rounded-md"><code class="language-text"><span>npx prisma migrate dev</span></code></div></div></pre>

* To build the project

<pre><div class="relative rounded-md"><button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-auto disabled:opacity-50 hover:text-accent-foreground absolute right-2 top-2 h-6 w-6 rounded-full p-0 text-muted-foreground hover:bg-accent" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button><div node="[object Object]" class="rounded-md"><code class="language-text"><span>npm run build</span></code></div></div></pre>

* To start the bot in production mode

<pre><div class="relative rounded-md"><button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-auto disabled:opacity-50 hover:text-accent-foreground absolute right-2 top-2 h-6 w-6 rounded-full p-0 text-muted-foreground hover:bg-accent" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button><div node="[object Object]" class="rounded-md"><code class="language-text"><span>npm start</span></code></div></div></pre>

* To start the bot in development mode

<pre><div class="relative rounded-md"><button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-auto disabled:opacity-50 hover:text-accent-foreground absolute right-2 top-2 h-6 w-6 rounded-full p-0 text-muted-foreground hover:bg-accent" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button><div node="[object Object]" class="rounded-md"><code class="language-text"><span>npm run dev</span></code></div></div></pre>

* To start the bot in development mode with auto build

<pre><div class="relative rounded-md"><button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-auto disabled:opacity-50 hover:text-accent-foreground absolute right-2 top-2 h-6 w-6 rounded-full p-0 text-muted-foreground hover:bg-accent" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button><div node="[object Object]" class="rounded-md"><code class="language-text"><span>npm run dev:build</span></code></div></div></pre>

Note:

* Make sure to have a `.env` file in the root directory of the project with the correct variables and values.
* The `npm run dev` and `npm run dev:build` commands are used to automatically re-start the bot when there are changes in the code.
* The `npm run build` command is used to compile the TypeScript code into JavaScript.
* The `npm start` command is used to start the bot in production mode.
* The `npx prisma generate` command is used to generate the Prisma client.
* The `npx prisma migrate dev` command is used to apply the migrations to the database.

# Credits

This project was created by [Pavlotech](https://github.com/pavlotech)

The architecture of this project is based on [Philainel](https://github.com/Philainel)
