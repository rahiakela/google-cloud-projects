from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
import six

client = language.LanguageServiceClient()

content = 'This car is really pretty.'
content2 = 'This car is nice. It also gets terrible gas mileage!'

if isinstance(content2, six.binary_type):
    content2 = content2.decode('utf-8')

type_ = enums.Document.Type.PLAIN_TEXT
document = {'type': type_, 'content': content2}

response = client.analyze_sentiment(document)
sentiment = response.document_sentiment
print('Score: {}'.format(sentiment.score))
print('Magnitude: {}'.format(sentiment.magnitude))
