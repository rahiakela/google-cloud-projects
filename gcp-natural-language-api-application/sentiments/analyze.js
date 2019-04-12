async function analyze() {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');

    // Instantiates a client
    const client = new language.LanguageServiceClient();

    // The text to analyze
    const text = 'This car is really pretty.';
    const text2 = 'This car is nice. It also gets terrible gas mileage!';

    const document = {
        content: text2,
        type: 'PLAIN_TEXT'
    };

    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
}

analyze().catch(console.error);
