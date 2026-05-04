/**
 * GraphQL query to retrieve comprehensive user profile data, including identification,
 * cumulative XP from modules, chronological XP transactions, and skill breakdown.
 */
export const Query = `
query GetMyProfile {
  user {
    id
    login
    firstName
    lastName
    auditRatio
    avatarUrl  
    auditSuccess: audits_aggregate(where: { closureType: { _eq: succeeded } }) {
      aggregate { count }
    }
    auditFail: audits_aggregate(where: { closureType: { _eq: failed } }) {
      aggregate { count }
    }
  }
  
 
  total_xp: transaction_aggregate(
    where: { type: { _eq: "xp" }, event: { object: { name: { _eq: "Module" } } } }
  ) {
    aggregate { sum { amount } }
  }


  xp_transactions: transaction(
    where: { type: { _eq: "xp" }, event: { object: { name: { _eq: "Module" } } } }
    order_by: { createdAt: asc }
  ) {
    amount
    path
    createdAt
  }


  skills: transaction(
    where: { type: { _like: "skill_%" } }
    order_by: { amount: desc }
  ) {
    type
    amount
  }
}
`;