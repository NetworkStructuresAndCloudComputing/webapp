import { PubSub } from '@google-cloud/pubsub';

const pubSubClient = new PubSub();

export const publishMessage = async (topicNameOrId, data) => {
  const dataBuffer = Buffer.from(data);
  try {
    const messageId = await pubSubClient
      .topic(topicNameOrId)
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
};