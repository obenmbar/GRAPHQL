 export const Query = `
    query {
      user { id login firstName lastName auditRatio }
      xp_transactions: transaction(
        where: { type: { _eq: "xp" }, path: { _nlike: "%/piscine-%" } }
        order_by: { createdAt: asc }
      ) { amount path createdAt }
      skills: transaction(
        where: { type: { _like: "skill_%" } }
        order_by: { amount: desc }
      ) { type amount }
    }`;