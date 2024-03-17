import amqp from "amqplib";

const queue = "task_queue";

const task = {
    item: "clean the house",
    priority: "high",
};

const connect = async () => {
    let connection;
    try {
        connection = await amqp.connect("amqp://localhost");
        console.log("Connected to RabbitMQ");
        console.log(connection);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)));
        console.log(`[x] Sent ${task.item}`);
        console.log(`[x] Priority: ${task.priority}`);
        await channel.close();
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};

connect();
