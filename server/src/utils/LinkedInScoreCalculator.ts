// src/utils/LinkedInScoreCalculator.ts

class LinkedInScoreCalculator {
    // Function to calculate LinkedIn score based on engagement metrics
    calculateLinkedInScore(engagementMetrics: {
      likes: number;
      comments: number;
      shares: number;
    }): number {
      const { likes, comments, shares } = engagementMetrics;
  
      // Define weights
      const weights = {
        likes: 0.2,
        comments: 0.5,
        shares: 0.3,
      };
  
      // Calculate the score
      const score =
        likes * weights.likes +
        comments * weights.comments +
        shares * weights.shares;
  
      // Return the score rounded to two decimal places
      return parseFloat(score.toFixed(2));
    }
  }
  
  export default LinkedInScoreCalculator;
  
