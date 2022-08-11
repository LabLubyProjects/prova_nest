import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'ms_emails',
  brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
});

const kafkaProducer = kafka.producer();

export async function produce(context: any, topic: string): Promise<void> {
  await kafkaProducer.connect();
  await kafkaProducer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(context) }],
  });
  await kafkaProducer.disconnect();
}
