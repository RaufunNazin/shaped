export const metricTooltip = {
  Recall:
    "A measure of the fraction of relevant items that were retrieved by a model, indicating how well it identifies all relevant items.",
  Precision:
    "A measure of the fraction of retrieved items that are relevant, indicating how well a model avoids including irrelevant items in the results.",
  NDCG: "A measure that evaluates the quality of a ranked list, taking into account both the relevance and the position of each item",
  HitRatio:
    "A measure that indicates the fraction of recommended items that are relevant to a user's interests or preferences.",
  MAP: "A measure of the average precision across different recall levels, providing an overall assessment of the quality of a ranked list.",
  Personalization:
    "Refers to the ability of a recommendation system to tailor recommendations to the specific preferences and interests of individual users.",
  Coverage:
    "A measure of the proportion of items in a dataset that are recommended by a model, indicating the diversity and comprehensiveness of the recommendations",
  MRR: "A measure of the effectiveness of a ranked list, calculated as the average of the reciprocal ranks of the relevant items, focusing on the highest-ranked relevant item.",
};

export const segmentationTooltip = {
  ColdStartItems:
    "Items that have very little or no historical data, making it challenging to make accurate predictions or recommendations for them.",
  ColdStartUsers:
    "Users who have very little or no historical interactions with the system, posing a challenge in understanding their preferences or behavior.",
  Negative:
    "Refers to interactions or feedback that signify a lack of interest or disapproval. For example, when a user rates an item with a low score.",
  Unseen:
    "Users who have not been encountered in the training data, meaning their preferences or behaviors are unknown and challenging to predict.",
  UnpopularWeighted:
    "Giving more importance to interactions with items that are less popular, allowing the model to consider the preferences of users for items that are typically ignored by many.",
  All: "Grouping users or items based on favorable interactions, such as high ratings, clicks, purchases, etc., to offer personalized recommendations aligned with their preferences.",
};

export const summaryMetricTooltip = {
  RankTime:
    "The average time it takes for the system to generate ranked recommendations for a given user or query.",
  TestDataNumUsers:
    "The total number of users in the test dataset, which is used for evaluating the model's performance.",
  TestDataNumItems:
    "The total number of items in the test dataset, which is used for evaluating the model's performance.",
  TestDataNumInteractions:
    "The total number of interactions (such as clicks, purchases, etc.) between users and items in the test dataset.",
  TestDataSparsity:
    "A measure of how sparse the test dataset is, indicating the percentage of missing interactions.",
  TrainDataNumUsers:
    "The total number of users in the training dataset, which is used for building and training the machine learning model.",
  TrainDataNumItems:
    "The total number of items in the training dataset, which is used for building and training the machine learning model.",
  TrainDataNumInteractions:
    "The total number of interactions (such as clicks, purchases, etc.) between users and items in the training dataset.",
  TrainDataSparsity:
    "A measure of how sparse the training dataset is, indicating the percentage of missing interactions in the training data.",
  RankTimeLiveP99:
    "The 99th percentile (P99) of the time it takes for the system to generate ranked recommendations for a user in real-time scenarios.",
};

export const slateSizeTooltip = {
  "10": "The recommendation system displays 10 top suggestions to the user in a single list.",
  "50": "The recommendation system presents a single list containing 50 items to offer the user a broader range of potentially relevant choices.",
};

export const summaryMetricMap = {
  RankTime: "Rank time",
  TestDataNumUsers: "Test users count",
  TestDataNumItems: "Test items count",
  TestDataNumInteractions: "Test interactions count",
  TestDataSparsity: "Test sparsity",
  TrainDataNumUsers: "Train users count",
  TrainDataNumItems: "Train items count",
  TrainDataNumInteractions: "Train interactions count",
  TrainDataSparsity: "Train sparsity",
  RankTimeLiveP99: "Rank time live P99",
};

export const segmentationMap = {
  ColdStartItems: "Cold Start Items",
  ColdStartUsers: "Cold Start Users",
  Negative: "Negative",
  Unseen: "Unseen",
  UnseenUsers: "Unseen Users",
  UnpopularWeighted: "Unpopular Weighted",
  All: "All",
};

const reverseMap = (obj:any) =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));

export const summaryMetricReverseMap = reverseMap(summaryMetricMap);
export const segmenationReverseMap = reverseMap(segmentationMap);
