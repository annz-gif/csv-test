# CSV Upload and Parsing with Next.js & Bull Queue

This project is a **Next.js application** that allows users to **upload CSV files**, process them using a **Bull queue**, and store the results efficiently. The backend is powered by **Node.js, Redis, and Bull queue** for handling asynchronous processing.
![image alt](https://github.com/annz-gif/csv-test/blob/de206c012abed60cb70efdfd19bed5b4651fa7ac/Screenshot%202025-02-27%20000852.png)
![image alt](https://github.com/annz-gif/csv-test/blob/33a53ff004234dd3bc500a66a34310ae7bb4e566/Screenshot%202025-02-27%20000909.png)
## 📂 Project Structure

nextjs-csv-processing/ │── app/ │ ├── api/ │ │ ├── upload/route.js # API route for file upload │ │ ├── status/route.js # API route to check job status │ ├── Components/ # Frontend components │── uploads/ # Temporary file storage │── queue.js # Bull queue setup │── worker.js # CSV processing worker │── .env.local # Environment variables │── package.json # Project dependencies │── next.config.js # Next.js configuration │── tailwind.config.js # TailwindCSS setup │── README.md # Project documentation
## 🚀 Features

✅ CSV file upload  
✅ Background job processing using **Bull Queue**  
✅ Redis integration for task management  
✅ API to check processing **status**  
✅ Next.js frontend  

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/annz-gif/test.git
cd nextjs-csv-processing
2️⃣ Install Dependencies
sh
Copy
Edit
npm install
 3️⃣ Configure Environment Variables
Create a .env.local file in the root directory and add the following:

ini
Copy
Edit
REDIS_HOST=localhost
REDIS_PORT=6379
 4️⃣ Start Redis Server
Ensure you have Redis installed and running:

sh
Copy
Edit
redis-server
 5️⃣ Run the Application
sh
Copy
Edit
npm run dev
Now, open http://localhost:3000 in your browser.

