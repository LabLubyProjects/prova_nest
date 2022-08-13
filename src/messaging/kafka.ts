import { Kafka, Producer } from 'kafkajs';

let kafka;

export class KafkaSingleton {
  private static _producer: Producer | null = null;

  public static async getProducer() {
    if (!kafka) {
      kafka = new Kafka({
        clientId: 'ms_emails',
        brokers: [`${process.env.KAFKA_BROKER}`],
      });
    }
    if (this._producer) return this._producer;
    this._producer = kafka.producer();
    await this._producer.connect();
    return this._producer;
  }

  public static async shutdown() {
    if (this._producer) {
      await this._producer.disconnect();
      this._producer = null;
    }
  }
}

export async function produce(message: any, topic: string): Promise<void> {
  const producer = await KafkaSingleton.getProducer();
  await producer.send({
    topic: topic,
    acks: 0,
    messages: [{ value: JSON.stringify(message) }],
  });
}
