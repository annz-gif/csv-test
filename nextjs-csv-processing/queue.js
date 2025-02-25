import { Queue } from 'bull'; 

const userQueue = new Queue('userQueue', {
  redis: {
    host: 'localhost', // Or your Redis server host
    port: 6379        // Redis port
  }
});

export { userQueue };
