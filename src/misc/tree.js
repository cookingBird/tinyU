/**
 * @param {rootNode} target
 * @param {object} options
 * @param {function|string} options.childrenKey
 * @param {Function} options.filter
 * @returns {Array}
 */
export function flattenTree(
  target,
  options = {},
  rank = 0,
  parents = [],
  result = [],
  rankIndex = {}
) {
  const { children = 'children', filter } = options;
  if (filter && filter(target)) {
    result.push({
      data: target,
      parents,
      rank,
      rankIndex: getRankIndex(rank, rankIndex),
    });
  } else if (!filter) {
    result.push({
      data: target,
      rank,
      parents,
      rankIndex: getRankIndex(rank, rankIndex),
    });
  }

  const childrenMaps =
    typeof children === 'function' ? children(target) : target[children];
  if (Array.isArray(childrenMaps) && children.length > 0) {
    childrenMaps.forEach((child) => {
      flattenTree(child, options, rank + 1, [...parents, target], result, rankIndex);
    });
  } else {
    result[result.length - 1].lastRank = true;
  }
  return result;
}

/**
 * @description 根据树的扁平化数组，生成新的树
 * @param {*} root 开始查找的根节点
 * @param {array} nodeArr 包含所有节点的数组
 * @param {object} options 其它选项
 * @param {string}  options.key  确定唯一节点的key字段
 * @param {string}  options.childrenIdFiled  存储子节点ID的字段
 * @returns
 */
export function getTreeFromFlattenArray(root, nodeArr, options) {
  const uniqKey = options.key || 'ID';
  const childrenIdFiled = options.childrenIdFiled || 'Children';
  return {
    ...root,
    children:
      root[childrenIdFiled]
        ?.map((id) => nodeArr.find((node) => node[uniqKey] === id))
        ?.map((child) => getTreeFromFlattenArray(child, nodeArr, options)) || [],
  };
}

/**
 * 获取具有最大节点数的rank
 * @param {*} rootNode
 * @param {*} options
 * @returns {array} [rank,rankNumber]
 */

export function getTreeRankWithMaxNode(rootNode, options) {
  const flattenArray = flattenTree(rootNode, options);
  const rankTotals = flattenArray.reduce((pre, curr) => {
    const rank = curr.rank;
    return {
      ...pre,
      [rank]: pre[rank] ? pre[rank] + 1 : 1,
    };
  }, {});
  const entries = Object.entries(rankTotals);
  return entries.reduce(
    (pre, curr) => {
      if (curr[1] >= pre[1]) {
        return curr;
      } else {
        return pre;
      }
    },
    [0, 0]
  );
}

/**
 * 统计tree每层的节点数；
 * @param {object} rootNode
 * @param {*} options
 * @returns {object} key:rank value:rankNumber
 */
export function getTreeRankNodesNumber(rootNode, options) {
  const flattenArray = flattenTree(rootNode, options);
  return flattenArray.reduce((pre, curr) => {
    const rank = curr.rank;
    return {
      ...pre,
      [rank]: pre[rank] ? pre[rank] + 1 : 1,
    };
  }, {});
}

/**
 * @description 统计一个数组中所有元素某一个字段的值的分布
 * @param {array} array 待统计数组
 * @param {string} filed 待统计字段
 * @returns
 */
export function statisticArrayBy(array, filed) {
  return array.reduce((pre, curr) => {
    const rank = curr[filed];
    return {
      ...pre,
      [rank]: pre[rank] ? pre[rank] + 1 : 1,
    };
  }, {});
}

/**
 *
 * @param {*} rank
 * @param {*} rankIndex
 * @returns
 */
function getRankIndex(rank, rankIndex = {}) {
  if (rankIndex[rank]) {
    rankIndex[rank].push(1);
    return rankIndex[rank].length - 1;
  } else {
    rankIndex[rank] = [];
    rankIndex[rank].push(1);
    return 0;
  }
}
