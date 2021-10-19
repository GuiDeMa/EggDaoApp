export const twquery = async (q) => {
  let res = await fetch("https://api.twetch.app/v1/graphql", {
    method: "post",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({ query: q })
  });
  let jres = await res.json();
  return jres.data;
};

const PostFields = `{
  bContent
  createdAt
  id
  numLikes
  postsByReplyPostId {
    totalCount
  }
  transaction
  youLikedCalc
  userId
  userByUserId {
    icon
    name
  }
}`;

const PostDetailFields = `{
  ...${PostFields}
  parents{
    nodes{
      ...${PostFields}
    }
  }
}`;

const ReplyFields = `{
  ...${PostDetailFields}
  children {
    nodes {
      ...${PostDetailFields}
    }
  }
}`;

export const userData = `{
    me {
      createdAt
      defaultWallet
      description
      hasAutoTweetFromTwetch
      hasImageUpload
      hasTwetchToTweet
      hasEncrypted
      hideFreeNotifications
      icon
      id
      isAdmin
      isApproved
      isDarkMode
      isOneClick
      lastReadNotifications
      moneyButtonUserId
      name
      nodeId
      numPosts
      onboardedAt
      oneButtonAddress
      profileUrl
      publicKey
      publicKeys: publicKeysByUserId(filter: { revokedAt: { isNull: true } }) {
        nodes {
          id
          walletType
          signingAddress
          identityPublicKey
          encryptedMnemonic
          address
        }
      }
      purchasedAdvancedSearchAt
      purchasedDarkModeAt
      purchasedTwetchToTweetAt
      purchasedChatAt
      referralLinkId
      xpub
      __typename
    }
    currentUserId
  }
  `;

export function FetchUserName(id) {
  return twquery(`
    {
      userById(id: "${id}") {
        name
      }
    }
    `);
}

export function FetchNotifications(offset) {
  //console.log(filter);
  return twquery(`{
    me {
      notificationsByUserId(
        first: 30
        offset: ${offset}
        orderBy: ID_DESC
        filter: {actorUserId: {distinctFrom: "${localStorage.id}"}}
      ) {
        nodes {
          actorUserId
          createdAt
          description
          id
          nodeId
          postId
          price
          priceSats
          type
          url
          userId
          userByActorUserId {
            icon
            name
          }
        }
        totalCount
      }
    }
  }`);
}

export function FetchPosts(filter, order, offset) {
  //console.log(filter);
  return twquery(`{
    allPosts(orderBy: ${order} first: 30 offset: ${offset} filter: {mapComment: {includes: "${filter}"}}) {
      totalCount
      edges {
        node {
          ...${PostFields}
        }
      }
    }
  }`);
}
export function FetchHome(ticker, order, offset) {
  //console.log(filter);
  return twquery(`{
    allPosts(orderBy: ${order} first: 30 offset: ${offset} filter: {mapComment: {includes: "${ticker}"}}) {
      totalCount
      edges {
        node {
          ...${PostFields}
        }
      }
    }
  }`);
}
export function FetchIdeas(filter, order, offset) {
  //console.log(filter);
  return twquery(`{
    allPosts(orderBy: ${order} first: 30 offset: ${offset} filter: {mapComment: {includes: "${filter}"}}) {
      totalCount
      edges {
        node {
          ...${PostFields}
        }
      }
    }
  }`);
}
export function FetchProjects(filter, order, offset) {
  //console.log(filter);
  return twquery(`{
    allPosts(orderBy: ${order} first: 30 offset: ${offset} filter: {mapComment: {includes: "${filter}"}}) {
      totalCount
      edges {
        node {
          ...${PostFields}
        }
      }
    }
  }`);
}
export function FetchJobs(order, offset) {
  return twquery(`{
    allPosts(orderBy: ${order} first: 30 offset: ${offset} filter: {bContent: {startsWith: "/job"}}) {
      totalCount
      edges {
        node {
          ...${PostFields}
        }
      }
    }
  }`);
}

export function FetchUserPosts(userId, order, offset) {
  return twquery(`{
    allPosts(orderBy: ${order} first: 30 offset: ${offset} filter: {userId: {equalTo: "${userId}"}}) {
      totalCount
      edges {
        node {
          ...${PostFields}
        }
      }
    }
  }`);
}

export function FetchUserData(userId) {
  return twquery(`
  {
    userById(id: "${userId}") {
      description
      earned
      earnedCalc
      earnedSatsCalc
      followerCount
      followingCount
      icon
      id
      name
      postsEarnedCalc
      profileUrl
    }
  }`);
}

export function FetchPostDetail(txId) {
  return twquery(`{
    allPosts(
      condition: {transaction: "${txId}"}
    ) {
      edges {
        node {
          ...${PostFields}
        }
      }
    }
  }`);
}

export function FetchPostReplies(txId, order) {
  return twquery(`
  {
    allPosts(
      condition: { transaction: "${txId}" }
      orderBy: ${order}
    ) {
      totalCount
      pageInfo{
        hasNextPage
        endCursor
      }
      nodes {
        parents {
          edges {
            node
            {
              ...${PostFields}
            }
          }
        }
        children {
          edges {
            node
            {
              ...${PostFields}
            }
          }
        }
      }
    }
  }
  `);
}
