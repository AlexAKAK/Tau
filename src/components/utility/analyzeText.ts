
import {google} from 'googleapis'

const KEY = require('./../../../config')['perspectiveAPIKey'];

require('dotenv').config();

const attributeThresholds = {
  'INSULT': 0.85,
  'TOXICITY': 0.85,
  'SPAM': 0.85,
  'INCOHERENT': 0.85,
  'FLIRTATION': 0.85,
};

/**
 * Analyze attributes in a block of text
 * @param {string} text - text to analyze
 * @return {json} res - analyzed atttributes
 */
async function analyzeText(text: string): Promise<object> {
  const analyzer = google.commentanalyzer('v1alpha1');

  // This is the format the API expects
  const requestedAttributes = {};
  for (const key in attributeThresholds) {
    requestedAttributes[key] = {};
  }

  const req = {
    comment: {text: text},
    languages: ['en'],
    requestedAttributes: requestedAttributes,
  };

  const res = await analyzer.comments.analyze({
    key: KEY,
    resource: req},
  );

  let data = {};

  for (const key in res['data']['attributeScores']) {
    data[key] =
        res['data']['attributeScores'][key]['summaryScore']['value'] >
        attributeThresholds[key];
  }
  return data;
}

export default analyzeText;
